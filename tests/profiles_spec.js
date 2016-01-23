
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
        firstName: function(value)
        {
            return value !== '';
        },
        lastName: function(value)
        {
            return value !== '';
        }
    })
    .expectJSONTypes('result.*', {
        firstName: String,
        lastName: String
    })
    //////////////////////////////
    .toss();
