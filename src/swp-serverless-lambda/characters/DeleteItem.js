'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = '';
  let statusCode = 0;
  
  const object_id  = event.queryStringParameters.id;

  const params = {
    TableName: 'swp_characters',
    Key: {
      id: parseInt(object_id)
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = {}
    statusCode = 204; 

  } catch(err) {
    responseBody = {
      'status': 'ERROR',
      'error': `Unable to delete object. The following error occurred: ${err}`
    };
    statusCode = 403; 
  }

  const response = {
    statusCode: statusCode,
    headers: {},
    body: JSON.stringify(responseBody)
  }
  
  return response;
};