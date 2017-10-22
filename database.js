var AWS = require("aws-sdk");

AWS.config.loadFromPath('./credentials.json');

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "User",
    Key: {
        "Username": 'BlakeHefley'
    }
};

docClient.get(params, function(err,data) {
    if (err) {
        console.error("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Get item success! Item: ", JSON.stringify(data, null, 2));
    }
});