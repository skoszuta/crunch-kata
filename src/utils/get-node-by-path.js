export default function getNodeByPath(path, tree) {
  const pathQueue = [...path];
  let node = tree;

  while(pathQueue.length) {
    node = node[pathQueue.shift()];
  }

  return node;
}
