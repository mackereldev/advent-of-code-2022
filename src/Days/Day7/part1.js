import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";
import lodash from "lodash";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n")

let tree = {_size: 0};
let location = [];
let directoryReference = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("$")) {
        if (line.startsWith("cd", 2)) {
            let target = line.split(" ")[2];
            if (target == "/") {
                location = [];
            } else if (target == "..") {
                location.pop();
            } else {
                location.push(target);
            }
        }
    } else {
        if (line.startsWith("dir")) {
            let dir = line.split(" ")[1];
            lodash.set(tree, location.concat([dir]), {_size: 0}); // Add directory to tree
            directoryReference.push(location.concat([dir])) // Add directory to directoryReference
        } else {
            let split = line.split(" ");
            let size = parseInt(split[0]);
            let file = split[1];
            lodash.set(tree, location.concat([file]), size); // Add file to tree
            
            for (let j = 0; j < location.length; j++) {
                let newLoc = [...location];
                newLoc.reverse();
                newLoc.splice(0, j);
                newLoc.reverse();
    
                let currentSize = lodash.get(tree, newLoc)["_size"];
                lodash.set(tree, newLoc.concat(["_size"]), currentSize+size);
            }

            lodash.set(tree, ["_size"], lodash.get(tree, ["_size"])+size); // Update root size
        }
    }
}

let shortListSum = 0;
for (let i = 0; i < directoryReference.length; i++) {
    const dir = directoryReference[i];
    const size = lodash.get(tree, dir)["_size"];
    if (size <= 100000) {
        shortListSum += parseInt(size);
    }
}

console.log(shortListSum);
