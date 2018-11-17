# NFL GifTastic

## About NFL Giftastic

This application is for all you NFL enthusiasts. You can search by any NFL team and view Gifs or new about that NFL teams.  If you find a Gif you like, you can save it to your favorites or even download it to your computer. If you accidentally add a Gif to your favorites, have no fear, you can always delete it.

## How did we accomplish all of this?

### RESTFul APIs

The NFL Giftastic application only uses two APIs.

1. GIPHY API

        https://developers.giphy.com/

        GIPHY's APIs make it dead simple for developers to incorporate this vast library right inside of their apps to deliver highly interactive content that is proven to increase daily engagement across all types of apps; messaging, chat, dating, creation, community, and more.

        The GIPHY API implements a REST-like interface. Connections can be made with any HTTP or HTTPS enabled programming language. The GIPHY API also implements CORS, allowing you to connect to GIPHY from JavaScript / Web browsers on your own domain. The GIPHY API provides multiple file sizes, dimensions, and formats of every GIF to meet every clients potential needs.

1. Hit the GIPHY API.

        https://developer.fantasydata.com/

        FantasyData API solutions are web APIs, developed using REST web services. REST web services (also called RESTful web APIs) are APIs that are implemented using REST (Representational State Transfer) architecture. FantasyData.com has opted to use REST architecture for its APIs because of REST’s ease of use and high performance.

### JavaScript Libraries

1. jQuery

    This is a single page application (SPA) that leverages jQuery to render the HTML. The jQuery library has a full suite of Ajax capabilities. The functions and methods therein allow us to load data from the server without a browser page refresh.  Ajax was used to talk to the 3rd party RESTful APIs.

1. Bootstrap

### CSS Libraries

1. Custom CSS

    Custom CSS was used to give this page it's on look and feel and not be so Bootstrap-ish.

1. Bootstrap CSS

    Bootsrap CSS was used to give the front-end it's beautiful look and feel. In addition, Bootstrap was used to allow for a responsive design.

### Local Storage

    The localStorage object stores the data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.  In this project localStorate is used to save your favorite Gifs.