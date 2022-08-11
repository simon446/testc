from main import mean_absolute_deviation

assert mean_absolute_deviation([-10, -10, -11, -11]) == 0.5
assert mean_absolute_deviation([0, -1]) == 0.5
assert mean_absolute_deviation([0, 0, 0]) == 0
assert mean_absolute_deviation([0.0]) == 0.0
assert mean_absolute_deviation([0]) == 0
assert mean_absolute_deviation([1, -1, 1, -1]) == 1.0
assert mean_absolute_deviation([1, 1, 1, 1, 1]) == 0
assert mean_absolute_deviation([1, 1, 1]) == 0
assert mean_absolute_deviation([1, 1, 1]) == 0.0
assert mean_absolute_deviation([1, 1]) == 0
assert mean_absolute_deviation([1, 2, 3, 4]) == 1
assert mean_absolute_deviation([1, 2]) == 0.5
assert mean_absolute_deviation([1, 3]) == 1
assert mean_absolute_deviation([1.0, 1.0, 1.0]) == 0.0
assert mean_absolute_deviation([1.0, 2.0, 3.0]) == 0.6666666666666666
assert mean_absolute_deviation([1]) == 0
assert mean_absolute_deviation([1]) == 0.0
assert mean_absolute_deviation([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]) == 0.0
assert mean_absolute_deviation([2, 2, 2]) == 0
assert mean_absolute_deviation([3, 3, 3]) == 0
assert mean_absolute_deviation([50]) == 0