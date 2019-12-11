import React from 'react';

/* This class defines our most basic node that includes it's latitude, longitude,
the id # of the node, the string name, and a list of neighbors that it has an edge
to */
class Node {
    constructor(latitude, longitude, id, name, neighbors) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
        this.name = name;
        this.neighbors = neighbors;
    }

    getLatitude() { return this.latitude; }
    setLatitude(latitude) { this.latitude = latitude; }
    getLongitude() { return this.longitude; }
    setLongitude(longitude) { this.longitude = longitude; }
    getId() { return this.id; }
    setId(id) { this.id = id; }
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getNeighbors() { return this.neighbors; }
    setNeighbors(neighbors) { this.neighbors = neighbors; }
}

//Generate Nodes from CSV
var nodes = [];
var nodesStr, edgesStr;
const readLine = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('nodes.csv'),
  output: process.stdout,
  console: false
});
readInterface.on('line', function(line) {
  console.log(line);
});

// var http = new XMLHttpRequest({mozSystem: true});
// http.onreadystatechange = function() {
//   if(this.readyState == 4 && this.status == 200) {
//     nodesStr = this.result;
//     http2.open("GET", "file:///edges.csv", true);
//     http2.send();
//   }
// };
// var http2 = new XMLHttpRequest({mozSystem: true});
// http2.onreadystatechange = function() {
//   if(this.readyState == 4 && this.status == 200) {
//     var lines = nodesStr.split("\n");
//     var edges = this.result.split("\n");
//     for (var line = 0; line < lines.length; line++){
//       var attr = lines[line].split(",");
//       var tmp = edges[line].split(",");
//       var neighbors = [];
//       for(let i = 1; i < tmp.length; i++) {
//         neighbors.push(parseInt(tmp[i]));
//       }
//       nodes.push(new Node(attr[0], attr[1], parseInt(attr[2]), attr[3], neighbors));
//     }
//     console.log(nodes);
//   }
// }
// http.open("GET", "file:///nodes.csv", true);
// http.send();


//helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

//uses 'haversine' formula to calculate shortest distance on the earths surface
function distance(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;

    const R = 6371e3; //meters
    let lat1 = toRadians(x1);
    let lat2 = toRadians(x2);
    let diffx = toRadians(x2-x1);
    let diffy = toRadians(y2-y1);
    let a = Math.sin(diffx/2) * Math.sin(diffx/2) +
        Math.cos(x1) * Math.cos(x2) *
        Math.sin(diffy/2) * Math.sin(diffy/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return  d = R * c;
}

//return a list of the available nodes from current node
function getSuccessors(current) {
    return current.getNeighbors();
}

//do the heuristic estimation for a node to the goal
function estimate(current, goal) {
    //use path distance of csv neighbors to get the heuristic?
}

function aStarSearch(current, goal) {
    const priorityQueue = [current];
    const closed = new Set();
    const parents = new Map();
    const gScore = new Map();
    const fScore = new Map();
    let node = null;

    gScore.set(current, 0);
    fScore.set(current, distance(goal));

    while (priorityQueue[0] || priorityQueue.length) {
        node = priorityQueue.shift();

        if (closed.has(node)) {
            continue;
        }
        if (goal == node) {
            break; // backtrack from here to get the path
        }
        closed.add(node)

        for (let child of getSuccessors(node)) {
            if (closed.has(child)) {
                continue;
            }
            priorityQueue.push(child);

            // The distance from start to a child
            const tentativeGScore = distance(child.getLatitude(), child.getLongitude(), goal.getLatitude(), goal.getLongitude());
            const childGScore = gScore.has(child) ? gScore.get(child) : Infinity;

            // This is not a better path
            if (tentativeGScore >= childGScore) {
                continue
            }
            // This path is the best until now. We should save it.
            parents.set(child, node);
            gScore.set(child, tentativeGScore);

            const childFScore = tentativeGScore + estimate(child, goal);
            fScore.set(child, childFScore)
        }

        priorityQueue.sort((a, b) => fScore.get(a) - fScore.get(b))
    }

    const path = [];
    while (node) {
        path.push(node);
        node = parents.get(node);
    }
    return path.reverse();
}
