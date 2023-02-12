# NodeJS + ExpressJS + ReactJS CRUD App for OCS Team Technical Manager Position

![Made-With-React](https://img.shields.io/badge/Made_with-React-informational?style=for-the-badge&logo=react) ![Made-With-NodeJS](https://img.shields.io/badge/Made_with-NodeJS-informational?style=for-the-badge&logo=javascript) ![Made-With-Material_UI](https://img.shields.io/badge/Made_with-Material_UI-informational?style=for-the-badge&logo=mui) ![Deployed-with-Nginx](https://img.shields.io/badge/Deployed_with-Nginx-informational?style=for-the-badge&logo=nginx)

1. **ReactJS** for Frontend.
2. **NodeJS** for Backend and **ExpressJS** as Middleware.
3. **Material UI** for styling.

<h2>About:</h2>

OCS TEAM CRUD APP is a full stack application developed using MERN stack (here I used MySQL instead of MongoDB), which does basic CRUD operation like ADD, UPDATE and DELETE on the user details. The project is deployed using Nginx webserver and the webserver has SSL certificates installed in it which will be sent when some user connects over HTTPS.

## Quick Start

Clone the repository

```bash
git clone https://github.com/girishgr8/OCS-TEAM-CRUD-APP.git
```

Now, follow the steps below to run the application on your local machine:

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run start

# Run the React client only
npm run crudapp

# Server runs on http://localhost:4000 and client on http://localhost:3000
```

## Features
- [x] View all Users' Details on Homepage
- [x] Create New User
- [x] Update & Delete Existing User Details
- [x] Deployed over Nginx web server
- [x] SSL Certificate installed in the webserver & same is provided to the incoming connection
- [x] Accessing the URL over HTTPS connection

## Demo

### SSL Certificate validation
![SSL Certificate](https://github.com/girishgr8/OCS-TEAM-CRUD-APP/blob/main/demo/SSL%20Certificate.png)

### 1. Add New User
![Add New User](https://github.com/girishgr8/OCS-TEAM-CRUD-APP/blob/main/demo/AddUser.gif)

### 2. Edit User
![Edit User](https://github.com/girishgr8/OCS-TEAM-CRUD-APP/blob/main/demo/EditUser.gif)

### 3. Delete User
![Delete User](https://github.com/girishgr8/OCS-TEAM-CRUD-APP/blob/main/demo/DeleteUser.gif)

**This project was developed for selection to OCS Technical Manager Post during my M.Tech at IIT Hyderabad in less than 2 days**

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/girishgr8/OCS-TEAM-CRUD-APP/blob/main/LICENSE) file for details


<h3 align="center"><b>Developed with :heart: by Girish Thatte</b></h1>
