// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Point da Larica',
    description: 'Endpoints for Point da Larica',
    version: '1.0.0',
  },
  host: 'localhost:3333',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
  tags: [
    {
      name: 'User',
      description: 'Endpoint for Employer',
    },
    {
      name: 'Coupon',
      description: 'Endpoint for Coupon',
    },
    {
      name: 'Product',
      description: 'Endpoint for Product',
    },
    {
      name: 'Order',
      description: 'Endpoint for Order',
    },
    {
      name: 'Role',
      description: 'Endpoint for Employer',
    },
    {
      name: 'Courtesy',
      description: 'Endpoint for Courtesy',
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
