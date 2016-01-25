
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Lists all "friends of friends" of a specific user.')
    .get('http://localhost:' + config.port + '/profiles/2/friends-of-friends')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    //////////////////////////////
    .expectJSON({
        success: true
    })
    .expectJSONTypes({
        success: Boolean,
        result: Object
    })
    //////////////////////////////
    .expectJSON('result', {
        id: function(value)
        {
            // In neo4j node IDs begin with 0
            return expect(value).toBeGreaterThan(-1);
        },
        firstName: function(value)
        {
            return expect(value).not.toBe('');
        },
        lastName: function(value)
        {
            return expect(value).not.toBe('');
        }
    })
    .expectJSONTypes('result', {
        id: Number,
        firstName: String,
        lastName: String,
        friendsOfFriends: Array
    })
    //////////////////////////////
    .expectJSON('result.friendsOfFriends.*', {
        firstName: function(value)
        {
            return expect(value).not.toBe('');
        },
        lastName: function(value)
        {
            return expect(value).not.toBe('');
        }
    })
    .expectJSONTypes('result.friendsOfFriends.*', {
        firstName: String,
        lastName: String
    })
    //////////////////////////////
    .toss();
