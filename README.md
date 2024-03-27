# TrashCodes - Online Judge Application 2024

## Overview

TrashCodes is an online judge application designed to provide programmers with a platform to solve coding problems and receive immediate feedback on their solutions. It offers a user-friendly interface, advanced code editor, custom test case evaluation, and administrative features for managing problem statements and user accounts.

## Technology Stack - MERN

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/80px-Node.js_logo.svg.png" alt="Node.js Logo" width="100" height="50"/> <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js Logo" width="100" height="50"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/80px-React-icon.svg.png" alt="React Logo" width="100" height="50"/> <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" alt="MongoDB Logo" width="100" height="50"/>

## Website is Live
https://trash-codes.vercel.app/

-if you face any issues try to change site settings and allow insecure sites/content.



## Features

- **User Authentication**: Secure user registration and login system with password encryption using bcrypt.
- **Question List**: A list of questions with their difficulty level which links to solving problem page.
- **Code Editor**: Integrated code editor powered by NPM with syntax highlighting, auto-indentation, and line numbering for writing and testing code solutions.
- **Custom Test Cases**: Users can run their code against custom test cases to validate its correctness and efficiency.
- **Submission Evaluation**: Code submissions are evaluated against predefined test cases, providing users with instant feedback on their solutions.
- **Previous Submission**: Users can view their last successful submission.
- **Admin Panel**: Administrative interface for managing problem statements.
- **CRUD Operations**: Create, read, update, and delete operations for problem statements, allowing administrators to maintain the problem bank.
- **Responsive Design**: Responsive and mobile-friendly UI ensures optimal user experience across devices and screen sizes.

## Getting Started

Follow these steps to set up and run TrashCodes on your local machine:

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database server running locally or accessible via connection string.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ashishjoshi1623/online-judge_2024.git
    ```

2. Navigate to the Server directory:

    ```bash
    cd online-judge/Server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```   

### Configuration

1. Create a `.env` file in the Server directory:

    ```plaintext
    PORT=3000
    DATABASE_URL=your_database_connection_string
    ```

2. Replace `your_database_connection_string` with the connection string for your MongoDB database.

### Database Setup

1. Ensure that MongoDB is installed on your system. If not, you can download and install it from the [official MongoDB website](https://www.mongodb.com/try/download/community).

2. Start the MongoDB service on your local machine.

3. Create a new MongoDB database for TrashCodes. You can do this using the MongoDB shell or a GUI tool like MongoDB Compass.

4. Once you've created the database, update the `.env` file in the root directory of your project with the MongoDB connection string. Replace `your_mongodb_connection_string` with your actual MongoDB connection string:

    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ```

    You can obtain your MongoDB connection string from your MongoDB Atlas dashboard or from your local MongoDB instance.

5. Save the changes to the `.env` file.

6. Run the database migrations to create the necessary collections and indexes:

    ```bash
    npm run migrate
    ```

    This command will create the required collections and indexes in your MongoDB database based on the defined schemas.

7. Your MongoDB database is now set up and ready to use with TrashCodes.

### Frontend Setup

TrashCodes frontend is built using Vite. Here's how to set it up:

1. Navigate to the client directory:

    ```bash
    cd online-judge/Client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the client directory.

4. Add the following environment variable to the `.env` file to specify the backend API URL:

    ```plaintext
    VITE_API_PORT=http://localhost:3000
    ```

    Replace `http://localhost:3000` with the base URL of your backend API.

5. Save the changes to the `.env` file.

6. Start the Client development server:

    ```bash
    npm run dev
    ```

7. Access the frontend in your web browser at `Vite provided port` or you can change it to any other available port.


### Running the Application

1. Start the Backend server:

    ```bash
    npm run dev
    ```

2. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Register a new user account or log in with existing credentials.

2. Explore the list of available problem statements and select one to solve.

3. Use the integrated code editor to write your solution and test it against custom test cases.

4. Submit your code for evaluation and receive immediate feedback on its correctness and efficiency.

5. Administrators can access the admin panel at `/adminlogin` to login and further manage problem statements.

## API Routes

The following API routes are available:

- `POST /api/register`: Register a new user account.
- `POST /api/login`: Log in with existing credentials.
- `POST /api/adminlogin`: Log in admin with existing credentials.
- `POST /api/allquestion`: List of Questions with their corresponding difficulty level.
- `GET /api/description/:title`: Get problem Description for particular question.
- `POST /api/run`: Run code for custom inputs.
- `POST /api/submit`: Submit code for evaluation against pre defined test.
- `POST /api/submission`: Responds with the last successful submission if present for a user.
- `POST /api/contactquery`: Stores user query and their personal email on database.
- `POST /api/question`: Add problem statement (Admin only).
- `POST /api/editquestions`: Change content of previously added problem statement (Admin only).
- `POST /api/deletequestion`: Delete previously added problem statement (Admin only).

## Contributing

Contributions to TrashCodes are welcome! Here's how you can contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Commit your changes and push to your branch:

    ```bash
    git commit -am 'Add your feature'
    git push origin feature/your-feature
    ```

4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

- Special thanks to AlgoUniversity Team for their guidance and support.
- Thanks to [bcrypt](https://www.npmjs.com/package/bcrypt) for password encryption.
- Inspired by the concept of online judges like Codeforces and LeetCode.

