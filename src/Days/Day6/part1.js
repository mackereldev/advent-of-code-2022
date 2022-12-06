import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const stream = data.toString();

for (let i = 0; i < stream.length; i++) {
    let candidate = [stream[i], stream[i+1], stream[i+2], stream[i+3]];
    let freq = {};
    candidate.forEach(e => freq[e] ? freq[e]++ : freq[e] = 1);
    
    if (Object.keys(freq).length == 4) {
        console.log(i+4);
        break;
    }
}
