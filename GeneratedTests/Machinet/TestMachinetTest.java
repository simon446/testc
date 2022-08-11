package machinet;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TestMachinetTest {

    public TestMachinet testMachinet = new TestMachinet();

    @Test
    @DisplayName("Should return an empty list when the input list is empty")
    void intersperseWhenInputListIsEmptyThenReturnEmptyList() {
        List<Integer> input = Arrays.asList();
        List<Integer> result = testMachinet.intersperse(input, 1);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("Should return a list with one element when the input list has one element")
    void intersperseWhenInputListHasOneElementThenReturnListWithOneElement() {
        List<Integer> input = Arrays.asList(1);
        List<Integer> expected = Arrays.asList(1);
        List<Integer> actual = testMachinet.intersperse(input, 2);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return a list with two elements when the input list has two elements")
    void intersperseWhenInputListHasTwoElementsThenReturnListWithTwoElements() {
        List<Integer> input = Arrays.asList(1, 2);
        List<Integer> expected = Arrays.asList(1, 0, 2);
        List<Integer> actual = testMachinet.intersperse(input, 0);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return a list with three elements when the input list has three elements")
    void intersperseWhenInputListHasThreeElementsThenReturnListWithThreeElements() {
        List<Integer> input = Arrays.asList(1, 2, 3);
        List<Integer> result = testMachinet.intersperse(input, 0);
        assertEquals(3, result.size());
    }

    @Test
    @DisplayName("Should return 0 when the list is empty")
    void meanAbsoluteDeviationWhenListIsEmpty() {
        List<Float> numbers = Arrays.asList();

        float result = testMachinet.mean_absolute_deviation(numbers);

        assertEquals(0, result);
    }

    @Test
    @DisplayName("Should return 0 when the list contains only one element")
    void meanAbsoluteDeviationWhenListContainsOnlyOneElement() {
        List<Float> numbers = Arrays.asList(1f);
        float result = testMachinet.mean_absolute_deviation(numbers);
        assertEquals(0, result);
    }

    @Test
    @DisplayName("Should return the correct value when the list contains more than one element")
    void meanAbsoluteDeviationWhenListContainsMoreThanOneElement() {
        List<Float> numbers = Arrays.asList(1.0f, 2.0f, 3.0f);
        float expected = 1.0f;
        float actual = testMachinet.mean_absolute_deviation(numbers);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return true when the balance is below zero")
    void belowZeroWhenBalanceIsBelowZeroThenReturnTrue() {
        List<Integer> operations = Arrays.asList(-1, -2, -3);
        boolean result = testMachinet.below_zero(operations);
        assertTrue(result);
    }

    @Test
    @DisplayName("Should return false when the balance is not below zero")
    void belowZeroWhenBalanceIsNotBelowZeroThenReturnFalse() {
        List<Integer> operations = Arrays.asList(1, 2, 3);
        boolean result = testMachinet.below_zero(operations);
        assertFalse(result);
    }

    @Test
    @DisplayName("Should return 0.0 when the number is an integer")
    void truncateNumberWhenNumberIsIntegerThenReturnZero() {
        double number = 5.0;
        double expected = 0.0;
        double actual = testMachinet.truncate_number(number);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return the decimal part of the number when the number is not an integer")
    void truncateNumberWhenNumberIsNotIntegerThenReturnDecimalPart() {
        double number = 1.5;
        double expected = 0.5;
        double actual = testMachinet.truncate_number(number);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return an empty list when the input is empty")
    void separateParenGroupsWhenInputIsEmptyThenReturnEmptyList() {
        String input = "";
        List<String> expected = Arrays.asList();
        List<String> actual = testMachinet.separate_paren_groups(input);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return a list with one element when the input is a single paren group")
    void separateParenGroupsWhenInputIsSingleParenGroupThenReturnListWithOneElement() {
        String input = "(1)";
        List<String> expected = Arrays.asList("(1)");
        List<String> actual = testMachinet.separate_paren_groups(input);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return a list with two elements when the input is two paren groups")
    void separateParenGroupsWhenInputIsTwoParenGroupsThenReturnListWithTwoElements() {
        String input = "((()))((()))";
        List<String> expected = Arrays.asList("((()))", "((()))");
        List<String> actual = testMachinet.separate_paren_groups(input);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return a list with three elements when the input is three paren groups")
    void separateParenGroupsWhenInputIsThreeParenGroupsThenReturnListWithThreeElements() {
        String input = "((()))((()))((()))";
        List<String> expected = Arrays.asList("((()))", "((()))", "((()))");
        List<String> actual = testMachinet.separate_paren_groups(input);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return true when there are two elements that are close to each other")
    void hasCloseElementsWhenThereAreTwoElementsThatAreCloseToEachOtherThenReturnTrue() {
        List<Float> numbers = Arrays.asList(1.0f, 2.0f, 3.0f, 4.0f, 5.0f);
        Float threshold = 1.5f;
        boolean result = testMachinet.has_close_elements(numbers, threshold);
        assertTrue(result);
    }

    @Test
    @DisplayName("Should return false when there are no elements that are close to each other")
    void hasCloseElementsWhenThereAreNoElementsThatAreCloseToEachOtherThenReturnFalse() {
        List<Float> numbers = Arrays.asList(1.0f, 2.0f, 3.0f, 4.0f, 5.0f);
        Float threshold = 0.5f;
        boolean result = testMachinet.has_close_elements(numbers, threshold);
        assertFalse(result);
    }
}