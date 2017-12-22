import { FETCH_VARIABLES_WITH_ORDER, fetchVariablesWithOrder } from './variables-actions';

describe('Variables actions', () => {
  it('should create the fetchVariablesWithOrder action', () => {
    const receivedAction = fetchVariablesWithOrder();

    expect(fetchVariablesWithOrder()).toEqual(
      expect.objectContaining({
        type: FETCH_VARIABLES_WITH_ORDER,
        payload: expect.any(Promise)
      })
    );
  });
});
