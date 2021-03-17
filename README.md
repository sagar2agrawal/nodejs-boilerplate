# nodejs-boilerplate


## Design Principle used
DDD - Domain Driven Design

## The Folder Structure
- Src
    - config
    - controllers
    - models (All your )
    - routes
        - v1
        - v2
    - scripts
    - services
    - utils
- tests
- app.js
- server.js
- .env
- .env.example
- package.json
- package-lock.json
- nodemon.json 
- readme.md
- .gitignore


## Setup Environment
1. Make sure you have an account and key in 
2. copy .env.example to .env
3. Replace/add the value/keys required
4. Install Node v14.16.0 and restart the shell if current version is not Node v14

## To start the app
0. Download the code to a directory
1. cd to that directory
2. Now setup the environment as mentioned above
3. npm install
4. npm run dev

## Want to Debug
0. node --inspect src/server.js
https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.pmqejrn8q

## Packages used
0. Express.js (Framework)
1. Helmet (Security) (Take precuations via Header best practices)
2. Cors (Security) (From where resources can be loaded)
3. Jest (Testing framework) (Dev Dependency)
4. PM2 (Process Manager) (running node smoothly in production)
5. Nodemon () (watching changes in file for server restart)
6. Eslint (Linting) (Help improves code quality)
7. Winston (Logger) (for logging in the app)
8. Dotenv (Security) (Helps with environment variable)
9. Joi (validation module)
10. mongoose (ODM) (makes database operations easier)
11. argon2 (security/cryptography) (hashing password)
12. celebrate (Middleware) (validation in routes)
13. sentry (APM) (for application monitoring)
14. JWT (for authentication)
15. Supertest (for high level api testing) 
16. @babel/core & @babel/node (for babel helping node environment)
17. @babel/preset-env (for targeting specific environments)
18. cookie-parser as cookie helper




## Notes
1. We generally use compression through Nginx which can improve overall performance of the system
2. For Large Scale project, we can divide the project into component/module/features instead of technical role wise, which is easier to maintain for large team
3. Body-parse depreciated in newer version
4. We should save the logs in file (with some kind of rotation or upload on regular interval of time), or stream it to somewhere for production usage
5. As we are using node v14, and configured package.json ("type": "module",) so we don't need to transpile the code anymore for ES6+ to ES5
6. You could use the babel or webpack for custom module aliasing instead of using long relative path




## Want to extend 

#### Security
https://javascript.plainenglish.io/nodejs-security-best-practices-542528f910
https://www.bacancytechnology.com/blog/24-best-practices-to-make-your-nodejs-application-secure

#### Process Manager PM2
https://pm2.keymetrics.io/docs/usage/application-declaration/

## Reference
https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf
https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/

## Roadmap
- Using babel or webpack for module aliasing
- saving the logs to file
- Launch a Typescript version
- Better Custom error messages with Joi & Celeberate
- protection against csrf
- Making cookie securer and taking data from env/config
- Load different config values based on current node environment
- Making sure the application waits for mongodb connection before starting
- Configure Corsoption
- Snyk for vulnerability detection in packages