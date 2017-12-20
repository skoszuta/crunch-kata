export default function getVariableName({ name }, id = null) {
  return `${id ? `${id} - ` : ''}${name ? name : '(unnamed variable)'}`;
}
