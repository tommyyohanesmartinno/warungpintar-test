# warungpintar-test

### Tech Stack

1. NodeJs v12.18.0
2. Express.js
3. Socket.io
4. Jest.js

### Installing

Step by step series of installing this project
- Clone this repository
- Make sure installed NodeJS
- Install package dependence using ```npm install```
- Start API: ```npm start```

### Usage

1. Start API if not running using ```npm start```
2. To send message, with POST to url ```http://localhost:3000/message/send``` with json ```{ "content": "...Fill this message..." }```
3. To get all message, with GET to url ```http://localhost:3000/message/list```
4. Open browser and access ```http://localhost:3000/message``` to see display message in real time when send message using postman

### Unit Testing

Step to execute E2E testing using jest
- Start Test: ```npm test```

### Notes
1. This app running on port 3000 (Hardcoded not using env)
2. All messages store local in src/data/posts.json