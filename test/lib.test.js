import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getInput, run } from '../src/lib.js';

test('getInput reads INPUT_ env with dashes to underscores', () => {
  assert.equal(getInput('who', { INPUT_WHO: 'x' }), 'x');
  assert.equal(getInput('who-else', { INPUT_WHO_ELSE: 'y' }), 'y');
  assert.equal(getInput('missing', {}), '');
});

test('run returns outputs from inputs', () => {
  assert.deepEqual(run({ who: 'world' }), { greeting: 'hello, world' });
  assert.deepEqual(run({ who: '' }), { greeting: 'hello, there' });
});
