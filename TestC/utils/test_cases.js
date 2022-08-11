export function extract_test_cases(completion, function_name) {
  const compl = 'assert' + completion;
  const assert_string = `assert ${function_name}(`;

  let tests = compl.split(assert_string)
    .splice(1)
    .map(e => assert_string + e)
    .map(e => e.split('\n')[0])
    .map(e => e.trim());

  // Remove duplicates
  tests = [...new Set(tests)];

  if (tests.length !== 0) {
    tests[tests.length - 1] = tests[tests.length - 1].split('\n').slice(0, 2).join('');
  }

  return tests;
}

export function combine_test_cases(test_cases) {
  return [...new Set(test_cases.flat())].sort();
}