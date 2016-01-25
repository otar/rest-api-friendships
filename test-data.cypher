FOREACH (
    data IN [
        {
            firstName: 'Tyrion',
            lastName: 'Lannister'
        },
        {
            firstName: 'Cersei',
            lastName: 'Lannister'
        },
        {
            firstName: 'Daenerys',
            lastName: 'Targaryen'
        },
        {
            firstName: 'Jon',
            lastName: 'Snow'
        },
        {
            firstName: 'Sansa',
            lastName: 'Stark'
        },
        {
            firstName: 'Arya',
            lastName: 'Stark'
        },
        {
            firstName: 'Jorah',
            lastName: 'Mormont'
        },
        {
            firstName: 'Jamie',
            lastName: 'Lannister'
        },
        {
            firstName: 'Samwell',
            lastName: 'Tarly'
        },
        {
            firstName: 'Theon',
            lastName: 'Greyjoy'
        }
    ] |
    CREATE (user:Profile {
        firstName: data.firstName,
        lastName: data.lastName
    })
);

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 0
AND ID(user2) = 1
CREATE (user1)-[request:FRIEND_REQUEST { status: 'pending', createdAt: TIMESTAMP() }]->(user2)
RETURN request;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 2
AND ID(user2) = 3
CREATE (user1)-[request:FRIEND_REQUEST { status: 'pending', createdAt: TIMESTAMP() }]->(user2)
RETURN request;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 4
AND ID(user2) = 5
CREATE (user1)-[request:FRIEND_REQUEST { status: 'accepted', createdAt: TIMESTAMP() }]->(user2)
RETURN request;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 6
AND ID(user2) = 7
CREATE (user1)-[request:FRIEND_REQUEST { status: 'accepted', createdAt: TIMESTAMP() }]->(user2)
RETURN request;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 8
AND ID(user2) = 9
CREATE (user1)-[request:FRIEND_REQUEST { status: 'declined', createdAt: TIMESTAMP() }]->(user2)
RETURN request;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 0
AND ID(user2) = 1
CREATE (user1)-[friends:FRIENDS { since: TIMESTAMP() }]->(user2)
RETURN friends;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 0
AND ID(user2) = 2
CREATE (user1)-[friends:FRIENDS { since: TIMESTAMP() }]->(user2)
RETURN friends;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 2
AND ID(user2) = 3
CREATE (user1)-[friends:FRIENDS { since: TIMESTAMP() }]->(user2)
RETURN friends;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 2
AND ID(user2) = 4
CREATE (user1)-[friends:FRIENDS { since: TIMESTAMP() }]->(user2)
RETURN friends;

MATCH (user1:Profile), (user2:Profile)
WHERE ID(user1) = 4
AND ID(user2) = 5
CREATE (user1)-[friends:FRIENDS { since: TIMESTAMP() }]->(user2)
RETURN friends;
