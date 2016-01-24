
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
            function(error, response)
            {

                callback.call(
                    null, // this
                    (response.body.errors.length),
                    response.body.results
                );

            }
        );

    },

    query: function(query, callback)
    {

        return db.cypher(
            [
                {
                    statement: query,
                    parameters: {}
                }
            ],
            callback
        );

    },

    multiQuery: function(statements, callback)
    {

        var queries = [];

        statements.forEach(function(statement)
        {

            queries.push({
                statement: statement,
                parameters: {}
            });

        });

        return db.cypher(queries, callback);

    }

};

module.exports = db;
