import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

let rootMonkey = null;
let closedMonkeys = new Map();
let openMonkeys = new Map();

for (let i = 0; i < lines.length; i++) {
    let monkey = lines[i].split(": ");
    
    if (Number.isSafeInteger(parseInt(monkey[1]))) {
        closedMonkeys.set(monkey[0], parseInt(monkey[1]));
    } else {
        openMonkeys.set(monkey[0], monkey[1].split(" "));
    }
}

do {    
    openMonkeys.forEach((value, key) => {
        if (key == "root") {
            rootMonkey = value;
            openMonkeys.delete(key);
        } else if (closedMonkeys.has(value[0]) && closedMonkeys.has(value[2])) {
            closedMonkeys.set(key, evaluate(value));
            openMonkeys.delete(key);
        }
    });
} while (openMonkeys.size > 0);

function evaluate(operation) {
    let a = closedMonkeys.get(operation[0]);
    let b = closedMonkeys.get(operation[2]);
    let op = operation[1];
    
    if (op == "+") {
        return a + b;
    } else if (op == "-") {
        return a - b;
    } else if (op == "*") {
        return a * b;
    } else if (op == "/") {
        return a / b;
    }
}

console.log(evaluate(rootMonkey));
