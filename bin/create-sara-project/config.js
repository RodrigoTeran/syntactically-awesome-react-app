const Ignores = [
    '.git',
    '.vscode',
    '.github',
    '.husky/_',
    'bin',
    'build',
    'docs',
    'node_modules',
    'templates',
    '.npmignore',
    '.env',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'CODE_OF_CONDUCT.md',
    'README.md',
    'LICENSE',
    'package.json',
    'package-lock.json',
    'yarn.lock'
]

const Templates = [
    { file: 'ci.yml', copyTo: '.github/workflows/ci.yml' },
    { file: 'README.md', copyTo: 'README.md' },
    { file: '.gitignore.husky', copyTo: '.husky/.gitignore' },
    { file: '.gitignore.root', copyTo: '.gitignore' },
    { file: '.gitignore.cypress', copyTo: 'cypress/.gitignore' },
    { file: 'tsconfig.template.json', copyTo: 'tsconfig.json' }
]

const PkgFieldsToKeep = ['scripts', 'dependencies', 'lint-staged', 'eslintConfig', 'browserslist', 'devDependencies']

const appNameQuestion = "app-name";

const templateTypeQuestion = "template";
const emptyTemplate = "Empty files";
const exampleTemplate = "With a default example";
const templateTypeChoices = [
    emptyTemplate,
    exampleTemplate
];

module.exports = {
    Ignores,
    Templates,
    PkgFieldsToKeep,
    appNameQuestion,
    templateTypeQuestion,
    emptyTemplate,
    exampleTemplate,
    templateTypeChoices
}