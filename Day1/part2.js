import { readFileSync } from "fs";

let data = readFileSync("./Day1/input.txt");
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
            if (currCals > mostCals[1]) {
                if (currCals > mostCals[0]) {
                    mostCals.splice(0, 0, currCals);
                    mostCals.pop();
                } else {
                    mostCals.splice(1, 0, currCals);
                    mostCals.pop();
                }
            } else {
                mostCals.splice(2, 0, currCals);
                mostCals.pop();
            }
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
