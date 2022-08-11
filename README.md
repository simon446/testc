# TestC

TestC is a test generation tool based on OpenAI Codex. For more details please see [our paper](./TestC_Unit_Test_Generation_using_OpenAI_Codex.pdf).

# Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/testc-liu/testc.git
cd testc/TestC
npm install
```

Set your environment variable for the OpenAI Codex API:

```bash
export OPENAI_API_KEY=<your api key>
```

# Usage

To generate assert statements for the HumanEval dataset, run the following command:

```bash
npm start <human_eval_problem_index>
```

> Note 1: If the rate limit of the OpenAI Codex API is reached, you can wait for a while and try again, the completions that are generated are saved in the `TestC/datasets/humanEval/cache` folder.

> Note 2: The generated test cases are saved in the `TestC/logs` folder. The generated tests are under the `============ Best Tests ============` section.

> Note 3: The generated **untrusted** code is **executed** on the local machine. Consider running in a isolated environment like docker to reduce potential security risks.

Example to generate assertions for HumanEval/0:

```bash
npm start 0
```