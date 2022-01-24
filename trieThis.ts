/* eslint-disable linebreak-style */
/* eslint-disable no-continue */
interface ExpandedNode {
    hasItem: boolean;
    letter?: string;
    children: Array<ExpandedNode>;
}

interface CollapsedNode {
    children: Array<CollapsedNode>;
    suffixes: Array<string>;
    partial: string;
}

function findNode(term: string, root: ExpandedNode, create: boolean) : ExpandedNode {
  let currentNode: ExpandedNode | null = null;
  let list: Array<ExpandedNode> = root.children;
  let add = true;

  for (let i = 0; i < term.length; i += 1, add = true) {
    const letter = term[i];

    for (let k = 0; k < list.length; k += 1) {
      if (letter === list[k].letter) {
        currentNode = list[k];
        add = false;
        break;
      }
    }

    if (add) {
      if (!create) {
        currentNode = null;
        break;
      }

      currentNode = { hasItem: false, children: [] };
      currentNode.letter = <string>letter;

      list.push(currentNode);
    }

    list = currentNode.children;
  }

  return currentNode;
}

function getFirstNode(root: CollapsedNode, term: string) : CollapsedNode {
  let partial = '';

  let node: CollapsedNode = root;
  let finalNode: CollapsedNode = null;

  let m = 0;

  for (let i = 0; i < node.children.length && m < term.length; i += 1) {
    if (node.children[i].partial.charAt(0) !== term.charAt(m)) continue;
    node = node.children[i];
    partial = `${partial}${node.partial}`;
    m += node.partial.length;
    i = 0;
  }

  if (m >= term.length) {
    finalNode = { children: [], suffixes: [], partial: '' };
    finalNode.partial = partial;
    finalNode.children = node.children;
  }

  return finalNode;
}

function collectTerms(root: CollapsedNode) :Array<string> {
  const results: Array<string> = [];
  let current: CollapsedNode = { children: [], suffixes: [], partial: '' };
  let partial: string;
  let prefix: string;

  for (let i = 0; i < root.children.length; i += 1) {
    const node: CollapsedNode = root.children[i];

    current = node;
    prefix = node.partial;
    partial = '';

    while (current.children.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      current = current.children[0];
      partial = `${partial}${node.partial}`;
    }

    results.push(`${root.partial}${prefix}${partial}`);
  }

  return results;
}

function createExpandedTrie(items: Array<string>) : ExpandedNode {
  const rootNode: ExpandedNode = { hasItem: false, children: [] };

  for (let i = 0; i < items.length; i += 1) {
    findNode(items[i], rootNode, true).hasItem = true;
  }

  return rootNode;
}

function traverseExpandedTrie(root: CollapsedNode, currentNode: ExpandedNode, partial: string) {
  if (currentNode.children.length > 1
          || currentNode.hasItem) {
    const newNode: CollapsedNode = { children: [], suffixes: [], partial: '' };
    newNode.partial = partial;

    root.children.push(newNode);
    // eslint-disable-next-line no-param-reassign
    root = newNode;
    // eslint-disable-next-line no-param-reassign
    partial = '';
  }

  for (let i = 0; i < currentNode.children.length; i += 1) {
    traverseExpandedTrie(root, currentNode.children[i], partial + currentNode.children[i].letter);
  }
}

function createCollapsedTrie(expandedRoot: ExpandedNode) : CollapsedNode {
  const collapsedRoot: CollapsedNode = { children: [], suffixes: [], partial: '' };

  for (let i = 0; i < expandedRoot.children.length; i += 1) {
    traverseExpandedTrie(collapsedRoot, expandedRoot.children[i], expandedRoot.children[i].letter);
  }

  return collapsedRoot;
}

/*
class PatriciaTrie {
    private nodeList: Array<ExpandedNode> = [];
} */

const test = ['hallo', 'wie', 'gehts', 'fussball', 'fusswärmer', 'fusilli', 'funktioniert'];

console.log(JSON.stringify(createCollapsedTrie(createExpandedTrie(test))));
