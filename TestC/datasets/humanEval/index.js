import { create_completion } from '../../api/codex.js';
import { readfile, writefile, getFiles, hasDir, makeDir } from '../../utils/io.js';
import { hash } from '../../utils/crypto.js';
import { readFileSync } from "fs";

const HUMAN_EVAL = readFileSync('./datasets/humanEval/HumanEval.jsonl', 'utf8')
    .split('\n')
    .slice(0, -1)
    .map(e => JSON.parse(e));

const TEST_PROMPT = readFileSync('./datasets/humanEval/test_prompt.py', 'utf8');

export function list() {
    return HUMAN_EVAL.map(e => e.task_id);
}

export function get(id) {
    const problem = HUMAN_EVAL.find(e => e.task_id === id);
    if (!problem) throw new Error(`No problem with id ${id}`);
    return problem;
}

// Generate code completions for a given problem
// test_prompt bool: can be used to identify if the test prompt should be appended to the code prompt
export async function generate_codex(id, n, { temperature = 0.6, model = "code-davinci-002", max_tokens = 300, test_prompt = false } = {}) {
    const problem = get(id);
    const code = problem.prompt;
    const test_prompt_repl = TEST_PROMPT.replace('$$$', problem.entry_point);
    const prompt = test_prompt ? code + test_prompt_repl : code;
    const key = hash(JSON.stringify({ prompt, temperature, model, max_tokens }));
    console.log("Generation key: ", key);

    // Check if there is cached results for this problem
    if (!await hasDir('./datasets/humanEval/cache')) {
        await makeDir('./datasets/humanEval/cache');
    }

    let chached_items_count = 0;

    if (await hasDir(`./datasets/humanEval/cache/${key}`)) {
        const items = await getFiles(`./datasets/humanEval/cache/${key}`);
        chached_items_count = items.length;
        if (chached_items_count >= n) {
            console.log(`Using cached results from ${key}`);
            return Promise.all(items.map(e => `./datasets/humanEval/cache/${key}/${e}`)
                .slice(0, n)
                .map(async (e) => {
                    const completion = await readfile(e);
                    const key2 = hash(completion);
                    const filename = `${key2}.py`;
                    return {
                        prompt: prompt,
                        text: completion,
                        filename: `./datasets/humanEval/cache/${key}/${filename}`,
                    }
                }));
        }
    }

    const completions = [];

    let error = false;

    for (let i = chached_items_count; i < n; i++) {
        completions.push((async () => {
            let completion;
            try {
                completion = (await create_completion(prompt, { temperature, model, max_tokens }))[0].text;
            } catch (e) {
                error = e;
                return null;
            }

            // Cache the results
            if (!await hasDir(`./datasets/humanEval/cache/${key}`)) {
                await makeDir(`./datasets/humanEval/cache/${key}`);
            }

            const key2 = hash(completion);
            const filename = `${key2}.py`;
            await writefile(`./datasets/humanEval/cache/${key}/${filename}`, completion);

            console.log(`   Generated ${i + 1}/${n}.`);
            return {
                prompt: prompt,
                text: completion,
                filename: `./datasets/humanEval/cache/${key}/${filename}`,
            };
        })());

        // Wait to avoid OpenAI API rate limit
        await new Promise(resolve => setTimeout(resolve, 3050));
        if (error) break;
    }

    const compl = await Promise.all(completions);

    if (error) {
        throw new Error(`Codex API Error:\n${error}`);
    } else {
        return compl;
    }
}

export async function fill_cache(k, code_generations, test_generations, temperature, max_tokens) {
    const problem_ids = list();
    console.log("problem_ids", problem_ids);

    while (true) {
        try {
            for (let i = k; i < k + 1; i++) {

                console.log(`Generating ${i} test: ${problem_ids[i]}`);
                await generate_codex(problem_ids[i], test_generations,
                    { temperature: temperature, model: "code-davinci-002", max_tokens: max_tokens, test_prompt: true });

                console.log(`Generating ${i} code: ${problem_ids[i]}`);
                await generate_codex(problem_ids[i], code_generations,
                    { temperature: temperature, model: "code-davinci-002", max_tokens: max_tokens, test_prompt: false });

            }
            break;
        } catch (e) {
            console.log(e);
            await new Promise(resolve => setTimeout(resolve, 20000));
            continue;
        }
    }
}
