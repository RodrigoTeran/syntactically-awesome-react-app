const inquirer = require('inquirer');
const { join } = require('path');
const chalk = require("chalk");
const { execSync } = require("child_process");
const {
    appNameQuestion,
    templateTypeQuestion,
    templateTypeChoices
} = require("./config");

const questions = async () => {
    let answersAppName = {};
    let answersTemplate = {};

    try {
        answersAppName = await inquirer.prompt([
            {
                type: "input",
                name: appNameQuestion,
                message: "App name:",
                validate: (name) => {
                    return /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g.test(name);
                }
            }
        ]);
    } catch (error) {
        console.error(chalk.red.bold("Error in name question:", error));
        process.exit(-1);
    }

    try {
        answersTemplate = await inquirer.prompt([
            {
                type: "list",
                name: templateTypeQuestion,
                message: "Template:",
                choices: templateTypeChoices
            }
        ]);
    } catch (error) {
        console.error(chalk.red.bold("Error in template question:", error));
        process.exit(-1);
    }

    return {
        ...answersAppName,
        ...answersTemplate
    }
};


const paramOr = (map, arg, def) => map.get(arg) || def
const makePath = (...p) => join(...p)
const ignoreContent =
    (...values) =>
        source =>
            !values.some(x => source === x)

const runCommand = command => {
    try {
        execSync(`${command}`, {
            stdio: "inherit",
            shell: "/bin/bash"
        })
    } catch (e) {
        console.error(chalk.red.bold(`Failed to execute ${command} => ${e}`));
        return false;
    }
    return true;
}

const runCommandNoLogs = command => {
    try {
        execSync(`${command}`, {
            shell: "/bin/bash"
        })
    } catch (e) {
        console.error(chalk.red.bold(`Failed to execute ${command} => ${e}`));
        return false;
    }
    return true;
}

module.exports = {
    questions,
    paramOr,
    makePath,
    ignoreContent,
    runCommand,
    runCommandNoLogs
}