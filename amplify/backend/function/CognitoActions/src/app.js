/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var AWS = require('aws-sdk');
var origins_prod = "https://littydoctors.com";
var origins_dev = "https://ds0wb4bd1k4ec.cloudfront.net"; // ["https://ds0wb4bd1k4ec.cloudfront.net/", "https://littydoctors.com/"];
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  var origin = req.get('origin');
  const origins = origin === origins_dev ? origins_dev : origins_prod;

  res.header("Access-Control-Allow-Origin", origins)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/addUserToGroup', async function(req, res) {
  try {
    var origin = req.get('origin');

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const _response = null;
    const params = {
      GroupName: "client",
      UserPoolId: req.body.UserPoolId,
      Username: req.body.Username
    };

    _response = await cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": (origin === origins_dev ? origins_dev : origins_prod) }, body: _response })

  } catch (error) {

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": (origin === origins_dev ? origins_dev : origins_prod) }, body: error })

  }
});

app.post('/verifyIfUserExist', async function(req, res) {

  try {
    var origin = req.get('origin');
    const origins = origin === origins_dev ? origins_dev : origins_prod;
    
    AWS.config.update({region: 'us-east-1'});

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    //COGNITO
    var params = {
      UserPoolId: req.body.UserPoolId,
      AttributesToGet: [
        'email',
      ],
      Filter: 'email=\"'+req.body.email+'\"',
    };

    const cemail = await cognitoidentityserviceprovider.listUsers(params).promise();
    params.Filter = 'username=\"'+req.body.Username+'\"';
    const cusername = await cognitoidentityserviceprovider.listUsers(params).promise();

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins }, body: { cognito:{email: (cemail.Users.length > 0), username: (cusername.Users.length > 0)}} })

  } catch (error) {
    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins }, body: error })
  }

});

app.post('/createUser', async function(req, res) {
  try {
    var origin = req.get('origin');
    const origins = origin === origins_dev ? origins_dev : origins_prod;

    AWS.config.update({region: 'us-east-1'});

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    //COGNITO

    var params = {
        UserPoolId: req.body.UserPoolId, /* required */
        Username: req.body.Username, /* required */
        DesiredDeliveryMediums: [
            'SMS',
            'EMAIL'
        ],
        ForceAliasCreation: false,
        //MessageAction: 'RESEND',
        TemporaryPassword: req.body.Password,
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: req.body.email
            },
            {
                Name: 'name', /* required */
                Value: req.body.name
            },
            {
                Name: 'phone_number', /* required */
                Value: req.body.phone_number
            }
            /* more items */
        ]
    };

    cognitoidentityserviceprovider.adminCreateUser(params, async (err, data) => {
        if (err) res.json({ statusCode: 200, headers: {  "Access-Control-Allow-Origin": origins }, body: err })
        else {
          const params_group = {
            GroupName: "client",
            UserPoolId: req.body.UserPoolId,
            Username: req.body.Username
          };
      
          _response = await cognitoidentityserviceprovider.adminAddUserToGroup(params_group).promise();
          res.json({ statusCode: 200, headers: {  "Access-Control-Allow-Origin": origins }, body: _response })
        }
    });
  } catch (error) {
    res.json({ statusCode: 200, headers: {  "Access-Control-Allow-Origin": origins }, body: error })
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
