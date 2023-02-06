#!/usr/bin/env node

const { copySync, readJsonSync, writeJsonSync } = require('fs-extra');
const chalk = require("chalk");
const {
    Ignores,
    Templates,
    PkgFieldsToKeep,
    appNameQuestion,
    templateTypeQuestion,
    emptyTemplate,
    exampleTemplate,
} = require("./config");
const {
    questions,
    makePath,
    ignoreContent,
    runCommand,
    runCommandNoLogs,
} = require("./utils");

const copyApp = async (answers) => {
    console.log(chalk.magenta.bold('\nSyntactically Awesome React App 🚀 - Bootstrapping New Project\n'));

    const source = makePath(__dirname, '../..');
    const dest = process.cwd().trim()
    // const dest = TEST_DIR;
    const app = answers[appNameQuestion].trim();
    const template = answers[templateTypeQuestion];
    const destination = makePath(dest, app);

    console.log(chalk.cyan.bold('→ create-sara-project') + " " + 'Cloning the repository...');
    copySync(source, destination, { filter: ignoreContent(...Ignores.map(x => makePath(source, x))) });
    
    console.log("Cloned https://github.com/RodrigoTeran/syntactically-awesome-react-app");

    console.log(chalk.cyan.bold('→ create-sara-project') + " " + 'Copying templates...');

    Templates.forEach(x => copySync(makePath(source, 'templates', x.file), makePath(destination, x.copyTo)));

    // Copy desire template
    if (template === emptyTemplate) {
        copySync(makePath(source, 'templates', "src_v1"), makePath(destination, "src"));
        copySync(makePath(source, 'templates', "cypress.v1.spec.ts"), makePath(destination, "cypress/e2e/spec.cy.ts"));
    } else if (template === exampleTemplate) {
        copySync(makePath(source, 'templates', "src_v2"), makePath(destination, "src"));
        copySync(makePath(source, 'templates', "cypress.v2.spec.ts"), makePath(destination, "cypress/e2e/spec.cy.ts"));
    } else {
        console.error(chalk.red.bold("Error while copying template:", error));
        process.exit(-1);
    }
    console.log(chalk.cyan.bold("Template") + " " + template);

    console.log(chalk.cyan.bold('→ create-sara-project') + " " + 'Preparing package.json...');
    const pkg = readJsonSync(makePath(source, 'package.json'))
    const newPkg = {
        name: app,
        main: 'build/index.js'
    }

    PkgFieldsToKeep.forEach(field => {
        if (typeof pkg[field] !== 'undefined') {
            newPkg[field] = pkg[field]
        }
    })

    writeJsonSync(makePath(destination, 'package.json'), newPkg, { spaces: 2 })

    return app;
};

const installApp = async (app) => {
    try {
        console.log(chalk.cyan.bold('→ create-sara-project') + " " + chalk.magenta.bold("git:(") + chalk.red.bold("main") + chalk.magenta.bold(")") + " " + "git init -b main");

        const gitInit = runCommandNoLogs(`cd ${app} && git init -b main`);
        // const gitInit = runCommandNoLogs(`cd ${TEST_DIR}/${app} && git init -b main`);
        if (!gitInit) process.exit(-1);

        console.log(chalk.cyan.bold('→ create-sara-project') + " " + chalk.magenta.bold("git:(") + chalk.red.bold("main") + chalk.magenta.bold(")") + " " + "npm install");

        const npmI = runCommand(`cd ${app} && npm install`);
        // const npmI = runCommand(`cd ${TEST_DIR}/${app} && npm install`);
        if (!npmI) process.exit(-1);

        console.log(chalk.cyan.bold('→ create-sara-project') + " " + chalk.magenta.bold("git:(") + chalk.red.bold("main") + chalk.magenta.bold(")") + " " + "preparing dependencies...");

        const npmUni = runCommandNoLogs(`cd ${app} && npm uninstall fs-extra inquirer chalk`);
        // const npmUni = runCommandNoLogs(`cd ${TEST_DIR}/${app} && npm uninstall fs-extra inquirer chalk`);
        if (!npmUni) process.exit(-1);

        console.log(chalk.cyan.bold('→ create-sara-project') + " " + chalk.magenta.bold("git:(") + chalk.red.bold("main") + chalk.magenta.bold(")") + " " + "npm run prepare");

        const npmPrepare = runCommand(`cd ${app} && npm run prepare`);
        // const npmPrepare = runCommand(`cd ${TEST_DIR}/${app} && npm run prepare`);
        if (!npmPrepare) process.exit(-1);

        const gitAdd = runCommandNoLogs(`cd ${app} && git add .`);
        // const gitAdd = runCommandNoLogs(`cd ${TEST_DIR}/${app} && git add .`);
        if (!gitAdd) process.exit(-1);

        const gitCommit = runCommandNoLogs(`cd ${app} && git commit -n -m "Initialize project using create-sara-project"`);
        // const gitCommit = runCommandNoLogs(`cd ${TEST_DIR}/${app} && git commit -n -m "Initialize project using create-sara-project"`);
        if (!gitCommit) process.exit(-1);

        console.log(chalk.blue.bold(`\nCongratulations 🚀🚀🚀 You are ready! Follow the following commands to start:`));
        console.log(chalk.blue.bold(`\ncd ${app}`));
        console.log(chalk.blue.bold(`npm start`));
    } catch (error) {
        console.error(chalk.red.bold("Error installing the app:", error));
        process.exit(-1);
    }
}

const run = async () => {
    try {
        const answers = await questions();
        const app = await copyApp(answers);
        await installApp(app);
    } catch (error) {
        console.error(chalk.red.bold("Error in create-sara-project:", error));
        process.exit(-1);
    }
}
run();