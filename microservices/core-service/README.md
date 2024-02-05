# My GraphQL TypeScript Config

Setting up a GraphQL-Express Server with TypeScript can be very tedious. This config fixes that.

## Usage 🔌

To use this config, follow these steps in the order which they are listed below

1. Create your new GitHub Repo
2. Clone this config to your local device using the command:

   `git clone git@github.com:SomtoJF/GQL-Express-Config.git`

3. `cd GQL-Express-Config`

   and run the command:

   `git push --mirror <SSH of your newly created GH repo in item 1 above>`

   Ensure that your repo is empty because `git push --mirror ...` will command overwrite it.

4. Clone your repo and run `pnpm install` to install all dependencies

5. Create a `.env` file in the root of your repository and add a `DATABASE_URL` variable and set it to the url of your database.

If you're using MongoDB🍃, skip step 6 below. The database connection function is already written.

6. If you're not using MongoDB, navigate to the `src/database.ts` file and replace the contents of the `connectToDatabase()` function with the logic to connect to your database of choice.

7. Change the name of the `"name"` property in your package.json file to the name of your project.

## File Structure 📁

- `src/models` folder holds the model declarations for database tables. _Not to be confused with `typeDefs`_.

- `src/resolvers/resolver.ts` file contains the resolver and its methods.

- `src/schema/schema.ts` file contains the type definitions for the GraphQL server.

## Scripts 📜

- Once you have cloned this project, you can install the required dependencies by using: `pnpm install`
- A live demo of the project can be started by using: `npm start`

- Distribution files can be produced and run using: `npm run build`

- To run a developement version of the project without transpiling to JavaScript run: `pnpm run dev`

Note: `pnpm run dev` uses nodemon to run your code so you dont need to manually restatrt ther server after making changes
