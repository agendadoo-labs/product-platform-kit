# Method and evaluation

Recommended progression: schema/duplicate/unit checks → descriptive exposure ratios → comparable peer medians/IQR/MAD → own-history seasonality (only with adequate history) → optional multivariate model. Never remove an unusual record merely to improve the fit; keep raw and corrected versions with explicit reason.

A product evaluation should freeze reference datasets and thresholds before test review. Include denominator zero/missing, mixed periods/units/stages, duplicate rows, repeated entities, small samples, all-equal peers, source revisions and genuine unusual-but-valid cases. Use entity/time holdouts and reviewed labels where available. Report precision among reviewed candidates, review workload, coverage and stability; false-negative rate is unknown without representative negatives/positives.

Optional tools after need is demonstrated: DuckDB/Parquet for local aggregations, pandas or Polars for tabular preparation (choose one), SciPy/statsmodels for robust/seasonal models, scikit-learn for Isolation Forest or LOF experiments. Pin actual tested versions when introduced; this package requires none of them. Four municipalities alone do not provide an adequate training set. Repeated months are dependent and cannot be counted as independent peers.

For joins, validate keys and cardinalities before aggregation. Many-to-many item allocation must conserve quantity/value and retain an unallocated remainder. Do not infer final consumption from purchaser or budget holder alone. Missing reporting, delayed files and true zero activity are distinct states.

Primary references, consulted 2026-10-18:
- https://scikit-learn.org/stable/modules/outlier_detection.html
- https://docs.python.org/3/library/decimal.html
- https://duckdb.org/docs/stable/data/parquet/overview

No generic score supports medical advice, fraud allegations or a decision to stop medication supply.
