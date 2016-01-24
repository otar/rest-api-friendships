
'use strict';

var helpers = require('./helpers');

let db = require('./db');

module.exports = {

    default: function(request, response)
    {

        response.send(
            `

                <b>Congratulations, you are running the API now!</b>

                <br>

                For API endpoints please visit the documentation: <a href="https://github.com/otar/rest-api-friendships#service-endpoints">https://github.com/otar/rest-api-friendships#service-endpoints</a>

            `
        );

    },

    getAllProfiles: function(request, response)
    {

        db.query(
            `
                MATCH (user:Profile)
                RETURN {
                    id: ID(user),
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            `,
            function(error, result)
            {

                error && response.jason();

                var profiles = [];

                helpers.each(result[0].data, function(item)
                {

                    profiles.push(item.row[0]);

                });

                response.jason(true, profiles);

            }
        );

    },

    getProfile: function(request, response)
    {

        helpers.isValidId(request.params.id) || response.jason();

        db.query(
            `
                MATCH (user:Profile)
                WHERE ID(user) = ${ request.params.id.trim() }
                RETURN {
                    id: ID(user),
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            `,
            function(error, result)
            {

                error && response.jason();

                response.jason(true, result[0].data[0].row[0]);

            }
        );

    },

    getFriendRequests: function(request, response)
    {

        response.jason();

    },

    createFriendRequest: function(request, response)
    {

        response.jason();

    },

    updateFriendRequest: function(request, response)
    {

        response.jason();

    },

    getFriends: function(request, response)
    {

        response.jason();

    },

    getFriendsOfFriends: function(request, response)
    {

        response.jason();

    }

};
