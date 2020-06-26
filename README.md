# rose-server
> Rose server with NodeJS.

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
* CLIENT_ID - The Twitch app client id
* CLIENT_SECRET - The Twitch app client secret
* MODE - The app mode dev/prod
* DOMAIN - The app domain

To run the app in prod mode, you need to configure ssl.
By default, the server search the privkey.pem, cert.pem and chain.pem files on:
`/etc/letsencrypt/live/${process.env.DOMAIN}/`

Start server by typing
```sh
npm start
```
