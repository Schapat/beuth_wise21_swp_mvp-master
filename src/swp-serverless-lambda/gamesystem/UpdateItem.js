'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = '';
  let statusCode = 0;
  
  const object_id  = event.queryStringParameters.id;
  const { name, logo, publisher, attributes } = JSON.parse(event.body);

  const params = {
    TableName: 'swp_gamesystem',
    Key: {
      id: parseInt(object_id)
    },
    UpdateExpression: 'set name = :n, publisher = :p, attributes = :a, logo = :l',
    ExpressionAttributeValues: {
      ':n': name,
      ':p': publisher,
      ':a': attributes,
      ':l': logo
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204; 

  } catch(err) {
    response = {
      'status': 'ERROR',
      'object_id': object_id,
      'error': `Unable to update objects. The following error occurred: ${err}`
    }
    responseBody = JSON.stringify(response);
    statusCode = 403; 
  }

  const response = {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: responseBody
  }
  
  return response;
};