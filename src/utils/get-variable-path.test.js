import fs from 'fs';

import getVariablePath from './get-variable-path';

const { graph: tree } = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('getVariablePath', () => {
  it('should return the correct path for variables at the end of the tree', () => {
    expect(getVariablePath('62c00f', tree)).toEqual([1, 'Purchase Consideration and Behavior', 0, 'Taxis', 1]);
  });

  it('should return the correct path for variables at the root of the tree', () => {
    expect(getVariablePath('0894c5', tree)).toEqual([5]);
  });

  it('should return undefined for non-existent variables', () => {
    expect(getVariablePath('n0n3xist3nt', tree)).toBeUndefined();
  });
});
