
'use strict';

module.exports = {

    cypher: function(query, parameters, callback)
    {

        var config = require('./config');

        let request = require('request'),
            server = [
                config.neo4j.host,
                config.neo4j.port
            ].join(':');

        request.post(
            {
                uri: 'http://' + server + '/db/data/transaction/commit',
                json: {
                    statements: [
                        {
                            statement: query,
                            parameters: parameters
                        }
                    ]
                }
            },
            callback
        );

        /*request.post(requestParameters, function(error, response)
        {

            callback.call(null, error, response.body);

        });*/

    }

};
