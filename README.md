# progressive_weight_training

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Amplify API

### Update GraphQL API

1. make updates to `schema.graphql` and `.graphqlconfig.yaml`
1. run `amplify codegen` to validate your changes (it will update `graphql/queries.js`, `graphql/mutations.js`, etc. but not provision backend resources)
1. deploy changes to staging env with `amplify push`
