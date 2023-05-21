# Simple FullStack application!

This is an example for a small FullStack Application. Below is short description of the app and its main moving parts.

Backend - Express framework is running A simple REST API. Connection to DB is done using [Prisma](https://www.prisma.io/) and the data
FrontEnd - React 18 is used to show a simple list of users and their email address and enables adding new users.

The app allow to create users and groups of users (many-to-many relationship). The API enables creating, deleting, and updating relationship of users and groups.

There are two subfolders in this repository - "frontend" and "backend" (I know, very original) - I presume you know how to install dependencies - so just one word about the backend - in order to use your own DB - create a `.env` file under the `backend` folder and a new environment variable of the name `DATABASE_URL` and assign it your own DB connection string.
