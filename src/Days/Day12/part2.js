import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

class Node {
    x;
    y;
    height;
    get g() {
        if (this.parent != null) {
            return this.parent.h + Math.floor(dist([this.x, this.y], [this.parent.x, this.parent.y]) * 10);
        } else {
            return 0;
        }
    }
    parent;

    constructor(x, y, height, parent) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.parent = parent;
    }
}

const width = lines[0].length;
const height = lines.length;
const order = "Ezyxwvutsrqponmlkjihgfedcba";

let openNodes = [];
let closedNodes = [];
let startPos;

let grid = [];
for (let y = 0; y < lines.length; y++) {
    grid[y] = [];
    for (let x = 0; x < lines[y].length; x++) {
        grid[y].push(lines[y][x]);
        let index = order.indexOf(lines[y][x]);
        if (index == 0) {
            startPos = [x, y];
        }
    }
}

let lastNode = null;
openNodes.push(new Node(startPos[0], startPos[1], 0, null));
while (openNodes.length > 0) {
    let frontier = null;
    for (let i = 0; i < openNodes.length; i++) {
        const openNode = openNodes[i];
        if (frontier == null || openNode.h < frontier.h) {
            frontier = openNode;
        }
    }

    if (order.indexOf(grid[frontier.y][frontier.x]) == order.length - 1) {
        lastNode = frontier;
        break;
    }
    
    if (isAvailable(frontier, 0, 1)) {
        openNodes.push(new Node(frontier.x, frontier.y + 1, order.indexOf(grid[frontier.y + 1][frontier.x]), frontier));
    }
    
    if (isAvailable(frontier, 1, 0)) {
        openNodes.push(new Node(frontier.x + 1, frontier.y, order.indexOf(grid[frontier.y][frontier.x + 1]), frontier));
    }
    
    if (isAvailable(frontier, 0, -1)) {
        openNodes.push(new Node(frontier.x, frontier.y - 1, order.indexOf(grid[frontier.y - 1][frontier.x]), frontier));
    }
    
    if (isAvailable(frontier, -1, 0)) {
        openNodes.push(new Node(frontier.x - 1, frontier.y, order.indexOf(grid[frontier.y][frontier.x - 1]), frontier));
    }

    let selectedNode = openNodes.splice(openNodes.indexOf(frontier), 1)[0];
    closedNodes.push(selectedNode);
    updateNeighbours(selectedNode);
}

if (lastNode != null) {
    let pathLength = 0;
    let currentNode = lastNode;
    while (currentNode.parent != null) {
        pathLength++;
        currentNode = currentNode.parent;
    }
    console.log(pathLength);
} else {
    console.log("Route cannot be found.");
}

function isAvailable(node, dX, dY) {
    if (node.x + dX >= 0 && node.x + dX < width && node.y + dY >= 0 && node.y + dY < height) {
        let heightDiff = order.indexOf(grid[node.y + dY][node.x + dX]) - node.height;
        if (heightDiff <= 1) {
            if (!openNodes.some((n) => n.x == node.x + dX && n.y == node.y + dY)) {
                if (!closedNodes.some((n) => n.x == node.x + dX && n.y == node.y + dY)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function updateNeighbours(node) {
    let up = openNodes.find((n) => n.x == node.x && n.y == node.y + 1);
    if (up != null) {
        let heightDiff = up.height - node.height;
        if (heightDiff <= 1) {
            if (node.g + dist([node.x, node.y], [up.x, up.y]) < up.g) {
                up.parent = node;
            }
        }
    }
    
    let right = openNodes.find((n) => n.x == node.x + 1 && n.y == node.y);
    if (right != null) {
        let heightDiff = right.height - node.height;
        if (heightDiff <= 1) {
            if (node.g + dist([node.x, node.y], [right.x, right.y]) < right.g) {
                right.parent = node;
            }
        }
    }
    
    let down = openNodes.find((n) => n.x == node.x && n.y == node.y - 1);
    if (down != null) {
        let heightDiff = down.height - node.height;
        if (heightDiff <= 1) {
            if (node.g + dist([node.x, node.y], [down.x, down.y]) < down.g) {
                down.parent = node;
            }
        }
    }
    
    let left = openNodes.find((n) => n.x == node.x - 1 && n.y == node.y);
    if (left != null) {
        let heightDiff = left.height - node.height;
        if (heightDiff <= 1) {
            if (node.g + dist([node.x, node.y], [left.x, left.y]) < left.g) {
                left.parent = node;
            }
        }
    }
}

function dist(a, b) {
    Math.sqrt(((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2));
}

function debug() {
    for (let y = 0; y < height; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
            let node = closedNodes.find((node) => node.x == x && node.y == y);
            if (node != null) {
                if (node.parent == null) {
                    line += "X";
                } else {
                    if (node.parent.y > node.y) {
                        line += "V";
                    } else if (node.parent.y < node.y) {
                        line += "^";
                    } else if (node.parent.x > node.x) {
                        line += ">";
                    } else if (node.parent.x < node.x) {
                        line += "<";
                    }
                }
            } else if (openNodes.some((node) => node.x == x && node.y == y)) {
                line += "@";
            } else {
                line += ".";
            }
        }
        console.log(line);
    }

    console.log();
}
