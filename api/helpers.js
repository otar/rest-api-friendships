
module.exports = {

    each: function(item, callback)
    {

        Array.prototype.forEach.call(item, callback);

    },

    isValidId: function(id)
    {

        return (
               typeof id !== 'undefined'
            && !isNaN(parseInt(id))
            && isFinite(id)
            && id > -1 // IDs in Neo4j start from 0
        );

    }

};
