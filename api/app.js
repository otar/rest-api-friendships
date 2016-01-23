
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    config = require('./config'),
    routes = require('./routes'),
    actions = require('./actions');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Middlewere for custom response handler
app.use(function(request, response, next)
{

    // In honor of Jason Statham :)))
    response.jason = function(success, result, status)
    {

        response
            .status(status || 200)
            .json({
                success: success || false,
                result: result || {}
            });

    };

    next();

});

// Declare routes
routes.forEach(function(route)
{

    app[route.method.toLowerCase()](
        route.endpoint,
        actions[route.action]
    );

});

// Handle 404 errors
app.use(function(request, response)
{

    response.jason(false, 'Wrong endpoint.', 404);

});

app.listen(config.port, function()
{

    console.log('Gimme some lovin... on port ' + config.port);

});
