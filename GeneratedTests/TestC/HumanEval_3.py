from main import below_zero

assert below_zero([-1, -1]) == True
assert below_zero([-1, 5, 0, 1, 0, 5, -1]) == True
assert below_zero([-1,-1,-1]) == True, "All withdrawal operations"
assert below_zero([-1,-2,-3,-4,-5]) == True
assert below_zero([-1,1,2,-1,-1,1,2]) == True
assert below_zero([-1,1,2,3]) == True
assert below_zero([-10, -5, -4]) is True
assert below_zero([-1]) == True
assert below_zero([-2, 3, -7]) == True
assert below_zero([-20, 1, 2, 3]) == True
assert below_zero([0]) == False
assert below_zero([1, -1, -1, -1, -1, -1, -1]) == True
assert below_zero([1, -1, -1, 1, -1, 1, -1]) == True
assert below_zero([1, -1, -1, 1, -1]) == True
assert below_zero([1, -1, -1, 1]) == True
assert below_zero([1, -1, -1]) == True
assert below_zero([1, -1, -3, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1]) == True
assert below_zero([1, -1, -3, 1, -1, -1, 1, -1, 1, -1, -3, 1, -1, -1, 1, -1]) == True
assert below_zero([1, -1, -3, 1, -1, -1, 1, -1]) == True
assert below_zero([1, -1, -3]) == True
assert below_zero([1, -1, 2, -3, 5, -10, 10, 10, -20]) == True
assert below_zero([1, -1, 3]) == False
assert below_zero([1, -1]) == False
assert below_zero([1, 1, 1, -3, 4]) == False
assert below_zero([1, 1, 2, 1, -1]) is False
assert below_zero([1, 2, 3, -7]) == True
assert below_zero([1, 2, 3, 4, 5, 10]) == False
assert below_zero([1, 2, 3, 4, 5]) == False
assert below_zero([1,-1,1,-1,-1]) == True, "Withdrawal then deposit then withdrawal then withdrawal"
assert below_zero([1,-1,1]) == False, "Withdrawal then deposit"
assert below_zero([1,1,1]) == False, "All deposit operations"
assert below_zero([1,2,3,4,5]) == False
assert below_zero([1,2,3]) == False
assert below_zero([10, -20, 30, -40, 50, 60, -70, 80, 90, -100, 110])
assert below_zero([10, 0, 0, -1, 1]) == False
assert below_zero([100, -100, -100, 100, -100]) == True
assert below_zero([100, -100, 100]) == False
assert below_zero([100]) == False
assert below_zero([1]) == False
assert below_zero([4, -7, -1]) == True
assert below_zero([4, 5, -7, 1]) == False
assert below_zero([4, 5, 7]) == False
assert below_zero([5, 0, 1, 0, 5, -1]) == False
assert below_zero([]) == False
assert below_zero([]) == False, "Empty operations array"