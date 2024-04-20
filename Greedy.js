"use strict";
const Node = require("./Node");
const MinHeap = require("./minHeap");
const data = require("./data");

// const node = new Node("Anan", 0, null);
// console.log(node.getPerson);

// h(n) => percentage of hate
// g(n) => x^2 => percentage^2
/////////////////////////////////////////

const graph = data.graph;
let betweenFirstAndLast = 0;
function greedySearch(firstPerson, lastPerson) {
  let frontier = new MinHeap();

  const initialNode = graph.get(firstPerson).node;

  initialNode.setCost = 0;

  const neighborsFirst = graph.get(initialNode.getPerson).rest;

  betweenFirstAndLast = neighborsFirst.get(lastPerson);
  frontier.insert(initialNode);

  let explored = new Set();

  while (!frontier.isEmpty()) {
    let currentNode = frontier.removeMin();
    frontier.clear();

    let currentCost = currentNode.getCost;
    let currentPerson = currentNode.getPerson;

    explored.add(currentPerson);

    if (currentPerson === lastPerson) {
      return currentNode;
    }

    let neighborsMap = graph.get(currentPerson).rest;

    for (let [neighborName, neighborCost] of neighborsMap) {
      if (!frontier.contains(neighborName) && !explored.has(neighborName)) {
        const cost = neighborCost + currentCost;

        const neighbor = new Node(
          neighborName,
          cost,
          currentNode //the previous of the neighbor node
        );
        frontier.insert(neighbor);
      }
    }
  }

  return { result: "FAILURE" };
}

let firstPerson = "Fuad";
let lastPerson = "Ahmed";

let result = greedySearch(firstPerson, lastPerson);
printPath(result);

function printPath(result) {
  result.setCost = (result.getCost + betweenFirstAndLast) * 100;
  console.log(`Total Cost: ${result.getCost.toFixed(2)}`);
  let currentNode = result;
  const path = [];
  while (currentNode !== null) {
    path.push(currentNode.getPerson);
    currentNode = currentNode.getPrevious;
  }
  while (path.length !== 0) {
    console.log(path.pop());
  }
}