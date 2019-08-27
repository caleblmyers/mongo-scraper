# mongo-scraper

Caleb Myers

## Overview

This application looks for the top articles on MTV Music News and creates comment boards for them. Users are able to update the site to see the latest news. By leaving comments on articles, users are able to communicate with each other and share their interests and opinions.

The site is hosted on Heroku at: https://scraper-sites.herokuapp.com/

## Description

When visiting the site, users see a navbar displaying the title and two buttons labeled "Scrape" and "Clear".

These two buttons are used to refresh the page. "Clear" gets rid of any old articles, while "Scrape" will search for news to add to the database.

When the database is full of news, the main body of the page will list the news stories as cards. These cards display the article's title, as well as a short summary. 

Below the summary is a button, "Go to Article", which links to the main article page. Next to that is another button, "Comment", which pulls up the article's comment board. The comment board will display all user comments for that specific article, if there are any. A form is also provided to add new comments.

When the database is empty a single card will appear telling the user to press the "Scrape" button.

## Details

This application utilizes **Node.js** and the **Express** framework to create it's server.

News articles are gathered using **Axios** and manipulated with **Cheerio**.

The database is created with **MongoDB** and **Mongoose**.

**Handlebars** is used to render dynamic HTML content.

The app is hosted on **Heroku** at: https://scraper-sites.herokuapp.com/
