import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n");

const rounds = 10000;

let monkeys = new Array(data.toString().match(/Monkey \d+/g).length);
for (let i = 0; i < monkeys.length; i++) {
    monkeys[i] = {};
    monkeys[i].inspected = 0;

    const startingItems = lines[i*7+1].trim();
    monkeys[i].items = startingItems.match(/\d+/g).map(item => parseInt(item));

    const operationRaw = lines[i*7+2].trim();
    monkeys[i].operation = operationRaw.slice(operationRaw.indexOf("new")+6, operationRaw.length).split(" ");
    monkeys[i].test = parseInt(lines[i*7+3].match(/\d+/g));
    monkeys[i].trueRes = parseInt(lines[i*7+4].match(/\d+/g));
    monkeys[i].falseRes = parseInt(lines[i*7+5].match(/\d+/g));
}

for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
    
        for (var k = monkey.items.length - 1; k >= 0; k--) {
            let worryLevel = monkey.items[k];
            monkey.inspected++;
            
            // Run operation
            const a = worryLevel;
            const operator = monkey.operation[1];
            const b = !isNaN(parseInt(monkey.operation[2])) ? parseInt(monkey.operation[2]) : worryLevel;
            worryLevel = operator == "+" ? a + b : a * b;

            // Relief
            monkey.items[k] = worryLevel % monkeys.map(item => item.test).reduce((a, b) => a*b);
            
            // Run Test and throw
            if (monkey.items[k] % monkey.test == 0) {
                monkeys[monkey.trueRes].items.push(monkey.items[k]);
            } else {
                monkeys[monkey.falseRes].items.push(monkey.items[k]);
            }
            monkey.items.pop();
        }
    }
}

let topMonkeys = monkeys.map(item => item.inspected).sort((a, b) => b - a);
console.log(topMonkeys[0] * topMonkeys[1]);
