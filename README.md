# Food Ordering and Pickup App - README

Welcome to the Food Ordering and Pickup App! This application is built using React for the frontend, Node.js for the backend, and MongoDB for database management. Whether you're a developer looking to contribute or a user eager to order delicious meals, we're thrilled to have you on board.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/food-ordering-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd food-ordering-app
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Configuration

1. Create a `.env` file in the `server` directory:

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/food-ordering-db
   ```

   Adjust the MongoDB URI as needed.

### Running the App

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:3001`.

2. Start the frontend development server:

   ```bash
   cd client
   npm start
   ```

   The frontend will be accessible at `http://localhost:3000`.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.

- **Browse Restaurants:** View a list of restaurants with detailed menus.

- **Order Placement:** Users can easily place orders with customizable options.

- **Order Tracking:** Track the status of your order in real-time.

- **Order History:** Access a history of past orders for easy reordering.

- **User Reviews:** Leave and view restaurant reviews to help others make informed choices.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
  
- **Node.js:** A runtime for executing JavaScript server-side.

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.

- **MongoDB:** A NoSQL database for storing application data.

- **Mongoose:** An ODM (Object Document Mapper) for MongoDB and Node.js.

- **JWT:** JSON Web Token for secure user authentication.

## Contributing

We welcome contributions from the community! Feel free to submit issues, enhancement requests, or pull requests.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Enjoy your food ordering experience! 🍔🌮🍕