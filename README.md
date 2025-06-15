# Image Processing App Project

This project is a full-stack web application that allows users to upload images, resize them, and recieve the results. It is built for the DECI level 4 web development graduation project.

## ❕HOW TO RUN❕

> ‼️‼️IMPORTANT: DO NOT USE "Live Server" OR OPEN THE HTML PAGE DIRECTLY. THAT WILL CAUSE ERRORS.‼️‼️

0. For first-time setup, open the console and run the following code

```bash
npm install
```

1. Start the server by running the following code:

```bash
npm run start
```

2. Follow the link printed in the console, which should be http://localhost:3001 in most cases
3. You should be met with the frontend of the server. You can now start using the app normally.
4. ❕DEVELOPER ONLY❕ To run unit and endpoint tests, run the following code:

```bash
npm run test
```

> **Note**:  
> If errors occur, it might be due to the port of the server `3001` being used somewhere else on your machine. You can either turn off whatever is using the port, or change the port of the server to an available one and restart it, changing the URL in the browser accordingly.

---

## Features:

- ### Upload images via a web interface
- ### Resize images on the server
- ### Organized routing with API endpoints
- ### Unit and integration testing with Jasmine
- ### Sample images and test files included

---

## Endpoints

- ### `/api`
    - **Method**: `GET`
    - **Description**: Serves no purpose, but acts as the main router of the API.
- ### `/api/getImages`
    - **Method**: `GET`
    - **Description**: Provides the images stored on the backend, including newly uploaded images.
- ### `/api/uploadImage`
    - **Method**: `POST`
    - **Description**: Route to upload images. Accepts image files. Has no (practical) response.
- ### `/api/resizeImage`
    - **Method**: `POST`
    - **Description**: Route to resize images. Receives a string of image filename and a numerical value width and height. Responds with resized image.

---

## Author
- Made by: Yussuf Mohammad Abbas
