
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Lists all pending friend requests of a specific user.')
    .get('http://localhost:' + config.port + '/profiles/1/friend-requests')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    //////////////////////////////
    .expectJSON({
        success: true
    })
    .expectJSONTypes({
        success: Boolean,
        result: Array
    })
    //////////////////////////////
    .expectJSON('result.*', {
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
        },
        sentAt: function(value)
        {
            let timestamp = Math.floor(Date.now() / 1000);
            return expect(value).toBeLessThan(timestamp);
        },
        status: 'pending'
    })
    .expectJSONTypes('result.*', {
        id: Number,
        firstName: String,
        lastName: String,
        sentAt: Number,
        status: String
    })
    //////////////////////////////
    .toss();
