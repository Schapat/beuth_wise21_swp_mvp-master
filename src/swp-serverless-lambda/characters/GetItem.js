'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = '';
  let statusCode = 0;

  const params = {
    TableName: 'swp_characters',
  };

  if (event && event.queryStringParameters != null && event.queryStringParameters.id != null) {
    params.ProjectionExpression = "#id, name, gamesys_id, author_id, player_controlled, attr_general, attr_specific",
    params.FilterExpression = "#id = :object_id",
    params.ExpressionAttributeNames  = {
        "#id": "id",
    },
    params.ExpressionAttributeValues = {
         ":object_id": parseInt(event.queryStringParameters.id)
    }
  }

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = {
      'status': 'OK',
      'data': data.Items
    }
    statusCode = 200; 

  } catch(err) {
    responseBody = {
     'status': 'ERROR',
     'error': `Unable to get objects. The following error occurred: ${err}`
    }
    statusCode = 403; 
  }

  const response = {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(responseBody)
  }
  
  return response;
};