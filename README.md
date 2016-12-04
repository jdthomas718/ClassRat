<img src="https://github.com/jdthomas718/ClassRat/blob/master/public/images/ClassRat-Clear.png" alt="ClassRat Logo" width="150px" height="150px" align="right"/>
# ClassRat 
The ClassRat application is a web application for [Dakota State University](http://dsu.edu/) students to rate and review classes.

## Motivation
ClassRat is created in mind to provide a free and open forum for Dakota State students to discuss and rate classes offered by the university. The application has a similar goal in mind to [Rate My Professors](https://www.ratemyprofessors.com/), but is more class-centric and targeted towards the university. 

## Installation
Make sure that you have 64-bit Node.js installed prior to forking the repo. You can find the download at [here.] (https://nodejs.org/en/download/)

Fork the ClassRat repository and open it up in your favorite IDE. We suggest using [Cloud9](http://www.c9.io) to streamline the process.

After opening the project, run `npm install` in the node terminal to install the dependencies.

Set the environment variables DB_URL, DB_USER, and DB_PASS to your database URL, username, and password respectively.

In BASH, these commands would be `export DB_URL = 1234.mlab.com:47975/yourdatabase`, `export DB_USER = username`, `export DB_PASS = password`.

These environment variables not set by default as we run our database using MongoDB using [mlab](https://mlab.com/). You will need to set up your own database for the application to fully work. Refer to the API documentation links below for the required format of the classes.

## API Reference

Our API uses JSON to send data between the application and its database. The two links below describe the JSON format for how classes are stored in the database, as well as the format of how the application sends and retrieves data from the MongoDB database.

[Database Content] (https://slack-files.com/T2C5YDJG5-F2MKZ8NRW-826bcb5282) <br />
[API Example] (https://slack-files.com/T2C5YDJG5-F2MLA0P5M-04dc749e8a)

## How to Use Application
Search for the name of the class that you're interested in. Valid formats include both the name and course number.

For example, entering `Discrete Math` or `Math 316` are both valid inputs. 

Then, just click the relevant class option that will auto-populate below the search bar as you type.

After selecting a class, you will then have the option to choose a particular class section taught by a professor.

You will then be able to see the reviews associated with that class section. You can now leave a review for the class by filling out and submitting the form that populates at the bottom of the application.

## Website
The live version of the application can be found at: http://classrat.herokuapp.com/

## License
Mozilla Public License Version 2.0
