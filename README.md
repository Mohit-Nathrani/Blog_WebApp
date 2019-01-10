# Blog_WebApp
web application to post and read blogs with nested comment section implemented.

## Demo :  [Hosted at Heroku]

## Features!
- This blog web app allow a user to post and view blogs.
- A user can also post and reply to comments in the comment section of a blog.
- There are two ways to write a blog. One way is using markdowns to write correctly aligned and size-controlled blogs. Another simple alternative should be present for users who not comfortable with markdowns.
- Additionally while writing a blog, user can preview the blog before submitting.
- Authentication for posting or liking a blog and to comment.

## Technologies:
- **Front-end**: Reactjs along with Material-UI (React UI framework). <br>
- **Back-end**: Nodejs, Express, Passportjs (for google authentication). <br>
- **Database**: MongoDB hosted at mlab.com <br>
- **Google+ API Service**: for user authentication

## Front-end flowchart
![image](https://drive.google.com/uc?id=1icwqg9nnVC03PzBl8rpUyGmK7-IyA-8H)

## Datebase Models:
![image](https://drive.google.com/uc?id=1-QTgCN4WCeb5ngLJl_Uhuez9NK2wglsF)
## How to Use on a local machine
(The below installation guide is for on ubuntu)
Install node and npm:
```sh
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
$ sudo npm install -g n
```
After confirming that node are npm are installed.
Clone this repo ( *Assumming git is already installed* ):
```sh
$ git clone https://github.com/Mohit-Nathrani/Blog_WebApp.git
```

after cd <repo_dir>
there is a file  **server/config/keys.js**
inside that input
1. mongodb database link link 
2. CookieKey (anything ex:"RandomKey")
3. Go to https://console.developers.google.com
 create a project and get clientId, clientSecret for authentication using google+ api
there provide Authorized JavaScript origins : http://localhost
there also provide Authorized redirect URIs: 	http://localhost:3001/auth/google/redirect
after getting keys put them in key.js

Now we will start the server:
```sh
$ cd server
$ npm install
$ node index
```
if everything is okay, this text will come on terminal: <br>
**server listening....**  <br>
**connection successful**  <br>

Now in another terminal (from repo dir):
```sh
$ cd client
$ npm install
$ npm start
```

This step will open ( localhost:3000 ) in browser.

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Hosted at Heroku]: <https://blog-webapp-mohitkn.herokuapp.com>
