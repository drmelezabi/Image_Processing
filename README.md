# Image processing API

This project is part of the Udacity Full-Stack Javascript Nanodegree

It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint also it will send exist thumbnail if it had created before.

############################################################################################

## http request

  GET /
  --Instructures 
-----------------------------------------------------------------
  GET /convert/?filename={filename}&height={height}&width={width}
  --Make thumbnails

############################################################################################

## query

| `filename` type `string` | **Required**. image filename of the desired image to be resized |
| `height`   type `number` | **Required**. desired height                              |
| `width`    type `number` | **Required**. desired width                               |

############################################################################################

### Functionality

-   This will create a thumb version of the image (if it does not exist already)
-   If you change the height or width parameter it will recreate the image
-   Futhermore it will be delivered as the response to the client

############################################################################################

## Scripts

Run prettier
  npm run prettier
---------------------
Run tests
  npm run test
---------------------
Run ESLint
  npm run lint
  npm run lint-fix
---------------------
Build the project
  npm run build
---------------------
Run the application
  npm run start
---------------------