## Description

API REST (CRUD) NestJS and Moongose, framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Set environment

```
Create a **.env** file and copy the contents of the **.env.example** file 
to set the system configuration variables.
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Url Swagger for Api Documentation
```
http://127.0.0.1:3000/api/doc
```

## Getting with Curl Customers

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"cod": "111", "username": "username", "password": "password", "email": "example@nest.it", "dateofbirth": 08/02/1994,"address": ["Lorem ipsum", "82840230", "Rua x"], "githubusername": "rodolfowolff"}' http://127.0.0.1:3000/api/users 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"cod": "111", "username": "username", "password": "password", "email": "example@nest.it", "dateofbirth": 08/02/1994,"address": ["Lorem ipsum", "82840230", "Rua x"], "githubusername": "rodolfowolff"}' http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id 
```

## Getting Pagination using limit and offset

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users?limit=10
```

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users?offset=10
```
