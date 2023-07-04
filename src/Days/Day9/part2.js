import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g)
let head = { x: 0, y: 0 };
let tails = Array.from({ length: 9 }, () => ({ x: 0, y: 0 }));
let lastTailHistory = [{ x: 0, y: 0 }];

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

        followHead(head, tails[0]);
        for (let i = 0; i < tails.length - 1; i++) {
            followHead(tails[i], tails[i + 1]);
        }

        const lastTail = tails.at(-1);
        if (!lastTailHistory.some(item => item.x == lastTail.x && item.y == lastTail.y)) {
            lastTailHistory.push({ x: lastTail.x, y: lastTail.y });
        }
    }
}

function followHead(h, t) {
    if (Math.abs(h.x - t.x) > 1 || Math.abs(h.y - t.y) > 1) {
        if (t.x != h.x && t.y != h.y) {
            t.x += Math.sign(h.x - t.x);
            t.y += Math.sign(h.y - t.y);
        } else {
            if (Math.abs(h.x - t.x) > 1) {
                t.x += Math.sign(h.x - t.x);
            }
            if (Math.abs(h.y - t.y) > 1) {
                t.y += Math.sign(h.y - t.y);
            }
        }
    }
}

console.log(lastTailHistory.length);
