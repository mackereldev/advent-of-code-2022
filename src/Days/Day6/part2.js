import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const stream = data.toString();
const markerLength = 14;

for (let i = 0; i < stream.length; i++) {
    let candidate = [];
    for (let j = 0; j < markerLength; j++) {
        candidate.push(stream[i+j])
    }
    let freq = {};
    candidate.forEach(e => freq[e] ? freq[e]++ : freq[e] = 1);
    
    if (Object.keys(freq).length == markerLength) {
        console.log(i+markerLength);
        break;
    }
}
