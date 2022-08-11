from main import has_close_elements

assert has_close_elements([1, 1], 2) == True
assert has_close_elements([1, 2, 3, 4, 10], 2) == True
assert has_close_elements([1, 2, 3, 4, 5, 1, 2], 1)
assert has_close_elements([1, 2, 3, 4, 5, 1, 2], 1.5)
assert has_close_elements([1, 2, 3, 4, 5], 0.5) is False
assert has_close_elements([1, 2, 3, 4, 5], 1.5)
assert has_close_elements([1, 2.5, 3, 4.5], 1.5)
assert has_close_elements([1, 2.5, 3], 1.5)
assert has_close_elements([1.0, 1.2, 1.1], 0.2) == True
assert has_close_elements([1.0, 1.2, 1.4], 0.2) == True
assert has_close_elements([1.0, 2.0, 3.0, 4.0, 5.0], 1.5) is True
assert has_close_elements([1.0, 2.0, 3.0], 0.1) == False
assert has_close_elements([1.0], 0.2) == False
assert has_close_elements([1.1, 1.2], 0.2) == True
assert has_close_elements([10, 11, 12, 13, 14], 1.5) == True
assert has_close_elements([1], 1) == False
assert has_close_elements([42, 42], 1) is True
assert has_close_elements([5, 5, -5.6], 10)
assert has_close_elements([], 0.2) == False
assert has_close_elements([], 2) == False
assert has_close_elements(numbers=[5, 10, 90], threshold=100)