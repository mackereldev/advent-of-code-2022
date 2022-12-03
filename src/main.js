import { exec } from "child_process";
import inquirer from "inquirer";

inquirer.prompt([
    {
        type: "list",
        message: "Pick a day:",
        name: "day",
        choices: ["Day 3", "Day 2", "Day 1"]
    }
])
.then(dayAnswer => {
    let day = parseInt(dayAnswer.day.replace(/\D/g,''));
    inquirer.prompt([
        {
            type: "list",
            message: "Pick a part:",
            name: "part",
            choices: ["Part 1", "Part 2"]
        }
    ])
    .then(partAnswer => {
        let part = parseInt(partAnswer.part.replace(/\D/g,''));
        run(day, part);
    })
})

function run(day, part) {
    exec(`node ./src/Days/Day${day}/part${part}.js`, (error, stdout, stderr) => {
        if (error == null) {
            let output = stdout.replace(/([\r\n])+/g, "");
            console.log(`Day ${day} Part ${part}: ${output}`);
        } else {
            console.warn(`An error occured: ${error.name} (${error.code})`);
        }
        return (error != null) ? error.code : 0;
    })
}
