/*
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Requests friendship to a specific user.')
    .put(
        'http://localhost:' + config.port + '/profiles/1/friend-requests/5',
        {
            status: 'accepted'
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
            status:
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
*/
