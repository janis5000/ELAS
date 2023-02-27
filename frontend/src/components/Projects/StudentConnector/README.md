<p align="center">
<img height="34" src="components/Assets/StudentConnector.png" alt="StudentConnector Logo"> <br>
<h3 align="center">Connect with other students</h3>
</p>

## Table of Contents

* [Project Information](#project-information)
* [Project Architecture](#project-architecture)
* [Libraries used](#libraries-used)
* [Examples](#visualization)
* [Links](#links)
* [Get Started](#get-started)
* [Developers](#developers)

## Project Information
StudentConnector is a web app to find other students to learn with them or to
discuss with them. It is possible to set up ones own profile and to join different courses
to then ask questions or to discuss different topics about this course. It is also possible
to see other students in the course and to directly contact them in a chat.

## Project Architecture
The architecture was chosen to be easily scalable and adaptable if 
the project will be further extended in the future and grows larger.<br>
The following structure can be found within the project:
- pages folder: Inside the Pages folder there is each page that is used in this
project.
  - Within each element in the pages folder there is usually a components folder
  components that are used in this page, a utils folder which contains the requests
  the backend or further helper functions and in some cases a specific styles folder
  for styles used only in this component.
- components folder: components that are reused throughout different pages
- styles folder: A folder containing global styles
- utils folder: A folder containing different global functionalities that are used
throughout the whole project. For example the usage of the context API or centralized
access to the backend is given here.

## Libraries used
- React
- Material UI
- Flask (backend)
- Postgres database

## Examples
<img src="components/Assets/screenshot.png">
<img src="components/Assets/screenshot1.png">
<img src="components/Assets/screenshot2.png">
<img src="components/Assets/screenshot3.png">
<img src="components/Assets/screenshot4.png">
<img src="components/Assets/screenshot5.png">
<img src="components/Assets/screenshot6.png">