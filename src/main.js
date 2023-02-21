import { readdirSync } from "fs";
import { exec } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

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

inquirer.prompt([{
    type: "list",
    message: "Pick a day:",
    name: "day",
    choices: days.map(item => item.name).sort((a, b) => parseInt(a.match(/(\d+)/)) - parseInt(b.match(/(\d+)/))),
    loop: false
}])
    .then(dayAnswer => {
        let dayName = dayAnswer.day;
        let day = days.find(item => item.name == dayAnswer.day);

        if (day.parts.length == 0) {
            console.error(chalk.red(`${dayName} does not contain any part files`));
            return;
        }

        if (!day.hasInput) {
            console.error(chalk.red(`${dayName} does not contain an input file`));
            return;
        }

        inquirer.prompt([{
            type: "list",
            message: "Pick a part:",
            name: "part",
            choices: day.parts.sort((a, b) => a === b ? 0 : a < b ? -1 : 1)
        }])
            .then(partAnswer => {
                let partName = partAnswer.part;
                exec(`node ./src/Days/${dayName}/${partName}`, (error, stdout, stderr) => {
                    if (error == null) {
                        let output = stdout.replace(/([\r\n])+/g, "");
                        console.log(`${dayName}/${partName}: ${output}`);
                    } else {
                        console.error(chalk.red(`An error occured: ${error.name} (${error.code})`));
                    }
                    return (error != null) ? error.code : 0;
                })
            })
    })
