import fs from 'fs';
import getVariableName from './get-variable-name';

const { index: { '2d27ab': namedVariable, '9f4b60': unnamedVariable } } = JSON.parse(fs.readFileSync('json/variables.json', 'utf8'));

describe('getVariableName', () => {
  it('should return the variables "name" property if present', () => {
    expect(getVariableName(namedVariable)).toBe(namedVariable.name);
  });

  it('should return "(unnamed variable)" when the variable has no "name" property', () => {
    expect(getVariableName(unnamedVariable)).toBe('(unnamed variable)');
  });

  it('should prepend a variable id if provided', () => {
    expect(getVariableName(namedVariable, '2d27ab')).toBe(`2d27ab - ${namedVariable.name}`);
  });
});
