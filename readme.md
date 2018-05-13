# Profilio

Profilio is a modularized personal website framework.


## Installation Instructions

Follow the instructions below to install this application.

  1. Download and install __node.js v0.10.32__ and __npm v1.4.28__.

  2. Install bower globally with the following command.
     ```
     npm install bower -g
     ```
     The tested bower version is __bower v1.8.0__.

  3. Install grunt and grunt-cli globally with the following commands.
     ```
     npm install grunt -g
     npm install grunt-cli -g
     ```
     The tested versions of grunt and grunt-cli are __grunt v0.4.5__ and 
     __grunt-cli v0.1.13__.

  4. Install dependencies for project initialization and maintenance using the 
     following commands at the project root path `/`.
     ```
     npm install
     bower install
     grunt
     ```
     Note that bower may require root authorization in linux environment, so 
     the bower installation command should be replaced with the following one.
     ```
     bower install --allow-root
     ```

  5. (Optional) Install dependencies for source application using the following 
     command at the source codes path `/src/`.
     ```
     npm install
     ```

  6. (Optional) After installing the dependencies for the source application, 
     it could be launched and accessed from `http://localhost:3000/` for 
     testing purposes using the following command at the source codes path 
     `/src/`.
     ```
     npm start
     ```
     And the port can be designated by replacing the previous command with the 
     following one.
     ```
     PORT=[Your Port] npm start
     ```
     So the access URL is then `http://localhost:[Your Port]/`.

  7. Install dependencies for built application using the following command at 
     the build path `/build/`.
     ```
     npm install
     ```

  8. After installing the dependencies for the built application, it could be 
     launched and accessed from `http://localhost:3000/` using the following 
     command at the root path `/`.
     ```
     npm start
     ```
     And the port can be designated by replacing the previous command with the 
     following one.
     ```
     PORT=[Your Port] npm start
     ```
     So the access URL is then `http://localhost:[Your Port]/`.


## Directory Structures

Below are the directory structures.

  * `src`: The source codes directory containing the project source codes.
    - `package.json`: The package description file.
    - `app.js`: The application entrance.
    - `bin`: The entrance directory containing application launching scripts.
    - `routes`: The routes directory containing the routing rules.
    - `views`: The views directory containing the web views.
    - `public`: The public directory to store public resources.
      - `javascripts`: The directory storing built-in public javascripts.
      - `stylesheets`: The directory storing built-in public stylesheets.
      - `images`: The directory storing built-in public images.
      - `imports` (dymanic): The directory storing dynamic public imports.
      - `files` (dymanic): The directory storing dynamic or uploaded public files.
  * `build`: The build directory containing the executable application.
  * `data`: The data directory for application data storage.
  * `scripts`: The scripts directory to place maintenance scripts.


## Authorship

Below is the authorship information for this project.

  * __Author__:  David Qiu
  * __Emain__:   david@davidqiu.com
  * __Website__: www.davidqiu.com

Copyright (C) 2016, David Qiu. All rights reserved.


