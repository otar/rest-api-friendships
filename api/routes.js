
'use strict';

module.exports = [
    {
        method: 'GET',
        endpoint: '/profiles',
        action: 'getAllProfiles'
    },
    {
        method: 'GET',
        endpoint: '/profiles/:id',
        action: 'getProfile'
    },
    {
        method: 'GET',
        endpoint: '/profiles/:id/friend-requests',
        action: 'getFriendRequests'
    },
    {
        method: 'POST',
        endpoint: '/profiles/:id/friend-requests',
        action: 'createFriendRequest'
    },
    {
        method: 'PUT',
        endpoint: '/profiles/:id/friend-requests/:request_id',
        action: 'updateFriendRequest'
    },
    {
        method: 'GET',
        endpoint: '/profiles/:id/friends',
        action: 'getFriends'
    },
    {
        method: 'GET',
        endpoint: '/profiles/:id/friends-of-friends',
        action: 'getFriendsOfFriends'
    }
];
