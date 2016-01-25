
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
                ORDER BY ID(user)
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

        helpers.isValidId(request.params.id) || response.jason();

        db.query(
            `
                MATCH (requester:Profile)-[request:FRIEND_REQUEST]->(user:Profile)
                WHERE ID(user) = ${ request.params.id.trim() }
                RETURN {
                    id: ID(request),
                    firstName: requester.firstName,
                    lastName: requester.lastName,
                    status: request.status,
                    createdAt: request.createdAt
                }
                ORDER BY request.createdAt DESC
            `,
            function(error, result)
            {

                error && response.jason();

                var requests = [];

                helpers.each(result[0].data, function(item)
                {

                    requests.push(item.row[0]);

                });

                response.jason(true, requests);

            }
        );

    },

    createFriendRequest: function(request, response)
    {

        if (
               !helpers.isValidId(request.params.id)
            || !helpers.isValidId(request.body.requester)
        )
        {
            response.jason();
        }

        db.query(
            `
                MATCH (requester:Profile), (user:Profile)
                WHERE ID(requester) = ${ request.body.requester }
                AND ID(user) = ${ request.params.id.trim() }
                CREATE (requester)-[:FRIEND_REQUEST]->(user)
                RETURN {
                    created: true
                }
            `,
            function(error, result)
            {

                error && response.jason();

                response.jason(true, {
                    created: true
                });

            }
        );

    },

    updateFriendRequest: function(request, response)
    {

        let validStatuses = [
            'accepted',
            'declined'
        ];

        if (
               !helpers.isValidId(request.params.id)
            || !helpers.isValidId(request.params.request_id)
            || validStatuses.indexOf(request.body.status) === -1
        )
        {
            response.jason();
        }

        db.query(
            `
                MATCH (user:Profile)-[request:FRIEND_REQUEST]->(:Profile)
                WHERE ID(user) = ${ request.params.id }
                AND ID(request) = ${ request.params.request_id }
                SET request.status = '${ request.body.status }'
                RETURN {
                    updated: true,
                    status: '${ request.body.status }'
                }
            `,
            function(error, result)
            {

                error && response.jason();

                response.jason(true, {
                    updated: true,
                    status: request.body.status
                });

            }
        );

    },

    getFriends: function(request, response)
    {

        helpers.isValidId(request.params.id) || response.jason();

        db.query(
            `
                MATCH (user1:Profile)-[friends:FRIENDS]->(user2:Profile)
                WHERE ID(user1) = ${ request.params.id }
                RETURN {
                    id: ID(user2),
                    firstName: user2.firstName,
                    lastName: user2.lastName,
                    since: friends.since
                }
                ORDER BY friends.since DESC
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

    getFriendsOfFriends: function(request, response)
    {

        helpers.isValidId(request.params.id) || response.jason();

        db.query(
            `
                MATCH (user1:Profile)-[friends:FRIENDS*2..3]->(user2:Profile)
                WHERE ID(user1) = ${ request.params.id }
                RETURN {
                    id: ID(user1),
                    firstName: user1.firstName,
                    lastName: user1.lastName,
                    friendsOfFriends: collect(user2)
                }
            `,
            function(error, result)
            {

                error && response.jason();

                response.jason(true, result[0].data[0].row[0]);

            }
        );

    }

};
