# Backend Guide

## Setup

**Note:** Change directory to the `backend` directory before following the steps.

1. Rename `sample.env` to `.env` and fill in the required values.
2. Run `npm install` to install the dependencies.
3. Run `node server.js` to start the server.

Now your API should be accessible from [http://localhost:3000/](http://localhost:3000/).

## API Endpoints

**Note:**

-  You can use `request.rest` to interact with the API. Install the **VLC REST Client** extension to make requests easily.
-  If you need to populate the database with data, remember that only users with the role `admin` can create products. Currently, there is no way to create an admin user from the frontend. Follow these steps to set up an admin user:
   1. Create a user through the frontend signup.
   2. Access the MongoDB database and manually change the user's role to `admin`. Check user model for more info.
   3. Back in the frontend, go to the Account section to access options for creating products.

### Authentication

-  **POST** `/api/account/login`: Login a user
-  **POST** `/api/account/signup`: Create a new user
-  **GET** `/api/account/verify`: Verify a JWT token (requires authorization)
-  **GET** `/api/account/delete`: Delete a user account (requires authorization)

### Products

-  **GET** `/api/products`: Get all products
-  **POST** `/api/products/create`: Create a new product (requires authorization)

### Cart

-  **POST** `/api/cart/create`: Create a new cart (requires authorization)
-  **GET** `/api/cart/`: Get all carts for the current user (requires authorization)
-  **DELETE** `/api/cart/delete-item`: Delete an item from the cart (requires authorization)
-  **DELETE** `/api/cart/delete-cart`: Delete the entire cart (requires authorization)

### Orders

-  **POST** `/api/orders/create`: Create a new order (requires authorization)
-  **GET** `/api/orders/`: Get all orders for the current user (requires authorization)

### Users

-  **GET** `/api/users/`: Get all users (requires admin authorization)

### Authorization

Most endpoints require a valid JWT token for authorization. You can obtain a JWT token by logging in a user (`/api/account/login`). The token should be included in the authorization header of your requests.
