

## Description

A simple application backend for books CRUD.
Please rename .env.example for .env and set .env file variables before start aplication.  
PS. This project accepts CORS requests from the frontend at http://localhost:4000.
```
APP_PORT=3000 -> Set port app list
DB_HOST= -> set mysql server host
DB_PORT= -> set mysql server port
DB_USERNAME= -> set mysql server username
DB_PASSWORD= -> set mysql server password
DB_DATABASE= -> set mysql server database name
JWT_SECRET=secret -> set JWT secret
```
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#Endpoints uses:
All examples used on localhost change to your host.

```
Get token:
POST
http://localhost:3001/auth/login

Body:
{
	"email": "admin@admin.com",
	"password":"admin"
}

```
-------
```
Get Books:

Get AllBooks
This endpoint provide search without filter and search with pagintion and filter by name

Get All books
GET
http://localhost:3000/books
Authentication Header:
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}

Get All books with pagination
GET
http://localhost:3001/books?page=1&limit=3
Authentication Header:
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}
PS. page parameter set what page return and off is after wha register show


Get All books by name finding
GET
http://localhost:3001/books?page=1&limit=3&name=Search string Value
Authentication Header:
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}
PS. page parameter set what page return and off is after wha register show
PS2, parameters name, page and limit are optional

```
----
```
New Book
post
http://localhost:3000/books
{
	"title": "Mysql database tools",
  "author": "Oracle Inc",
  "publishedDate": "2020-11-02"
}
Authentication Header:
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}
Body:
{
	"title": "Mysql database tools",
  "author": "Oracle Inc",
  "publishedDate": "2020-11-02"
}
Api return 201 CREATED if ok

Update Book by id:
PUT
http://localhost:3000/books/:id
Authentication
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}
Body:
{
	"title": "Mysql database"
}

Api return 200 and the new book if ok

Delete Book:
DELETE
http://localhost:3000/books/:id
Authentication
{
"Autentication": "Bearer <JWT Token informed on auth/login endpoint>
}

Api return 200
```




## Stay in touch

- Author - [Dilceu Pazinatto](dlpazinatto@gmail.com)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
