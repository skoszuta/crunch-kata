export const FETCH_VARIABLES_WITH_ORDER = 'fetch_variables_with_order';

export function fetchVariablesWithOrder() {
  const requests = [
    fetch('/json/variables.json').then(response => response.json()),
    fetch('/json/order.json').then(response => response.json())
  ];

  return {
    type: FETCH_VARIABLES_WITH_ORDER,
    payload: Promise.all(requests)
  };
}
