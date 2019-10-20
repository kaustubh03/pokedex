# Pokedex
Pokedex is an webapp resembling the famous Pokedex device used to search and identify pokemons.
You can search for your pokemon and pokedex will provide details for your favourite Pokemon.

## Technologies Used - 
- **ReactJS**
- **Redux**
- **NodeJs Server**

Requires Node Version >= 8.12

**For deployments Travis CI is used**
## To configure Travis CI
- Create an account on Travis or Login with your existing account or Github (ref - https://travis-ci.org)
- Create .travis.yml in root of your project.
    ``` 
    language: node_js
    node_js:
      - "stable"
    cache:
      directories:
      - node_modules
    script:
      - npm test
      - npm run build
    ```
- Push the file into your github repository.
- In order to make this build file working, you need to link up our project to Travis. For that, you have to go to our logged in account in Travis.
- Sync your github account using Sync Button on the Travis Dashboard.
- Chose your project and toggle the settings to enable the project. It will start the build process.
### Setting up auto deployment to GitHub Pages
- Get Access token from github (ref - https://github.com/settings/tokens/new)
- Generate and Copy the token.
- Go to Settings and under Environment variables subheading add the name for your token (for example - github_token) and paste the value.
- Add Deployment Script to .travis.yml with environment variable $github_token
    ```
        language: node_js
        node_js:
          - "stable"
        cache:
          directories:
          - node_modules
        script:
          - npm test
          - npm run build
        
        deploy:
          provider: pages
          skip_cleanup: true
          github_token: $github_token
          local_dir: build
          on:
            branch: master
    ```
- Set the URL in our app package.json with homepage key
- Commit and push our changes to our repo in Github. It will automatically trigger the build. After successful completion of our build, it will deploy our project into the gh-pages. It will be running on the specified url in homepage key in package.json




# Boilerplate Info
## What's this?

This is a sample app on top of [create-react-app](https://github.com/facebook/create-react-app), that adds some important features like:

- **Server Side Rendering**
- **Route based chunking**
- **[Helmet](https://www.npmjs.com/package/react-helmet) Integration**
- **[Ramda](https://ramdajs.com/)**
- **Convert svg to font using [webfonts-loader](https://github.com/jeerbl/webfonts-loader)**
    - Webfont-loader is disabled by default. To use this feature, uncomment `config.module.rules.push(webfontLoaderConfig);` in `./config-overrides.dev.js` and `./config-overrides.prod.js`
- **Layout based Views**
- **Customize webpack configs without ejecting**
- **[localforage](https://localforage.github.io/localForage) Integration**


## How can We see it in action?

Just install dependencies, build the app and run the express server:

####Commands

```
//Install dependencies
yarn install

//development
yarn start

//production
yarn run build
yarn run server

//Run test
yarn test

//View coverage
yarn test -- --coverage
```


