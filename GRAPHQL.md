# Colorado Care Exchange GraphQL Implementation

The server-side interface is exposed through a GraphQL API. The development environment url is:

[Development GraphQL Server](https://xfdwc4y160.execute-api.us-west-2.amazonaws.com/dev/graphql)

Through that endpoint, you can perform a GraphQL query to inspect the data schema as well as exposed queries and mutations. For more information on the GraphQL specification, please visit [GraphQL.org](https://graphql.org). 

NOTE: All endpoints are secured. Please reach out to Jason, Josh or Tony for API Keys.

There are many GraphQL query tools available, but my current favorite is [Banana Cake Pop](https://hotchocolate.io/docs/banana-cakepop).

When unlcear on which query or mutation actions are supported on the server, just query the development server endpoint to find a list of supported actions.

## Codegen
We have adopted a code generator for generating a client side SDK for consuming the backend via graphql. To use, write queries and mutations under `app/graphql/queries` or `app/graphql/mutations` and run the code gen tool like so:

```bash
GRAPHQL_API_KEY=<env-key> GRAPHQL_API_URI=<env-uri> npm run generate
```
Note to specify the endpoint with /graphql

## Production
In production, a longer term solution will be to add this as a CodeBuild stage which should fail deployments if the codegen fails or the Angular build fails. In the meantime, the codegen should be run against the production server manually as validation before pushing the client to `master` and deploying to production.

## Using the SDK
The previous command outputs the generated artifact at `app/graphql/generatedSDK.ts` and it produces an Angular injectable class called `CceSDK` which can be used in components. All API / domain types are generated as a byproduct as well and can be imported as needed.