/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
} = React;

var Routers = require('./app/Routers.android');
AppRegistry.registerComponent('demoProject', () => Routers);