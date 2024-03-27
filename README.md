# authentication-api
Enhanced Authentication API
Description
The Enhanced Authentication API is a backend service that provides authentication functionalities with support for public and private user profiles. It allows users to register, log in, log in/register with social media accounts, manage their profile details, and set their profiles as public or private. Admin users have the ability to view both public and private user profiles, while normal users can only access public profiles.

# Features
User registration with email and password
User login with email and password
User login/register with Google, Facebook, Twitter, or GitHub
User profile management (photo, name, bio, phone, email, password)
Uploading a new photo or providing an image URL for the profile
Setting profile visibility as public or private
Admin access to view both public and private user profiles
Normal user access limited to public user profiles
# Technologies Used
Node.js
Express.js
MongoDB (with Mongoose ODM)
Passport.js (for authentication)
JWT (JSON Web Tokens) for session management
Swagger for API documentation
Installation
Clone the repository:

bash
git clone <repository-url>
Install dependencies:

bash
cd enhanced-auth-api
npm install
Set up environment variables:

Create a .env file in the root directory
Define environment variables such as PORT, MONGODB_URI, and SECRET_KEY in the .env file
Start the server:

sql
Copy code
npm start
# API Documentation
Explore the API endpoints and interact with them using the Swagger API playground. Access the Swagger documentation at http://localhost:3000/api-docs.

Usage
Register a new account: POST /api/auth/register
Log in: POST /api/auth/login
Log in/register with social media: POST /api/auth/login/:provider
View user profile: GET /api/profile
Edit user profile: PUT /api/profile
Set profile visibility: PUT /api/profile/visibility
Admin access to view all users: GET /api/admin/users
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

License
This project is licensed under the MIT License.

