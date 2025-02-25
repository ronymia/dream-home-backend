import swaggerJsDoc from 'swagger-jsdoc'; // Importing swagger-jsdoc to generate swagger documentation
import fs from 'fs';

// Configuration object for Swagger
const swaggerOptions = {
  // Define the OpenAPI specification version and basic information
  definition: {
    info: {
      title: 'Dream Home', // Title of the API documentation
      version: '1.0.0', // Version number of the API
      description: 'API documentation for dream home', // Short description of the API
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1', // Base URL for the API server
      },
    ],
  },
  // Paths to the API files where Swagger will extract documentation from comments
  apis: ['./app/modules/**/*.ts'], // Specify the files containing annotated routes
};

// Generate the Swagger documentation using the options defined above
const swaggerDocs = swaggerJsDoc(swaggerOptions);
fs.writeFileSync('swagger-output.json', JSON.stringify(swaggerDocs, null, 2));

// Export the generated documentation so that it can be used elsewhere in the application
export default swaggerDocs;
