'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = '';
  let statusCode = 0;
  
  const object_id  = event.queryStringParameters.id;
  const { name, author_id, gamesys_id, player_controlled, attr_general, attr_specific } = JSON.parse(event.body);

  const params = {
    TableName: 'swp_characters',
    Key: {
      id: parseInt(object_id)
    },
    UpdateExpression: 'set name = :n, gamesys_id = :g, author_id = :a, player_controlled = :pc, attr_general = :attg, attr_specific = :atts',
    ExpressionAttributeValues: {
      ':n': name,
      ':g': gamesys_id,
      ':a': author_id,
      ':pc': player_controlled,
      ':attg': attr_general,
      ':atts': attr_specific
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