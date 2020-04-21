# rose-server
> Rose server with NodeJS.

##### NOTE : This project need node version >= 6

This project uses

* ES6 ( Using babel-register )
* NodeJS ( version >= 6 )
* Express
* Mongoose
* Body-parser
* Socket.io
* Dotenv

### Get Started
Fire up your terminal
```sh
git clone https://github.com/raylansoares/rose-server.git
cd rose-server
npm install
cp .env.example .env
```

Open .env file and put you configs
* SERVER_HOST - The host to start server
* SERVER_PORT - The port to start server
* MONGO_HOST - The mongodb host
* MONGO_PORT - The mongodb port
* DB_NAME - The database name

Start server by typing
```sh
npm start
```