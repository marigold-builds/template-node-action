import { appendFileSync } from 'node:fs';
import { getInput, run } from './lib.js';

const outputs = run({ who: getInput('who') });
for (const [k, v] of Object.entries(outputs)) {
  console.log(`${k}=${v}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
}
