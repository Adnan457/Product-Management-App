# Product-Management-App

Techzone Web App
Overview
Techzone is a full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). This web app allows users to browse and filter products, while admin users can manage categories and products through an intuitive interface.

Features
Frontend (React):
Dynamic Product Display: 
Users can view a list of products with essential information like name, description, and pricing.

Category-based Product Filtering: 
Users can filter products by selecting specific categories from the list.

Price-based Filtering: 
Integrated with a price range filter using radio buttons, users can further refine their product search based on price.

Product Details Page: 
Each product has its own details page, accessed through the "More Details" button.

Responsive Banner Slider: 
A dynamic banner slider is displayed on the homepage, showcasing different promotional images.

Loading and Error Handling: 
Loading states and error handling provide feedback during data fetching.


Backend (Node.js/Express):
Category Management:
Create, Update, and Delete Categories:
Admin users can manage categories (create, update, delete).

Fetch Categories: 
Users can fetch a list of all available categories.

Fetch Products by Category: 
Users can view products under a specific category via category slug.

Product Management:
Create, Update, and Delete Products: 
Admin users can manage products.

Fetch Products by Pagination: 
Products are fetched with pagination for a smooth user experience.

Product Filters: 
Products can be filtered by category and price range.

Middleware & API Integration:
Authentication: Authentication middleware (requireSignIn) ensures only authorized users can manage categories and products.
Admin Role Verification: Admins are verified before performing category or product management tasks.

CORS: Cross-Origin Resource Sharing (CORS) is enabled to allow the frontend to communicate with the backend.

Tech Stack:
Frontend: React.js, Ant Design, Axios

Backend: Node.js, Express.js, MongoDB

Database: MongoDB (Mongoose ORM)

State Management: React Hooks

Styling: CSS, Ant Design components

Deployment:
I Deployed this project on Render.
Installation and Setup


Folder Structure

client/: Contains the React frontend.
server/: Contains the Express backend.
config/: Database and other configuration files.
controllers/: Logic for handling API requests.
routes/: API endpoints for categories, products, and authentication.
models/: MongoDB schemas for categories, products, and users.

Future Enhancements
User Authentication System: Implement a user authentication system allowing users to register, login, and manage their profiles.
Product Reviews and Ratings: Enable users to leave reviews and ratings for products.
Shopping Cart and Checkout: Add full cart functionality and a secure checkout process.
