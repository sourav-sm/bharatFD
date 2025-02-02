# Welcome to BharatFD Assignment!

![Screenshot 2025-02-02 145718](https://github.com/user-attachments/assets/d54845aa-fbdf-44ce-9f2e-46c301028e45)

**And Also in Different languages**

![Screenshot 2025-02-02 145734](https://github.com/user-attachments/assets/3bcfa3cb-f346-4aa0-9a07-6e39f4d29ba7)

![Screenshot 2025-02-02 145749](https://github.com/user-attachments/assets/0a42b394-e7df-4c4e-a19a-986ffe953e45)


![Screenshot 2025-02-02 145806](https://github.com/user-attachments/assets/cae2ad31-b768-4c08-84b6-2eaac09beaaf)


This README provides instructions to set up and run the application locally. The project consists of:



1.  **Frontend**: React with Vite
    
2.  **Backend**: Express.js
    
3.  **Database**: MongoDB
## Prerequisites

Ensure you have the following installed on your system:

-   **Node.js**: [Download and install](https://nodejs.org/)
    
-   **npm**: Comes with Node.js (verify with `npm -v`)
    
-   **MongoDB**: [Download and install](https://www.mongodb.com/try/download/community)


# ## Clone the Repository
git clone https://github.com/sourav-sm/bharatFD.git
cd bharatFD




## 2. Setting Up the Backend

1.  Navigate to the backend directory:
    
    ```
    cd backend
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
3.  Create an `.env` file in the `backend` directory and configure the environment variables:
    
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/<your_database_name>
    GOOGLE_APPLICATION_CREDENTIALS=your credentials
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    
    ```
    
4.  Start the backend server:
    
    ```
    node index.js
    ```
    
    The backend should now be running on [http://localhost:5000](http://localhost:4000).


## 3. Setting Up the Frontend

1.  Navigate to the frontend directory:
    
    ```
    cd frontend
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
3.  Configure environment variables:
    
    Create a `.env` file in the `frontend` directory and add the following:
    
    ```
    VITE_API_BASE_URL = http://localhost:5000/api/faqs
    ```
    
4.  Start the frontend application:
    
    ```
    npm run dev
    ```
    
    The frontend should now be running on [http://localhost:5173](http://localhost:5173).


## 4. Setting Up the Database

1.  Ensure MongoDB is running on your local machine.
    
    -   Start the MongoDB server if it’s not already running. For example:
        
        ```
        mongod
        ```
        
2.  Use a MongoDB client (e.g., MongoDB Compass) to create a new database:
    
    -   Name the database as specified in the `MONGO_URI` in the backend `.env` file.
        

----------

## 5. Testing the Application

1.  Open the frontend in your browser: [http://localhost:5173](http://localhost:5173).
    
2.  This is admin panel 
     ![Screenshot 2025-02-02 145408](https://github.com/user-attachments/assets/85c9bd0e-2321-458e-91d6-a9685a12247f)
    
3.  This is Editing FAQ Details
   ![Screenshot 2025-02-02 145824](https://github.com/user-attachments/assets/26890d2f-72c1-40ef-9475-867fd4b08a96)

5. Similarly we can also delete them
