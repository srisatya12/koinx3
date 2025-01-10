# Task3

This project implements two APIs:

- **`/deviation`**: Calculates and returns the standard deviation of the price of a requested cryptocurrency from the last 100 records stored in the database.
- **`/insert-price`**: Allows you to insert the latest price data for a cryptocurrency into the database.

## Features

- **`/deviation`**: Returns the standard deviation of the price of the selected cryptocurrency (Bitcoin, Matic, or Ethereum).
- **`/insert-price`**: Insert a new price record for a specified cryptocurrency.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv for environment variables

## Installation

### Prerequisites

- Node.js
- MongoDB (local or cloud)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/srisatya12/koinx3.git

2. npm install

3. node server.js
