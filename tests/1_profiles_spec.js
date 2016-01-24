
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Lists all user profiles.')
    .get('http://localhost:' + config.port + '/profiles')
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
        }
    })
    .expectJSONTypes('result.*', {
        id: Number,
        firstName: String,
        lastName: String
    })
    //////////////////////////////
    .toss();
