# Weather-Journal App Project

## Overview
### V1/Original:
This project was based on the Weather API exercise presented by the [Udacity Front-End Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). The prompt required you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. At the time, instructions were as follows:

<h4>Files:</h4>
<ul>
    <li>This will require modifying the <code>server.js</code> file and the <code>app/app.js</code> file.</li>
    <li>You can see <code>index.html</code> for element references, and once you are finished with the project steps, you can use <code>style.css</code> to style your application to customized perfection.</li>
</ul>

<h4>Required Dependencies:</h4>
<ul>
    <li>This project utilizes <code>cors</code> and <code>body-parser</code> so you should make sure they are installed through the command line. 
    <li>Also, the Node server uses Express, so make sure this is set up as well.</li>
</ul>


### V2:
**(10/17/2021 Update)** After doing some more research and reviewing best practices, the following updates were made to this project:
<ul>
    <li>In order to protect the API credentials, the key and the access components were moved to an <code>.env</code> file so that they can be used as environment variables</li>
    <li>Since the API credentials were moved to the backend, the client-side Fetch API can no longer be used so <code>node-fetch</code> was added as a dependency for the backend</li>
    <li>Sass has been added as a compiler for the CSS styles</li>
    <li>A favicon and a header image was added to provide more visual appeal</li>
</ul>

### Required Dependencies (as of 10/17/2021):
This project utilizes the following dependencies:
<ul>
    <li><code>body-parser</code> <em>(Part of original project)</em></li>
    <li><code>cors</code> <em>(Part of original project)</em></li>
    <li><code>dotenv</code> <em>(Added as of V2)</em></li>
    <li><code>express</code> <em>(Part of original project)</em></li>
    <li><code>node-fetch</code> <em>(Added as of V2)</em></li>
    <li><code>sass</code> <em>(Added as of V2)</em></li>
</ul>

## Deployment
Please check out what the app looks like on [Heroku](https://fierce-chamber-88506.herokuapp.com/).

