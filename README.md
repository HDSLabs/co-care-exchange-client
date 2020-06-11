# Colorado Care Exchange

![CO CareExchange](https://github.com/HDSLabs/co-care-exchange-client/blob/master/Colorado%20Care%20Exchange%20Logo.png)  

# Connecting Care with Need

• Tool to provide rapid deployment capability of connecting available goods/services to people in need.

• Cloud-based network of people who need help with providers who can deliver desired help

• Data engine for rapid analysis and pattern recognition

• Quickly configurable to refine request filters and queries

  

# Why Do We Need This?

• The need existed even before the crisis

• Due to quarantines there is a new market of needy people in their homes who need

connectivity and assistance.

• Food pantries/food trucks/etc. need to proactively prepare for demand

• Increased coordination between food pantries and recipients is needed due to no- contact preferences

• Government needs high level visibility into regions with greatest need and into holistic state effort at all four levels of interaction

• Resource coordination efforts need a platform that allows for quick contact with individuals via SMS

## Client App Walkthrough

[Individual User to Individual User](https://youtu.be/r9nYIZdoYQA)

[Organization to Organization (mobile)](https://youtu.be/FB6MysnSfhc)

[Organization to Organization (web)](https://youtu.be/ChFe3Fn5CR8)

  
## Technical Stuff

This project is licensed under the terms of the MIT license

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

• Angular CLI: 8.3.25

• Node: 10.16.3

• Angular: 8.2.14

# Canary

• http://canary-app.cocareexchange.org


## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Prod 

`ng s -c prod`

### QA

`ng s -c qa`
  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Server interaction

[GraphQL Services](https://github.com/HDSLabs/co-care-exchange-client/blob/master/GRAPHQL.md)
  

## Build

Workaround:
Production build will fail with AOT build due to AWS libs unless `fullTemplateTypeCheck` is set to `false` in `tsconfig.json`. 
Ref: https://github.com/aws-amplify/amplify-js/issues/3620  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Prod build

`ng build -c prod`

### QA Build

`ng build -c qa`  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

  

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Feature work flow

* Fork the repo if needed (set `upstream` to HDSLabs and `origin` to the fork)

* cut new branch from `master`: `git fetch upstream && git rebase upstream/master && git checkout -b task/<task number>-<task description>`
* merge branch into `canary`
* Change task label to `QA`
* QA team marks `Ready for Acceptance`
* merge branch into `acceptance`
* Haile says yep or nope
* Haile moves it to `Ready for Master` column
* merge branch into `rc/<current-candidate>` (which was cut from master)
* merge `rc/<current-candidate>` branch into `master`