
'use strict';

const AWS = require('aws-sdk');

exports.handler = async(event, context) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode = 0;

  const{ id } = event.pathParameters

  const params = {
    TableName: 'items2',
    Key:{
        id: id
    }
  }

  try{
      
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201
    
  }catch(err){
      
    responseBody  = `Falha ao inserir iten: ${err}`;
    statusCode = 403;
    
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "content-type": "application/json"
    },
    body: responseBody
  };
  return response;

}