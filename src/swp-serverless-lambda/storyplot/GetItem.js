'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = '';
  let statusCode = 0;

  const params = {
    TableName: 'swp_storyplot',
  };
  
  if (event && event.queryStringParameters != null && event.queryStringParameters.id != null) {
    params.ProjectionExpression = "#id, author_id, story_name, storyplot_nodes",
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(responseBody)
  }
  
  return response;
};