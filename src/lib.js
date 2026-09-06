export function getInput(name, env = process.env) {
  return (env[`INPUT_${name.replace(/-/g, '_').toUpperCase()}`] ?? '').trim();
}

// Formats one line to append to $GITHUB_OUTPUT using the `<<EOF` heredoc
// form, so a multi-line value survives instead of corrupting the file
// (a plain `key=value\n` line breaks the moment `value` contains a
// newline). `delimiter` is injectable for tests; real callers should
// leave it to the random default so a value that happens to contain the
// delimiter text cannot forge extra output keys.
export function formatOutputLine(key, value, delimiter = `ghadelimiter_${Math.random().toString(36).slice(2)}`) {
  return `${key}<<${delimiter}\n${value}\n${delimiter}\n`;
}

// Pure: inputs object in, outputs object out. Replace.
export function run(inputs) {
  return { greeting: `hello, ${inputs.who || 'there'}` };
}
