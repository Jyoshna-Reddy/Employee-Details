// const {
//     DynamoDBClient,
//     UpdateItemCommand,
//   } = require('@aws-sdk/client-dynamodb');
//   const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
  
//   const client = new DynamoDBClient();

//   const updateContact = async (event) => {
//     const response = { statusCode: 200 };
//     try {
//       // Parse input data from event (e.g., event.body)
//       const body = JSON.parse(event.body);
//       const EmployeeID = event.pathParameters.EmployeeID;
//       // Construct the UpdateItemCommand to update the Salary in DynamoDB
//       const params = {
//         TableName: process.env.DYNAMODB_TABLE_NAME,
//         Key: marshall({ EmployeeID }),
//         UpdateExpression:
//         'SET Address = :Address, Phone = :Phone, PersonalEmail = :PersonalEmail, EmergencyContactPersonName = :EmergencyContactPersonName, EmergencyContactPersonPhone = :EmergencyContactPersonPhone',
//       ExpressionAttributeValues: marshall({
//         ':Address': body.Address,
//         ':Phone': body.Phone,
//         ':PersonalEmail': body.PersonalEmail,
//         ':EmergencyContactPersonName': body.EmergencyContactPersonName,
//         ':EmergencyContactPersonPhone': body.EmergencyContactPersonPhone,
//         }),
//       };
  
//       // Send the UpdateItemCommand
//       await client.send(new UpdateItemCommand(params));
  
//       response.body = JSON.stringify({
//         message: 'Successfully updated employee contact details.',
//       });
//     } catch (e) {
//       console.error(e);
//       response.statusCode = 500;
//       response.body = JSON.stringify({
//         message: 'Failed to update employee contact details.',
//         errorMsg: e.message,
//       });
//     }
//     return response;
//   };
  
//   module.exports = {
//     updateContact,
//   };
  