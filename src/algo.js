

/* This class defines our most basic node that includes it's latitude, longitude,
the id # of the node, the string name, and a list of neighbors that it has an edge
to */
class Node {
    constructor(latitude, longitude, id, name, neighbors) {
      // console.log("New Node: " + latitude + ","+longitude+","+neighbors);
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

global.nodes = [];
//Generate Nodes from CSV
function generateNodes() {
  var nodesStr, edgesStr;
  var attr = [];
  var readline = require('readline');
  const fs = require('fs');
  const readNodes = readline.createInterface({
    input: fs.createReadStream('../public/nodes.csv'),
    // output: process.stdout,
    console: false
  });
  readNodes.on('line', function(line) {
    attr.push(line);
    // console.log(line);
  });
  readNodes.on("close", function() {
    console.log("closing readNodes");
    // console.log("attr = " + attr);
  });

  var readEdges = readline.createInterface({
    input: fs.createReadStream('../public/edges.csv'),
    // output: process.stdout,
    console: false
  });
  var counter = 0;
  readEdges.on('line', function(line) {
    // console.log(attr[counter]);
    var nodeAttr = attr[counter].split(',');

    var neighbors = [];
    line = line.replace('"', '');
    line = line.toString().replace('"', '')
    // console.log(line);
    var tmp = line.split(",");
    for(let i = 0; i < tmp.length; i++) {
      neighbors.push(parseInt(tmp[i]));
    }
  nodes.push(new Node(parseInt(nodeAttr[0]), parseInt(nodeAttr[1]), parseInt(nodeAttr[2]), nodeAttr[3], neighbors));
  // console.log("nodes = " + nodes)
  counter++;
  });
  readEdges.on("close", function() {
    console.log("Closing readEdges");
    // console.log("nodes = " + nodes);
    console.log(searchHelper("LSU Art Building", "Animal and Food Science Lab"));

  });
  // return nodes;
}
// console.log("test,Nodes= ",generateNodes())
generateNodes();
// var nodes = generateNodes();
// console.log("test, nodes = ", nodes);
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

function searchHelper(current, goal) {
  // console.log("nodes = " + nodes);
  var node1, node2;
  console.log("current = " + current);
  console.log("goal = " + goal);
  for(var i = 0; i < nodes.length; i++) {
    // console.log("nodes["+i+"] = " + nodes[i].getName());
    if(nodes[i].getName() == current) node1 = nodes[i];
    else if(nodes[i].getName() == goal) node2 = nodes[i];
    if(node1 != undefined && node2 != undefined) break;
  }
  if(node1 != undefined && node2 != undefined) return aStarSearch(node1, node2);
  else {
    console.log("Error, nodes not found");
    // console.log("node1: " + node1);
    // console.log("node2: " + node2);
  }
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
// console.log(searchHelper("LSU Art Building", "Animal and Food Science Lab"));
