angularfire-login-boilerplate
=============================

A simple template for getting started with AngularFire (AngularJS + Firebase) w/ user login system.

This tutorial will show you how to set up a simple email/password-based user authentication system using AngularFire, along with a corresponding table for persistence of user data.

Getting Started
---------------

First, you will need to sign up at [Firebase](https://www.Firebase.com/).  The free plan they offer includes 5GB of data transfer, 50 max connections, and 100MB of data storage (as of 10/20/2013).

Once you have signed up, go to your [Account Page](https://www.firebase.com/account/) to create a new Firebase.  Choose a unique name and click Create, and once it appears, click Edit.  This will bring you to your new Firebase's data editing screen.

Paste this JSON into a file and save it:

{
  "users" : [ null, {
    "name" : {
      "last" : "Simpson",
      "first" : "Homer"
    }
  } ]
}

Click Import JSON and choose the file to set yourself up as the first user.

Next, click on Auth, and under Authentication Providers, click on Email & Password.  Click the checkbox to Enable email / password authentication in your application.  Then, under Add New User, enter your email address and a password to create yourself.  Your User ID should be 1.

Once you have created your user, click on Security and paste this in for the rules, then click Save Rules:

{
  "rules": {
    "users": {
      "$userid": {
        ".read": "auth.id == $userid",
        ".write": "auth.id == $userid"
      }
    }
  }
}

This will restrict the ability to read/write data to only the logged-in user.

Your Firebase user login + data system is now ready to go!  Upload the boilerplate files to your web host, making sure to update js/controllers.js (line 9) with the correct URL to your Firebase.

Demo
----

http://www.malenczak.com/angularfire-login-boilerplate/
