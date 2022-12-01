import { exec } from "child_process";

function run(day, part) {
    exec(`node ./Day${day}/part${part}.js`, (error, stdout, stderr) => {
        let output = stdout.replace(/([\r\n])+/g, "");
        console.log(`Day ${day} Part ${part}: ${output}`);
    })
}

run(1, 1);
run(1, 2);
