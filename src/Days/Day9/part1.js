import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n")
let head = {x: 0, y: 0};
let tail = {x: 0, y: 0};
let tailHistory = [{x: 0, y: 0}];

for (let i = 0; i < lines.length; i++) {
    const instructions = lines[i].split(" ");
    const direction = instructions[0];
    const steps = parseInt(instructions[1]);

    for (let j = 0; j < steps; j++) {
        if (direction == "U") {
            head.y++;
        } else if (direction == "D") {
            head.y--;
        } else if (direction == "R") {
            head.x++;
        } else if (direction == "L") {
            head.x--;
        }

        if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
            if (tail.x != head.x && tail.y != head.y) {
                tail.x += Math.sign(head.x - tail.x);
                tail.y += Math.sign(head.y - tail.y);
            } else {
                if (Math.abs(head.x - tail.x) > 1) {
                    tail.x += Math.sign(head.x - tail.x);
                }
                if (Math.abs(head.y - tail.y) > 1) {
                    tail.y += Math.sign(head.y - tail.y);
                }
            }
        }
    
        if (!tailHistory.some(item => item.x == tail.x && item.y == tail.y)) {
            tailHistory.push({x: tail.x, y: tail.y});
        }
    }
}

console.log(tailHistory.length);
