
module.exports = {

    each: function(item, callback)
    {

        Array.prototype.forEach.call(item, callback);

    },

    isValidId: function(id)
    {

        return (id > -1);

    }

};
