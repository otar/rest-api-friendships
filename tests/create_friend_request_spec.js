
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Requests friendship to a specific user.')
    .post(
        'http://localhost:' + config.port + '/profiles/1/friend-requests',
        {
            requester: 2
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
