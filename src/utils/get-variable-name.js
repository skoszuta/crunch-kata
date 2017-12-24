export default function getVariableName({ name = '(unnamed variable)' }, id = null) {
  return `${id ? `${id} - ` : ''}${name}`;
}
