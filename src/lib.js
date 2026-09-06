export function getInput(name, env = process.env) {
  return (env[`INPUT_${name.replace(/-/g, '_').toUpperCase()}`] ?? '').trim();
}

// Pure: inputs object in, outputs object out. Replace.
export function run(inputs) {
  return { greeting: `hello, ${inputs.who || 'there'}` };
}
