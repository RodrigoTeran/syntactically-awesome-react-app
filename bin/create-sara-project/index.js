#!/usr/bin/env node

const Path = require('path')
const Inquirer = require('inquirer')
const FsExt = require('fs-extra')

const makePath = (...p) => Path.join(...p)
const ignoreContent =
    (...values) =>
        source =>
            !values.some(x => source === x)


const QUESTIONS = [
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
];



const Ignores = [
    '.git',
    '.idea',
    '.vscode',
    '.github',
    '.husky/_',
    '.yarn/cache',
    '.yarn/build-state.yml',
    '.yarn/install-state.gz',
    'bin',
    'coverage',
    'dist',
    'docs',
    'node_modules',
    '.npmignore',
    '.env',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'README.md',
    'package.json',
    'package-lock.json',
    'yarn.lock',
]

const Templates = [
    { file: 'ci.yml', copyTo: '.github/workflows/ci.yml' },
    { file: 'README.md', copyTo: 'README.md' },
    { file: '.gitignore.husky', copyTo: '.husky/.gitignore' },
    { file: '.gitignore.root', copyTo: '.gitignore' },
]

const PkgFieldsToKeep = ['scripts', 'dependencies']


Inquirer.prompt(QUESTIONS).then(answers => {
    const projectName = answers['project-name'];

    function main() {
        console.log('Syntactically Awesome React App 🚀 - Bootstrapping New Project')

        const source = makePath(__dirname, '../..')
        const dest = process.cwd()
        const app = projectName
        const destination = makePath(dest, app)

        console.log(
            `Summary:
            Destination: ${destination}
            App: ${app}`
        )

        console.log('Cloning the repository...')

        FsExt.copySync(source, destination, { filter: ignoreContent(...Ignores.map(x => makePath(source, x))) })

        console.log('Copying templates...')

        Templates.forEach(x => FsExt.copySync(makePath(source, 'templates', x.file), makePath(destination, x.copyTo)))

        console.log('Preparing package.json ...')

        const pkg = FsExt.readJsonSync(makePath(source, 'package.json'))
        const newPkg = {
            name: app,
            main: 'dist/index.js',
        }

        PkgFieldsToKeep.forEach(field => {
            if (typeof pkg[field] !== 'undefined') {
                newPkg[field] = pkg[field]
            }
        })

        FsExt.writeJsonSync(makePath(destination, 'package.json'), newPkg, { spaces: 2 })

        console.log(`Congratulations 🚀🚀🚀 You are ready! Follow the following commands to start:`);
        console.log(`$ cd ${projectName}`);
        console.log(`$ npm install`);
        console.log(`$ npm run prepare`);
        console.log(`$ npm start`);

        return Promise.resolve()
    }

    main().catch(console.error)
});
