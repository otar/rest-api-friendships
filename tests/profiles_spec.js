
var frisby = require('frisby'),
    config = require('../api/config');

frisby
    .create('Get all profiles')
    .get('http://localhost:' + config.port + '/profiles')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        success: true
    })
    .expectJSON('result.0', {
        firstName: "Tyrion",
        lastName: "Lannister"
    })
    .toss();
