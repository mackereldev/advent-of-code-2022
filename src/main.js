import { readdirSync } from "fs";
import { exec } from "child_process";
import inquirer from "inquirer";

class Day {
    name;
    parts = [];
    hasInput = false;
}

let days = [];

const files = readdirSync("src/Days");
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    let day = new Day();
    day.name = file;

    let content = readdirSync(`src/Days/${file}`);
    if (content.includes("part1.js")) {
        day.parts.push("part1.js");
    }
    if (content.includes("part2.js")) {
        day.parts.push("part2.js");
    }
    if (content.includes("input.txt")) {
        day.hasInput = true;
    }

    days.push(day);
}

inquirer.prompt([
    {
        type: "list",
        message: "Pick a day:",
        name: "day",
        choices: days.map(item => item.name)
    }
])
.then(dayAnswer => {
    let dayName = dayAnswer.day;
    let day = days.find(item => item.name == dayAnswer.day);

    inquirer.prompt([
        {
            type: "list",
            message: "Pick a part:",
            name: "part",
            choices: day.parts
        }
    ])
    .then(partAnswer => {
        let partName = partAnswer.part;
        exec(`node ./src/Days/${dayName}/${partName}`, (error, stdout, stderr) => {
            if (error == null) {
                let output = stdout.replace(/([\r\n])+/g, "");
                console.log(`${dayName} ${partName}: ${output}`);
            } else {
                console.warn(`An error occured: ${error.name} (${error.code})`);
            }
            return (error != null) ? error.code : 0;
        })
    })
})
