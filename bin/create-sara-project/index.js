#!/usr/bin/env node

const Path = require('path')
const FsExt = require('fs-extra')
const { execSync } = require("child_process");

const paramOr = (map, arg, def) => map.get(arg) || def
const makePath = (...p) => Path.join(...p)
const ignoreContent =
    (...values) =>
        source =>
            !values.some(x => source === x)


const runCommand = command => {
    try {
        execSync(`${command}, {stdio: "inherit"}`)
    } catch (e) {
        console.error(`Failed to execute ${command}, e`);
        return false;
    }
    return true;
}

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
    'config/nginx',
    'coverage',
    'dist',
    'docs',
    'node_modules',
    'scripts',
    'templates',
    'tools',
    '.dockerignore',
    '.npmignore',
    '.env',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'CODE_OF_CONDUCT.md',
    'README.md',
    'Makefile',
    'package.json',
    'package-lock.json',
    'yarn.lock'
]

const Templates = [
    { file: 'ci.yml', copyTo: '.github/workflows/ci.yml' },
    { file: 'README.md', copyTo: 'README.md' },
    { file: '.gitignore.husky', copyTo: '.husky/.gitignore' },
    { file: '.gitignore.root', copyTo: '.gitignore' },
]

const PkgFieldsToKeep = ['scripts', 'dependencies', 'lint-staged', 'eslintConfig', 'browserslist', 'devDependencies']

function main() {
    console.log('Syntactically Awesome React App 🚀 - Bootstrapping New Project')

    const argv = process.argv.slice(2)
    const argMap = new Map()

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]

        if (/^--.+=/.test(arg)) {
            const match = arg.match(/^--([^=]+)=([\s\S]*)$/)
            const key = match[1]
            const value = match[2]

            argMap.set(key, value)
        } else if (/^--.+/.test(arg)) {
            const key = arg.match(/^--(.+)/)[1]
            const next = argv[i + 1]

            argMap.set(key, next)
        }
    }

    const source = makePath(__dirname, '../..')
    const dest = paramOr(argMap, 'destination', process.cwd()).trim()
    const app = paramOr(argMap, 'app', 'my-app').trim()
    const destination = makePath(dest, app)

    console.log("Summary:")
    console.log(`Destination: ${destination}`)
    console.log(`App: ${app}`)

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

    const npmI = runCommand("npm install");
    if (!npmI) process.exit(-1);
    
    const npmPrepare = runCommand("npm run prepare");
    if (!npmPrepare) process.exit(-1);
    
    const huskyCommitMsg = runCommand(`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`);
    if (!huskyCommitMsg) process.exit(-1);
    
    const huskyPreCommit = runCommand(`npx husky add .husky/pre-commit 'npx lint-staged'`);
    if (!huskyPreCommit) process.exit(-1);
    
    const huskyPrepush = runCommand(`npx husky add .husky/pre-push 'npm run test'`);
    if (!huskyPrepush) process.exit(-1);

    console.log(`Congratulations 🚀🚀🚀 You are ready! Follow the following commands to start:`);
    console.log(`cd ${app}`);
    console.log(`npm start`);

    return Promise.resolve()
}

main().catch(console.error)
