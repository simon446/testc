import { extract_test_cases, combine_test_cases } from "./utils/test_cases.js";
import { run_assertions } from "./api/python.js";
import { compute_siblings, pick } from "./utils/siblings.js";
import { get, list, generate_codex } from "./datasets/humanEval/index.js";
import { makeDir, hasDir, writefile, readfile } from "./utils/io.js";
import { hash } from "./utils/crypto.js";
import { print, set_log_file_key, clear_log_file } from "./utils/log.js";

const TEMPERATURE = 0.8;
const CODE_GENERATIONS = 20;
const TEST_GENERATIONS = 15;
const MAX_TOKENS = 600;

const filter_asserts = (input, function_name) => {
    console.log("filter_asserts", input, function_name);
    return combine_test_cases(input.map(e => extract_test_cases(e, function_name)));
}

async function run(problem_index) {
    const problem_ids = list();
    const problem = get(problem_ids[problem_index]);

    console.log("Generating code completions...");
    const x = await generate_codex(problem_ids[problem_index], CODE_GENERATIONS,
        { temperature: TEMPERATURE, model: "code-davinci-002", max_tokens: MAX_TOKENS, test_prompt: false });

    console.log("Generating test completions...");
    const y = await generate_codex(problem_ids[problem_index], TEST_GENERATIONS,
        { temperature: TEMPERATURE, model: "code-davinci-002", max_tokens: MAX_TOKENS, test_prompt: true });

    console.log("Filtering out test cases from y...");
    const z = filter_asserts(y.map(e => e.text), problem.entry_point);

    const cache_key = hash(JSON.stringify({ x, assertions: z }));
    console.log(JSON.stringify({ x, assertions: z }));
    set_log_file_key(`${problem.task_id.replace('/', '_')}_${cache_key}`);
    clear_log_file();

    print("General Info", [
        `Problem ID: ${problem_ids[problem_index]}`,
        `Entry Point: ${problem.entry_point}`,
        `#Code Generations: ${CODE_GENERATIONS}`,
        `#Test Generations: ${TEST_GENERATIONS}`,
    ])

    print("Generated Code Completions (x)", x.map(e => e.filename));
    print("Generated Test Completions (y)", y.map(e => e.filename));
    print("Extracted Assertions from Test Completions (z)", z);

    console.log("Executing tests...");
    let bitmap;
    if (!await hasDir(`./cache/${cache_key}.json`)) {
        const results = [];
        const N = x.length * z.length;
        let i = { count: 0 };
        for (let code_completion of x) {
            const code = `${code_completion.prompt}${code_completion.text}`;
            const result = await run_assertions(code, z, i, N, code_completion.filename);
            results.push(result);
        }

        bitmap = results.map(r => r.map(e => e ? 1 : 0).join(""));

        console.log("Caching results...");
        if (!await hasDir('./cache')) {
            await makeDir('./cache');
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await writefile(`./cache/${cache_key}.json`, JSON.stringify({ bitmap }));
    } else {
        console.log("Loading cached results...");
        const data = JSON.parse(await readfile(`./cache/${cache_key}.json`));
        bitmap = data.bitmap;
    }

    print("Bitmap", bitmap);

    console.log("Computing sibling sets...");
    const siblings = compute_siblings(bitmap);
    print("Sibling Sets", siblings.map(e => Array.from(e)));

    console.log("Computing scores for each sibling Set...");
    const scores = siblings.map(sibling_set => {
        const i = [...sibling_set][0];
        const r = bitmap[i].split('').reduce((a, b) => Number(a) + Number(b));
        const score = sibling_set.size * r;
        return score;
    });
    print("Sibling Scores", scores);

    console.log("Selecting best sibling set...");
    const best_sibling_set = siblings[scores.indexOf(Math.max(...scores))];
    const best_bitmap = bitmap[[...best_sibling_set][0]];
    print("Best Sibling Set", [Array.from(best_sibling_set)]);
    print("Best Bitmap Row", [best_bitmap]);

    console.log("Selecting best tests...");
    const best_tests = pick(best_bitmap, z);
    print("Best Tests", best_tests);

    console.log("Executing tests on canonical solution...")
    const code = `${x[0].prompt}${problem.canonical_solution}`;
    const result = (await run_assertions(code, z)).map(e => e ? 1 : 0).join("");
    print("Canonical Code Solution", [code]);
    print("Canonical Solution", [result]);

    console.log("Compare Best Bitmap to Canonical Solution...");
    print("Compare Best Generated Solution with Canonical Solution", [
        `Best Generated Solution: ${best_bitmap}`,
        `Canonical Solution     : ${result}`,
    ]);
    let comparison = [];
    for (let i = 0; i < best_bitmap.length; i++) {
        comparison.push(`${best_bitmap[i]}->${result[i]}`);
    }
    print("Detailed Comparison", comparison.map((e, i) => `${e} : ${e === '1->0' || e === '0->1' ? z[i] : ''}`));
}

async function main() {
    const problem_index = Number(process.argv[2]);
    console.log(`Running problem ${problem_index}`);
    await run(problem_index);
}

main();