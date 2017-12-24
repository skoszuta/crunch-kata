export default function getVariablePath(key, tree, breadcrumbs = []) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (typeof node !== 'string') {
      const nodeName = Object.keys(node)[0];
      const searchResult = getVariablePath(key, node[nodeName], [...breadcrumbs, i, nodeName]);
      if (searchResult) return searchResult;
    } else if (node === key) {
      return [...breadcrumbs, i];
    }
  }
}
