
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Lists all friends of a specific user.')
    .get('http://localhost:' + config.port + '/profiles/2/friends')
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
        since: function(value)
        {
            let timestamp = Math.floor(Date.now());
            return expect(value).toBeLessThan(timestamp);
        }
    })
    .expectJSONTypes('result.*', {
        id: Number,
        firstName: String,
        lastName: String,
        since: Number
    })
    //////////////////////////////
    .toss();
