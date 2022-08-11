package machinet;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import static java.lang.Math.abs;

public class TestMachinet {

   public List<Integer> intersperse(List<Integer> numbers, int delimiter) {
       if (numbers.isEmpty()) {
           return Collections.emptyList();
       }

       List<Integer> result = new ArrayList<>();
       for (int i = 0; i < numbers.size()-1; i ++) {
           result.add(numbers.get(i));
           result.add(delimiter);
       }

       result.add(numbers.get(numbers.size() - 1));
       return result;
   }

   public float mean_absolute_deviation(List<Float> numbers) {
       Float sum = 0f;
       for (Float num : numbers) {
           sum += num;
       }

       Float mean = sum / numbers.size();
       Float sum_abs = 0f;
       for (Float num : numbers) {
           sum_abs += abs(num - mean);
       }

       return sum_abs / numbers.size();
   }

    public boolean below_zero(List<Integer> operations) {
        int balance = 0;

        for (int op : operations) {
            balance += op;
            if (balance < 0){
                return true;
            }
        }

        return false;
    }

    public double truncate_number(double number) {
        return (number % 1.0);
    }

    public List<String> separate_paren_groups(String paren_string) {
        List<String> result = new ArrayList<String>();
        List<String> current_string = new ArrayList<String>();
        List<Character> chars = new ArrayList<Character>();
        int current_depth = 0;
        char[] paren_chars = paren_string.toCharArray();

        for (char c : paren_chars) {
            if (c == '(') {
                current_depth++;
                chars.add(c);
            } else if (c == ')') {
                current_depth--;
                chars.add(c);

                if (current_depth == 0) {
                    StringBuilder sb = new StringBuilder();
                    for (char ch : chars) {
                        sb.append(ch);
                    }
                    current_string.add(sb.toString());
                    result.addAll(current_string);
                    chars.clear();
                    current_string.clear();
                }
            }
        }

        return result;
    }

    public boolean has_close_elements(List<Float> numbers, Float threshold) {
        for (int idx = 0; idx < numbers.size(); idx ++) {
            for (int idx2 = 0; idx2 < numbers.size(); idx2 ++) {
                if (idx != idx2) {
                    Float distance = abs(numbers.get(idx) - numbers.get(idx2));
                    if (distance < threshold) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public static void main(String[] args) {
    }
}
