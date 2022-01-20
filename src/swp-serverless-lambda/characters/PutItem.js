'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const uniqueId = (length=16) => { parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))};
  let responseBody = '';
  let statusCode = 0;
  
  const params = {
    TableName: "swp_characters",
    Item: JSON.parse(event.body)
  }

  try {
    const data = await documentClient.put(params).promise();
    const response = {
      "status": "OK",
      "action": "object_created",
      "data": JSON.stringify(data),
    }
    
    responseBody = JSON.stringify(response)
    statusCode = 201; 

  } catch(err) {
    responseBody = `Unable to create object. The following error occurred: ${err}`;
    statusCode = 403; 
  }

  const response = {
    statusCode: statusCode,
    headers: {},
    body: responseBody
  }
  
  return response;
};