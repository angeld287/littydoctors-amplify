/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var AWS = require('aws-sdk');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/addUserToGroup', function(req, res) {
  // Add your code here
  const people = [
    {name: "test1", age: 33},
    {name: "test2", age: 23},
    {name: "test3", age: 50},
  ];
  res.json({people});
});

app.get('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/addUserToGroup', async function(req, res) {
  // Add your code here
    

    try {

      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      const _response = null;
      const params = {
        GroupName: "client",
        UserPoolId: req.body.UserPoolId,
        Username: req.body.Username
      };

      _response = await cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();

      var response = {
          statusCode: 200,
          headers: {
              "Access-Control-Allow-Origin": "*"
          },
          body: _response
      };

      res.json({success: 'post call succeed!', url: req.url, body: response})

    } catch (error) {

      var response = {
          statusCode: 200,
          headers: {
              "Access-Control-Allow-Origin": "*"
          },
          body: error
      };

      res.json({success: 'post call succeed!', url: req.url, body: response})

    }
    
});

app.post('/verifyIfUserExist', async function(req, res) {
  // Add your code here
    try {

      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      const _response = null;
      const params = {
        GroupName: "client",
        UserPoolId: req.body.UserPoolId,
        Username: req.body.email
      };

      var params1 = {
        UserPoolId: req.body.UserPoolId, /* required */
        AttributesToGet: [
          'email',
        ],
        Filter: 'email=\"'+req.body.email+'\"',
        //Limit: 'NUMBER_VALUE',
        //PaginationToken: 'STRING_VALUE'
      };

      //_response = await cognitoidentityserviceprovider.listUsers(params1).promise();

      cognitoidentityserviceprovider.listUsers(params1, function(err, data) {
        if (err) {
          var response = {
              statusCode: 200,
              headers: {
                  "Access-Control-Allow-Origin": "*"
              },
              body: err
          };
    
          res.json({success: 'post call succeed!', url: req.url, body: response})
          
        } else{     
          var response = {
              statusCode: 200,
              headers: {
                  "Access-Control-Allow-Origin": "*"
              },
              body: data
          };

          res.json({success: 'post call succeed!', url: req.url, body: response})
        }
      });

    } catch (error) {

      var response = {
          statusCode: 200,
          headers: {
              "Access-Control-Allow-Origin": "*"
          },
          body: error
      };

      res.json({success: 'post call succeed!', url: req.url, body: response})

    }
    
});

app.post('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
