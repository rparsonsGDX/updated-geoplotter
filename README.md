# Geo Plotter Application With Timeline
Developed for Gates Defense (GDX)

##  Overview 
This application was developed with the intent of taking data points from a REST API and plotting them on a map. The application also plots the corresponding data pints on a timeline that can be used to track data types by color code. 

## Technology 
The application has been written using Node and React. The database uses SQLite to store data points with the following attributes ( uuid, lat, lon, time, date, description). 

## Components 
**There are three main components to the application as follows.** 

 1. **server.js**  - This file sets up the connection to the database and handles the API calls needed to persist the data.

2. **map-app-client** - This is the front end of the application that renders the map and timeline. 

3. **sqlite database** - the backend database used to store datapoints as they are consumed by the API. 

## Running the application 

The application can be run on local host or in docker on a platform such as EC2. 

**Run locally**
To run the application on localhost follow the steps below. Note, this assumes that the development environment is already setup. 

 1. Clone the repo `git@github.com:rparsonsGDX/updated-geoplotter.git`.
 2. cd to project directory <updated-geoplotter> and install dependencies `npm install`.
 3. Start the server `node server.js`. You should receive a message saying *"Server is running on port 3000. Connected to the SQLite database."*
 4. Open a new terminal and cd to the <map-app-client> directory `cd updated-geoplotter/map-app-client`
 5. Install dependencies `npm install`.
 6. Run the client `npm start`.
 7. If prompted with the following message, select **Y**  *Something is already running on port 3000. Probably:
node server.js (pid 4563) in /updated-geoplotter
Would you like to run the app on another port instead?  ›  (Y/n)*
 8. You can now view map-app-client in the browser.
Local: http://localhost:3001
On Your Network: http://192.168.1.199:3001

 **Run using Docker**  
*Assumes Docker is installed on EC2.*
 1. Ensure Docker is installed and running `docker -v`
 2. Start the application `docker compose up -d`
 
