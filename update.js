const {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    GetItemCommand,
  } = require('@aws-sdk/client-dynamodb');
  const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
  
  const client = new DynamoDBClient();

  const updateContact = async (event) => {
    const response = { statusCode: 200 };
    try {
      // Parse input data from event (e.g., event.body)
      const body = JSON.parse(event.body);
  
      // Construct the UpdateItemCommand to update the Salary in DynamoDB
      const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ employeeId: event.pathParameters.employeeId  }),
        UpdateExpression:
          'SET Address = :address, Phone = :phone, PersonalEmail = :personalEmail, EmergencyContactPersonName = :emergencyContactName, EmergencyContactPersonPhone = :emergencyContactPhone',
        ExpressionAttributeValues: marshall({
          ':address': body.Address,
          ':phone': body.Phone,
          ':personalEmail': body.PersonalEmail,
          ':emergencyContactName': body.EmergencyContactPersonName,
          ':emergencyContactPhone': body.EmergencyContactPersonPhone,
        }),
      };
  
      // Send the UpdateItemCommand
      await client.send(new UpdateItemCommand(params));
  
      response.body = JSON.stringify({
        message: 'Successfully updated employee details.',
      });
    } catch (e) {
      console.error(e);
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: 'Failed to update employee details.',
        errorMsg: e.message,
      });
    }
    return response;
  };
  
  module.exports = {
    updateContact,
  };
  