"use strict";
const Node = require("./Node");
const MinHeap = require("./minHeap");
const data = require("./data");

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
  let currentNode = null;
  while (!frontier.isEmpty()) {
    currentNode = frontier.removeMin();
    frontier.clear();

    let currentCost = currentNode.getCost;
    let currentPerson = currentNode.getPerson;

    explored.add(currentPerson);

    let neighborsMap = graph.get(currentPerson).rest;

    for (let [neighborName, neighborCost] of neighborsMap) {
      if (!frontier.contains(neighborName) && !explored.has(neighborName)) {
        if (neighborName !== lastPerson) {
          const cost =
            neighborCost ** 2 + currentCost + (neighborCost + currentCost);
          const neighbor = new Node(
            neighborName,
            cost,
            currentNode //the previous of the neighbor node
          );
          frontier.insert(neighbor);
        }
      }
    }
  }
  return currentNode;
}

let firstPerson = "Ahmed";
let lastPerson = "Kamal";

let result = greedySearch(firstPerson, lastPerson);
//cost Between Final And BeforeFinal
const cost = graph.get(result.getPerson).rest.get(lastPerson);
const finalNode = new Node(lastPerson, cost, result);
finalNode.setCost = finalNode.getPrevious.getCost + cost; //so we accumulate the cost between the last node and the previous of it (to connect them at the end of the search).
printPath(finalNode);

function printPath(result) {
  result.setCost = (result.getCost + betweenFirstAndLast) * 100;
  console.log(`------Total Cost: ${result.getCost.toFixed(0)}`);
  let currentNode = result;
  const path = [];
  while (currentNode) {
    path.push(currentNode.getPerson);
    currentNode = currentNode.getPrevious;
  }
  console.log("------Path is: ");
  while (path.length !== 0) {
    console.log(path.pop());
  }
}
