"""Offline, deterministic exposure-ratio screening for normalized aggregate data."""
import argparse
import hashlib
import json
from collections import Counter, defaultdict
from decimal import Decimal, InvalidOperation, localcontext
from pathlib import Path

TEXT = ('id', 'entity_id', 'cohort', 'period', 'metric', 'unit', 'denominator_kind', 'stage', 'numerator_source', 'denominator_source')
FIELDS = set(TEXT) | {'numerator', 'denominator', 'comparable', 'period_aligned'}
GROUP = ('cohort', 'period', 'metric', 'unit', 'denominator_kind', 'stage')


def number(value):
    if value is None or isinstance(value, bool):
        return None
    try:
        d = Decimal(str(value))
        return d if d.is_finite() else None
    except (InvalidOperation, ValueError):
        return None


def quantile(values, p):
    values = sorted(values)
    index = (len(values) - 1) * p
    lower = int(index)
    fraction = index - lower
    return values[lower] + (values[min(lower + 1, len(values)-1)] - values[lower]) * fraction


def render(value):
    return None if value is None else format(value, 'f')


def analyze(payload):
    if set(payload) != {'schema_version', 'parameters', 'rows'} or type(payload['schema_version']) is not int or payload['schema_version'] != 1:
        raise ValueError('unsupported_input_contract')
    params = payload['parameters']
    if not isinstance(params, dict) or set(params) != {'min_peers', 'iqr_multiplier', 'median_ratio'}:
        raise ValueError('explicit_parameters_required')
    n = params['min_peers']; k = number(params['iqr_multiplier']); m = number(params['median_ratio'])
    if type(n) is not int or n < 3 or k is None or k < 0 or m is None or m <= 1:
        raise ValueError('invalid_parameters')
    rows = payload['rows']
    if not isinstance(rows, list) or len(rows) > 10000:
        raise ValueError('rows_must_be_list_up_to_10000')
    seen = set(); results = []; groups = defaultdict(list)
    with localcontext() as context:
        context.prec = 28
        for row in rows:
            if not isinstance(row, dict) or set(row) != FIELDS:
                raise ValueError('row_fields_do_not_match_contract')
            if any(not isinstance(row[t], str) or not row[t].strip() or len(row[t]) > 256 for t in TEXT):
                raise ValueError('invalid_metadata')
            if any(type(row[t]) is not bool for t in ('comparable', 'period_aligned')):
                raise ValueError('explicit_quality_flags_required')
            if row['id'] in seen:
                raise ValueError('duplicate_observation_id')
            seen.add(row['id']); a = number(row['numerator']); b = number(row['denominator'])
            reasons = []
            if a is None or a < 0: reasons.append('invalid_or_missing_numerator')
            if b is None or b <= 0: reasons.append('invalid_or_missing_denominator')
            if not row['comparable']: reasons.append('scope_or_unit_not_verified')
            if not row['period_aligned']: reasons.append('period_not_aligned')
            out = {t: row[t] for t in TEXT}
            out.update(status='insufficient_data', reasons=reasons, ratio=None, reference_count=0)
            results.append(out)
            if not reasons:
                ratio = a / b; out['ratio'] = render(ratio)
                groups[tuple(row[t] for t in GROUP)].append((row['entity_id'], ratio, out))
        for entries in groups.values():
            counts = Counter(e[0] for e in entries)
            for entity, ratio, out in entries:
                peers = [value for eid, value, _ in entries if eid != entity and counts[eid] == 1]
                out['reference_count'] = len(peers)
                out['excluded_ambiguous_peer_entities'] = sum(count > 1 for eid, count in counts.items() if eid != entity)
                if len(peers) < n:
                    out['status'] = 'insufficient_reference'; continue
                q1 = quantile(peers, Decimal('.25')); med = quantile(peers, Decimal('.5')); q3 = quantile(peers, Decimal('.75'))
                iqr = q3 - q1; mad = quantile([abs(v-med) for v in peers], Decimal('.5'))
                out.update(median=render(med), q1=render(q1), q3=render(q3), iqr=render(iqr), mad=render(mad))
                if iqr == 0:
                    out['status'] = 'degenerate_reference'; continue
                limit = q3 + k*iqr
                out['upper_fence'] = render(limit)
                out['status'] = 'above_reference_review_candidate' if ratio > limit and ratio > med*m else 'within_reference'
    return {'schema_version': 1, 'method_version': 'relative-ratio-iqr-v1', 'parameters': params,
            'results': results, 'status_counts': dict(Counter(r['status'] for r in results)),
            'limitations': ['Experimental descriptive screening; no legal or clinical conclusion.',
                            'Quality assertions and cohort definitions require independent review.',
                            'No automatic imputation, correction, source joins or patient deduplication.']}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('input', type=Path); parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.input.stat().st_size > 10_000_000: raise ValueError('input_exceeds_10MB')
    raw = args.input.read_bytes()
    result = analyze(json.loads(raw, parse_float=str))
    result['input_sha256'] = hashlib.sha256(raw).hexdigest()
    with args.output.open('x', encoding='utf-8') as out:
        json.dump(result, out, ensure_ascii=False, indent=2, allow_nan=False)
        out.write('\n')

if __name__ == '__main__':
    main()
