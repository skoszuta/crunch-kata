import getVariableName from './get-variable-name';

export default function getVariablePath(key, tree, breadcrumbs = ['Root']) {
  for(let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (typeof node !== 'string') {
      const nodeName = Object.keys(node)[0];
      const searchResult = getVariablePath(key, node[nodeName], [...breadcrumbs, nodeName]);
      if (searchResult) return searchResult;
    } else if (node === key) {
      return breadcrumbs;
    }
  }
}
