// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Enhanced Authentication API',
      version: '1.0.0',
      description: 'API documentation for Enhanced Authentication API',
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'], // Path to the API routes folder
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
