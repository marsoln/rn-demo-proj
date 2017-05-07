# React-native 实现的简单聊天App

# An react-native android app

## prepare to start

- [how to prepare the develop environment on Windows](http://reactnative.cn/docs/0.44/getting-started.html)
- install dependencies `npm install`
- connect your [mobile device](http://reactnative.cn/docs/0.44/running-on-device-android.html#content) or [emulator](http://reactnative.cn/docs/0.44/getting-started.html#genymotion)
- run compile cmd `react-native run-android`

## established the server

> this step will need another repo, check it here `https://github.com/marsoln/lets-chat`

- clone this repo in anothor directory `git clone git@github.com:marsoln/lets-chat.git`
- into the project `cd lets-chat`
- install dependencies `npm install`
- start the service `npm start`
- change your server connection config in this project at the `./app/libs/utils/http.js` file
```javascript
const SERVER = 'http://172.26.9.137' // change the ip address of your server
```

## start this demo application

- run develop command in this project `npm start`

## enjoy your time

Feel free to do whatever you wanna do.
