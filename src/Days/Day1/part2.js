import { readFileSync } from "fs";

let data = readFileSync("./src/Days/Day1/input.txt");
let arr = data.toString().split("\r\n");

let mostCals = [0, 0, 0];
let currCals = 0;
for (let i = 0; i < arr.length; i++) {
    let cals = parseInt(arr[i]);

    if (!cals || i+1 == arr.length) {
        if (i+1 == arr.length) {
            currCals += cals;
        }
        if (currCals > mostCals[2]) {
            mostCals.push(currCals);
            mostCals.sort((a, b) => b - a);
            mostCals.pop();
        }
        
        currCals = 0;
    } else {
        currCals += cals;
    }
}

let sum = 0;
for (let i = 0; i < mostCals.length; i++) {
    sum += mostCals[i];
}
console.log(sum);
