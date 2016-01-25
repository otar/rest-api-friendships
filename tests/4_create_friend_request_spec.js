
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Requests friendship to a specific user.')
    .post(
        'http://localhost:' + config.port + '/profiles/' + Math.floor(Math.random() * 5) + '/friend-requests',
        {
            requester: Math.floor(Math.random() * 5)
        },
        {
            json: true
        }
    )
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    //////////////////////////////
    .expectJSON({
        success: true,
        result: {
            created: true
        }
    })
    .expectJSONTypes({
        success: Boolean,
        result: Object
    })
    .expectJSONTypes('result', {
        created: Boolean
    })
    //////////////////////////////
    .toss();
