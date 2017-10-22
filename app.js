var AWS = require("aws-sdk");

AWS.config.loadFromPath('./credentials.json');
const express = require('express')
const app = express()
var docClient = new AWS.DynamoDB.DocumentClient();


var getUser = function(username, res){
    var params = {
        TableName : "Users",
        FilterExpression: "#un = :user",
        ExpressionAttributeNames:{
            "#un": "userName"
        },
        ExpressionAttributeValues: {
            ":user":username
        }
    }
    docClient.scan(params).promise().then(function(data){
        console.log("Get item success! Item: ", JSON.stringify(data, null, 2));
        if(data.Count > 1){
            console.error("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));        
            res.send("ERROR CAUGHT");
        }else if(data.Count < 1){
            res.send("No user with that username");
        }else{        
            res.send(data.Items[0]);
        }
    }).catch(function(err){
        console.error("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));        
        res.send("ERROR CAUGHT");
    });
}

app.get('/users/:userName', function (req, res) {
    getUser(req.params.userName, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})