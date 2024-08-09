# NPM workspaces scripts
```bash
npm --workspace=@mrck-labs/module-b run start
```

```bash
npm --workspaces run test
```

```bash
npm --workspaces --if-present run test
```

Or other syntax:
```bash
npm run start -w=@mrck-labs/module-b
```

```bash
npm run test -ws (everywhere)
```

installing deps: 
```bash
npm install lodash -ws (everywhere)
```

```bash
npm install lodash -w @mrck-labs/utils (in a specific package)
```

```bash
npm install lodash -W (in root of the project)
```

how to run concurently: https://egghead.io/lessons/npm-run-dev-scripts-for-all-packages-simultaniously