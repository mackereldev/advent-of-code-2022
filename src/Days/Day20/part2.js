import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

class Item {
    value;
    originalIndex;

    constructor(value, originalIndex) {
        this.value = value;
        this.originalIndex = originalIndex;
    }
}

const key = 811589153;
let sequence = lines.map((v, i) => new Item(parseInt(v) * key, i));
const reps = 10;

for (let i = 0; i < reps; i++) {
    for (let j = 0; j < sequence.length; j++) {
        let index = sequence.findIndex((item) => item.originalIndex == j);
        let item = sequence[index]
        let newIndex = (index + item.value) % (sequence.length - 1);
        if (newIndex == 0) {
            newIndex = sequence.length;
        }
        if (newIndex == sequence.length) {
            newIndex = 0;
        }
        
        sequence.splice(index, 1);
        sequence.splice(newIndex, 0, item);
    }
    
}

let sum = 0;
let zero = sequence.findIndex((item) => item.value == 0);
for (let i = 0; i < 3; i++) {
    sum += sequence[((i + 1) * 1000 + zero) % sequence.length].value;
}

console.log(sum);
