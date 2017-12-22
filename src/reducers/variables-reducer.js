import { FETCH_VARIABLES_WITH_ORDER } from 'actions/variables-actions';

export default function variablesReducer(variables = null, action) {
  switch (action.type) {
    case FETCH_VARIABLES_WITH_ORDER:
      const [{ index }, { graph: order }] = action.payload;

      return { index, order };
    default:
      return variables;
  }
}
