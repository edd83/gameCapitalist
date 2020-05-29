# Adventure Capitalist


## Required

Having nodejs & npm & docker installed on your machine.

Info: Application have been tested in Mac OS Mojave 10.14.6



## Build


Please make sure to run all these command into your terminal


cd backend && npm install && cd ../frontend && yarn && cd ../


docker-compose build

docker-compose up -d


npm run build

npm run start


Please feel free to change backend/src/database/game.json if you want different setup for the game


## Start


http://localhost:3001


## Tech used


Not a MERN stack but a MKRN stack!... ahah


React, most powerful library, reausable components, states and many more feature that makes this library a strong choice

Typescript, typed language for having rules, type and reducing significant amount of errors from javascript

Node.js with Koa for the API, I am familiar with Express as well but Koa is my day to day language then seems more reasonable for me to continue with this one

MongoDB with Mongoose for schema-based solution, most famous and use NoSQL DB, most adapted to Javascript as JSON is everywhere


## Lint


For better collaboration and improvement, I am using linting to have rules in the code to specify what it should be


Lint will be added as a pre-push for git hook in the near future


npm run lint

npm run lint:fix


Second command, fix the lint errors that can be fix by eslint


## Debug


Docker-compose should use --verbose flag to get more information


## Starting point

https://github.com/dbalas/koalerplate.git => Adapted to Typescript, add MongoDB, eslint and clean to get some best practice


&&


https://create-react-app.dev/docs/adding-typescript/


## Feedback / Trade-offs


I took a risk on this project by using MongoDB as I have not used it a lot, I understand it could be a bit messy in term of requests, but I am very open to any feedback/improvement I can do :)


If I got more time to do this project I will probably :


Bring more features like Angels which is the multiple field in my DB


Integration tests and unit tests! Definitly something I want to bring first


Modify the architecture in term of Collection / Document in MongoDB


Optimise the request by having websockets communication


Responsive of the app


Bring more design to the app, working with sprites and havind a chart


Proper use of koa logger, using morgan and winston


Update dependencies vulnerability on npm/yarn


Make TLS communication between client and API

-> Make API secure, request SSL handshake


Make sure all @types module are under dev dependencies and not production


Use a SSR to make it simple to dev (Having a automatic reload everywhere)


Better time management for update and managers when coming back on the UI


ProgressBar visual bug fixed & working when come back to the app


Use Generics types from Typescript


Invest more time in the front end, eslint, types...