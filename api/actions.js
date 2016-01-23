
'use strict';

module.exports = {

    getAllProfiles: function(request, response)
    {

        let result = [
            {
                firstName: 'Tyrion',
                lastName: 'Lannister',
            },
            {
                firstName: 'Daenerys',
                lastName: 'Targaryen',
            },
            {
                firstName: 'Jon',
                lastName: 'Snow',
            },
        ];

        response.jason(true, result);

    },

    getProfile: function(request, response)
    {

        response.jason();

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
