
'use strict';

var db = {

    cypher: function(statements, callback)
    {

        var config = require('./config');

        let request = require('request'),
            server = [
                config.neo4j.hostname,
                config.neo4j.port
            ].join(':');

        request.post(
            {
                'auth': {
                    'user': config.neo4j.username,
                    'pass': config.neo4j.password,
                    'sendImmediately': true
                },
                uri: 'http://' + server + '/db/data/transaction/commit',
                json: {
                    statements: statements
                }
            },
            function(error, response, result)
            {

                callback.call(
                    null, // this
                    (result.errors.length),
                    result.results
                );

            }
        );

    },

    query: function(query, parameters, callback)
    {

        return db.cypher(
            [
                {
                    statement: query,
                    parameters: parameters || {}
                }
            ],
            callback
        );

    },

    multiQuery: function(statements, callback)
    {

        return db.cypher(statements, callback);

    }

};

module.exports = db;
