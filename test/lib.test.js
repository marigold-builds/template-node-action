import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getInput, run, formatOutputLine } from '../src/lib.js';

test('getInput reads INPUT_ env with dashes to underscores', () => {
  assert.equal(getInput('who', { INPUT_WHO: 'x' }), 'x');
  assert.equal(getInput('who-else', { INPUT_WHO_ELSE: 'y' }), 'y');
  assert.equal(getInput('missing', {}), '');
});

test('run returns outputs from inputs', () => {
  assert.deepEqual(run({ who: 'world' }), { greeting: 'hello, world' });
  assert.deepEqual(run({ who: '' }), { greeting: 'hello, there' });
});

test('formatOutputLine uses the GITHUB_OUTPUT heredoc form so a multi-line value survives', () => {
  assert.equal(
    formatOutputLine('greeting', 'hello\nworld', 'EOF_TEST'),
    'greeting<<EOF_TEST\nhello\nworld\nEOF_TEST\n'
  );
});

test('formatOutputLine defaults to a random delimiter so different calls do not collide', () => {
  const a = formatOutputLine('k', 'v');
  const b = formatOutputLine('k', 'v');
  assert.notEqual(a, b);
  assert.match(a, /^k<<ghadelimiter_\w+\nv\nghadelimiter_\w+\n$/);
});
