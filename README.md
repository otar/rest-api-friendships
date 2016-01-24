# About This Project

An example of RESTful API backed by [NodeJS](https://nodejs.org)/[Express](http://expressjs.com/) and [Neo4j](neo4j.com) graph database.

Service allows to send friend requests between users, accept or decline them, list pending requests and browse friends or friends of friends.

See the API endpoints below.

# How To Run The Service

Download and install **NodeJS** and **Neo4j** if you don't have them already:
* https://nodejs.org/en/download/
* http://neo4j.com/download/

Change API and database configuration in **api/config.js**.

Then run these commands:
* Install dependencies: `npm install`
* Populate database with the example data: `npm populate`
* Run API server: **`npm start`**
* Optionally run tests: `npm test`

By default API server will be started on this URL: http://localhost:8080/

# Service Endpoints

##### GET /profiles
Lists all user profiles.

##### GET /profiles/:id
Shows a specific user profile.

##### GET /profiles/:id/friend-requests
Lists all pending friend requests of a specific user.

##### POST /profiles/:id/friend-requests
Requests friendship to a specific user. ID of a user requesting friendship should be provided in the POST data, you should submit a JSON with a `requester` parameter. Example CURL request: `curl -H "Content-Type: application/json" -X POST -d '{"requester":"123"}' http://localhost:8080/profiles/1/friend-requests`. By default the "pending" status will be assigned to a newly created friend requests.

##### PUT /profiles/:id/friend-requests/:request_id
Used to accept or decline a friend request of a specific user using a :request_id parameter (retrieved from the above endpoint). This will modify status of a friendship request from "pending" to "accepted" or "declined". We will not be deleting a friend request, we might use this data later for analysis...

##### GET /profiles/{profile_id}/friends
Lists all friends of a specific user.

##### GET /profiles/{profile_id}/friends-of-friends
Lists all "friends of friends" of a specific user.
