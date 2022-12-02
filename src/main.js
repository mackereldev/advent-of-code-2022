import { exec } from "child_process";

function run(day, part) {
    exec(`node ./src/Day${day}/part${part}.js`, (error, stdout, stderr) => {
        if (error == null) {
            let output = stdout.replace(/([\r\n])+/g, "");
            console.log(`Day ${day} Part ${part}: ${output}`);
        } else {
            console.warn(`An error occured: ${error.name} (${error.code})`);
        }
        return (error != null) ? error.code : 0;
    })
}

run(1, 1);
run(1, 2);
run(2, 1);
run(2, 2);
