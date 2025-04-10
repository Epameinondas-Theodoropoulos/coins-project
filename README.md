# CoinsProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Build the app

```bash
npm install
```

## Run the app

```bash
ng serve
```

## About the app

- It uses the latest Angular with the standalone approach with PrimeNg and Primeflex

- Feature folder has the table component that has the requested functionality.

- Shared folder has:

  - interceptors folder with the interceptor for error handling
  - interfaces folder with the state interface for the store and the interface for the coins
  - services folder with the service that calls the endpoint

- Store folder has all the folders with the files that used for the store:
  - actions
  - effects
  - reducers
  - selectors
