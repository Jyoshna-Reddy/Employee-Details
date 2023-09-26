

const { DynamoDBClient, PutItemCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient();

// Helper function to generate a unique Employee ID
function generateEmployeeID() {
    return Math.random().toString(36).substring(2, 10);
}

// // 1. Create Employee
// const createEmployee = async (event) => {
//     const response = { statusCode: 200 };
//     try {
//         // Parse input data from event (e.g., event.body)
//         const body = JSON.parse(event.body);

//         // Generate a unique Employee ID
//         const employeeID = generateEmployeeID();

//         // Construct the PutItemCommand to insert the employee record into DynamoDB
//         const params = {
//             TableName: process.env.DYNAMODB_TABLE_NAME,
//             Item: marshall({
//                 EmployeeID: employeeID,
//                 EmployeeName: body.EmployeeName,
//                 Salary: body.Salary,
//                 // Add other fields as needed
//             }),
//         };

//         // Send the PutItemCommand
//         await client.send(new PutItemCommand(params));

//         response.body = JSON.stringify({
//             message: 'Successfully created employee.',
//             EmployeeID: employeeID,
//         });
//     } catch (e) {
//         console.error(e);
//         response.statusCode = 500;
//         response.body = JSON.stringify({
//             message: 'Failed to create employee.',
//             errorMsg: e.message,
//         });
//     }
//     return response;
// };

// // 2. List Employees
// const listEmployees = async () => {
//     const response = { statusCode: 200 };
//     try {
//         // Use the ScanCommand to retrieve all records from DynamoDB
//         const { Items } = await client.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

//         // Extract employee names and salaries
//         const employees = Items.map((item) => unmarshall(item));

//         response.body = JSON.stringify({
//             message: 'Successfully retrieved all employees.',
//             employees: employees,
//         });
//     } catch (e) {
//         console.error(e);
//         response.statusCode = 500;
//         response.body = JSON.stringify({
//             message: 'Failed to retrieve employees.',
//             errorMsg: e.message,
//         });
//     }
//     return response;
// };

// 3. Update Salary
const updateSalary = async (event) => {
    const response = { statusCode: 200 };
    try {
        // Parse input data from event (e.g., event.body)
        const body = JSON.parse(event.body);

        // Construct the UpdateItemCommand to update the Salary in DynamoDB
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ EmployeeID: body.EmployeeID }),
            UpdateExpression: 'SET Salary = :newSalary',
            ExpressionAttributeValues: marshall({ ':newSalary': body.Salary }),
        };

        // Send the UpdateItemCommand
        await client.send(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: 'Successfully updated employee salary.',
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to update employee salary.',
            errorMsg: e.message,
        });
    }
    return response;
};

// 4. Delete Employee
// const deleteEmployee = async (event) => {
//     const response = { statusCode: 200 };
//     try {
//         // Parse input data from event (e.g., event.pathParameters)
//         const { EmployeeID } = event.pathParameters;

//         // Construct the DeleteItemCommand to remove the employee record from DynamoDB
//         const params = {
//             TableName: process.env.DYNAMODB_TABLE_NAME,
//             Key: marshall({ EmployeeID }),
//         };

//         // Send the DeleteItemCommand
//         await client.send(new DeleteItemCommand(params));

//         response.body = JSON.stringify({
//             message: 'Successfully deleted employee.',
//         });
//     } catch (e) {
//         console.error(e);
//         response.statusCode = 500;
//         response.body = JSON.stringify({
//             message: 'Failed to delete employee.',
//             errorMsg: e.message,
//         });
//     }
//     return response;
// };

// // 5. Get Employee by ID
// const getEmployee = async (event) => {
//     const response = { statusCode: 200 };
//     try {
//         // Parse input data from event (e.g., event.pathParameters)
//         const { EmployeeID } = event.pathParameters;

//         // Construct the GetItemCommand to retrieve the employee record from DynamoDB
//         const params = {
//             TableName: process.env.DYNAMODB_TABLE_NAME,
//             Key: marshall({ EmployeeID }),
//         };

//         // Send the GetItemCommand
//         const { Item } = await client.send(new GetItemCommand(params));

//         response.body = JSON.stringify({
//             message: 'Successfully retrieved employee.',
//             employee: Item ? unmarshall(Item) : {},
//         });
//     } catch (e) {
//         console.error(e);
//         response.statusCode = 500;
//         response.body = JSON.stringify({
//             message: 'Failed to get employee.',
//             errorMsg: e.message,
//         });
//     }
//     return response;
// };

module.exports = {
    createEmployee,
    listEmployees,
    updateSalary,
    deleteEmployee,
    getEmployee,
};
