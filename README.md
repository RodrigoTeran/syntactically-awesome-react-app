<h1 align="center">Syntactically Awesome React App 🚀</h1>

<p align="center">
    <img width="250" src="docs/assets/logo.png" alt="Logo" />
    <br>
    <img src="https://img.shields.io/npm/v/create-sara-project?color=ff69b4" alt="version" /> &nbsp;
    <img src="https://img.shields.io/npm/dw/create-sara-project" alt="downloads" /> &nbsp;
    <img src="https://img.shields.io/github/issues/RodrigoTeran/syntactically-awesome-react-app" alt="issues" />
    <br>
    <i>Template for <strong>React Apps</strong> using <strong>TypeScript</strong> obviously...</i>
</p>

<p align="center">
    This project was made for <strong>react developers</strong> that need a more<br>
    sophisticated configuration to start their react-apps. We believe <strong style="color: #5CE6FF;">in a simple<br>
    but high scalable template.</strong> We left the folders that shape the structure of this <br>
    template empty, since it is not necessary to fill all the files to demonstrate each and<br>
    every use case. We provide with a very descriptive documentation so developers will <br>
    understand how to operate them.<br><br>
    in the other hand... this is a personal project 🙃. I hope this template can help at least someone to bootstrap their react projects. 🚀🚀🚀
</p>

## Getting Started

### Dependencies

**NPM** is the project package manager.  
Run the following command to install create-sara-project globally

```
npm i create-sara-project -g
```

### Then you can go to your project folder and run:

```
create-sara-project --app=<app_name>
```

if you don't specify the app name it is going to create it with the name "my-app"

### Once you created a sara project...
you can run the development server:

```
cd <app_name>
npm start
```

### Open cypress 

```
npm run cypress:open
```

### Run cypress tests

```
npm test
```

### Build

```
npm run build
```

## Test

**Cypress** is the testing framework for this project.  
Check the [./cypress](cypress) configuration folder.

## Docker

SARA uses **Docker** to containerize this app
Check the [Dockerfile](Dockerfile) configuration file.

## Linters and Code Style

The mix of tools used to ensure code and commit style and best practices:

- ESLint
- Prettier
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- Lint Staged
- Husky

## Template structure 

```python
.
├── src
│    ├── assets
│    │    ├── fonts
│    │    │    └── ...
│    │    ├── css
│    │    │    └── ...
│    │    ├── icons
│    │    │    └── ...
│    │    └── img
│    │         └── ...
│    ├── components
│    │    ├── ...
│    │    ├── Modals
│    │    │    └── ...
│    │    ├── Toastr
│    │    │    └── ...
│    │    └── <component-name>
│    │         ├── <component-name>.types.ts   # Component types
│    │         ├── <component-name>.module.css
│    │         └── <component-name>.tsx
│    ├── layouts
│    │    └── ... # AuthLayout/AdminLayout/etc
│    ├── config
│    │    ├── ...
│    │    └── constants.ts
│    ├── contexts
│    │    ├── ...
│    │    └── <page_name>
│    │         └── Page.context.ts # Context page/multiple pages
│    │
│    ├── store   # Without the need of redux, just useReducer hook
│    │    ├── actions
│    │    │    └── ...
│    │    └── reducers
│    │         └── ...
│    ├── pages
│    │    ├── ...
│    │    └── <page_name> # Keep unique page components here
│    │         ├── ...
│    │         ├── <component-name>.tsx
│    │         └── <folder>
│    │               ├── ...
│    │               ├── <component-name>.tsx
│    │               └── <folder>
│    ├── utils
│    │    └── ...
│    ├── shared  # api/global-state related interfaces/types
│    │     ├── interfaces
│    │     │   └── ...
│    │     └── types
│    │         └── ...
│    ├── cache
│    │     └── ...
│    ├── animations  # variants from framer motion
│    │     └── ...
│    ├── hooks
│    │     └── ...
│    ├── App.tsx
│    ├── index.tsx
│    └── services    # rest-api related routes and validators (zod)
│          ├── routes
│          │     └── ...
│          └── schemas # zod schemas
│                ├── ...
│                └── <model.zod>.ts
├── cypress
│    ├── .gitignore
│    ├── support
│    │     └── ...
│    ├── plugins
│    │     └── ...
│    ├── fixtures
│    │     └── ...
│    └── integration
│          └── ...
├── scripts
│    └── ...
├── ...
├── ...
├── ...
└── README.md
```