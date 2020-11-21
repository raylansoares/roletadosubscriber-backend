# <img src="https://raw.githubusercontent.com/raylansoares/roletadosubscriber-frontend/master/src/assets/images/logo_small.svg"> Roleta do Subscriber

Aplicação construída para criar uma maior interação entre Streamers da Twitch e seus inscritos. Sempre que o canal recebe uma inscrição, a roleta aparece automaticamente através de um overlay e seleciona um dos prêmios previamente definidos pelo streamer, em seguida o prêmio também é anunciado no chat do canal.

> Feito com amor por [Raylan Campos](https://github.com/raylansoares) 🚀.

## :eyes: Aplicação
Você pode acessar a aplicação em:

👉 [https://roletadosubscriber.com.br](http://roletadosubscriber.com.br)

## 📦 Projetos Relacionados

A aplicação é dividida em 4 projetos:
* [roletadosubscriber-backend](https://github.com/raylansoares/roletadosubscriber-backend)
* [roletadosubscriber-chatbot](https://github.com/raylansoares/roletadosubscriber-chatbot)
* [roletadosubscriber-pubsub](https://github.com/raylansoares/roletadosubscriber-pubsub)
* [roletadosubscriber-frontend](https://github.com/raylansoares/roletadosubscriber-frontend)


## ⚙️ Requisitos

* [NodeJs](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

## :construction_worker: Como rodar

```bash

# Clone os Repositórios

$ git clone https://github.com/raylansoares/roletadosubscriber-backend
$ git clone https://github.com/raylansoares/roletadosubscriber-chatbot
$ git clone https://github.com/raylansoares/roletadosubscriber-pubsub
$ git clone https://github.com/raylansoares/roletadosubscriber-frontend

```

###  Inicie o Backend

```bash

# Vá para a pasta do backend

$ cd roletadosubscriber-backend


# Instale as dependências

$ npm install


# Copie o arquivo de exemplo de variáveis de ambiente

$ cp .env.example .env


# Em seguida abra o arquivo de variáveis de ambiente e insira suas informações

$ vim .env


# Inicie a aplicação

$ npm run dev

```

###  Inicie o Chatbot

```bash

# Vá para a pasta do chatbot

$ cd roletadosubscriber-chatbot


# Instale as dependências

$ npm install


# Copie o arquivo de exemplo de variáveis de ambiente

$ cp .env.example .env


# Em seguida abra o arquivo de variáveis de ambiente e insira suas informações

$ vim .env


# Inicie a aplicação

$ npm run dev

```

###  Inicie o PubSub

```bash

# Vá para a pasta do pubsub

$ cd roletadosubscriber-pubsub


# Instale as dependências

$ npm install


# Copie o arquivo de exemplo de variáveis de ambiente

$ cp .env.example .env


# Em seguida abra o arquivo de variáveis de ambiente e insira suas informações

$ vim .env


# Inicie a aplicação

$ npm run dev

```

### Inicie o Frontend

```bash

# Vá para a pasta do frontend

$ cd roletadosubscriber-frontend


# Instale as dependências

$ npm install


# Copie o arquivo de exemplo de variáveis de ambiente

$ cp .env.example .env


# Em seguida abra o arquivo de variáveis de ambiente e insira suas informações

$ vim .env


# Inicie a aplicação

$ npm run serve

```
Acesse: http://localhost:8080 para ver o resultado.

## :bug: Problemas

Fique a vontade **para criar uma nova issue**. Se você já encontrou a solução para o problema, **eu amaria fazer o review do seu pull request**!

## :closed_book: Licencia

Esse projeto esta sobre [GNU license](./LICENSE).

Dê uma ⭐️ se esse projeto te ajudou!
