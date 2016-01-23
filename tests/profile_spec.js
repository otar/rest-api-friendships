
var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Shows a specific user profile.')
    .get('http://localhost:' + config.port + '/profiles/1')
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
        firstName: String,
        lastName: String
    })
    //////////////////////////////
    .toss();
