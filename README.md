# CarSharing [![Build Status](https://travis-ci.org/Azbesciak/CarSharing.svg?branch=master)](https://travis-ci.org/Azbesciak/CarSharing)
### Target
This app gives you possibility to add your route and find passengers (which can refund it in some part), or as a passenger - find most suitable route. The only thing you need is quick registration (less than one minute).

### How to run
You can run this app simply by typing `gradlew bootRun` in your console - however, jdk 8 is required (tested on jdk 8 151).
If you would like to use it in development mode, you can run separated server as api and as separate process angular frontend, which works defaulty at port 4200 (start command `ng serve` in frontend directory).

### Used technologies:
 - Kotlin (1.2.10)
 - Spring Boot (2.0.0 M7)
 - Angular (5.1.2)
 - SQL server 2017
 
... and connected with them. <br>
Code is under Travis CI.
 
### Plans:
 - [ ] user can see status of his requests
 - [ ] driver can see information about his route on the map (miniature) and about passengers which he accepted.
 - [ ] create simple chat between users
 - [ ] allow users to add their photos
 - [ ] provide opinions mechanism
 - [ ] improve errors displaying
 - [ ] possibility to combine route from multiple drivers
 - [ ] give users possibility to lend cars or find alternative route with other public transport
 
 ### Screenshots:
 ![Home page][homePage]

 ![Adding route][addRoute]

 ![Searching route][searchRoute]

 ![Routes view][routesView]

[homePage]: https://raw.githubusercontent.com/Azbesciak/CarSharing/master/screenshots/homePage.png "Home page"
[addRoute]: https://raw.githubusercontent.com/Azbesciak/CarSharing/master/screenshots/addRoute.png "Add route"
[searchRoute]: https://raw.githubusercontent.com/Azbesciak/CarSharing/master/screenshots/searchRoute.png "Search route"
[routesView]: https://raw.githubusercontent.com/Azbesciak/CarSharing/master/screenshots/routesView.png "Routes view"
