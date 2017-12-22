import fs from 'fs';

import variablesReducer from './variables-reducer';
import { FETCH_VARIABLES_WITH_ORDER } from '../actions/variables-actions';

const variablesJson = JSON.parse(fs.readFileSync('json/variables.json', 'utf8'));
const orderJson = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('variablesReducer', () => {
  it('should return the initial state', () => {
    expect(variablesReducer(void 0, {})).toBeNull();
  });

  it('should handle FETCH_VARIABLES_WITH_ORDER', () => {
    const actionMock = {
      type: FETCH_VARIABLES_WITH_ORDER,
      payload: [variablesJson, orderJson]
    };

    expect(variablesReducer(void 0, actionMock)).toEqual({
      index: variablesJson.index,
      order: orderJson.graph
    });

    expect(variablesReducer({ index: {}, order: [] }, actionMock)).toEqual({
      index: variablesJson.index,
      order: orderJson.graph
    });
  });
});
