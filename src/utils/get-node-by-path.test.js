import fs from 'fs';
import getNodeByPath from './get-node-by-path';

const { graph: tree } = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('getNodeByPath', () => {
  it('should return the correct node from the root of the tree', () => {
    expect(getNodeByPath([5], tree)).toBe('0894c5');
  });

  it('should return the correct node from the middle of the tree', () => {
    expect(getNodeByPath([1, 'Purchase Consideration and Behavior', 0], tree)).toEqual({
      Taxis: ['ede6a8', '62c00f', '0f6ce0', 'f2a681']
    });
  });

  it('should return the correct node from the end of the tree', () => {
    expect(getNodeByPath([0, 'Awareness Metrics', 0, 'Taxis', 1], tree)).toBe('7a89e0');
  });
});
