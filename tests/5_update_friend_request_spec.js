
'use strict';

var frisby = require('frisby'),
    config = require('../api/config');

var validStatuses = [
    'accepted',
    'declined'
];

frisby
    .create('Accept or decline a friend request of a specific user.')
    .put(
        'http://localhost:' + config.port + '/profiles/1/friend-requests/1',
        {
            status: validStatuses[Math.floor(Math.random() * validStatuses.length)]
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
            updated: true,
            status: function(value)
            {
                return validStatuses.indexOf(value) !== -1;
            }
        }
    })
    .expectJSONTypes({
        success: Boolean,
        result: Object
    })
    .expectJSONTypes('result', {
        updated: Boolean,
        status: String
    })
    //////////////////////////////
    .toss();

