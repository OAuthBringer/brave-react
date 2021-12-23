# Requirements

Everything here has been containerized for conveninience, but you will need functional version of Docker and Docker Compose running locally

Assuming OSX and Homebrew:
  https://docs.docker.com/desktop/mac/install/
 
Docker compose is built in python so you'll need to install it through whatever your preferred mechanism is:

`pip3 install docker-compose`

# Usage

To spin it up:

`docker-compose build`
`docker-compose run`

You will be able to view the front-end at http://localhost:2222

https://github.com/OAuthBringer/brave-rails is the expected backend here so it should be up and running locally in order to get live data and caching.

To tear everything down:

`docker-compose down`

# Implementation

This react frontend is mostly just MUI with some minor theming applied.  There are some stylistic/organizational elements that I would prefer to refine but given the scope of this project what I have here should be sufficient.  The app cleanly supports viewing and navigating through the entirety of the SWAPI API and also will automatically add new primary navigational elements (should any be added to SWAPI) automatically because of the data driven implementation.

You can deploy the app standalone without the companion rails api backend, but it will just return an infinite loading state (which is fine).

## Strengths

1. Dynamically generates Navigational Elements, Table columns/rows, and View sections based on incoming data. 
1. Supports all SWAPI api endpoints and sections natively and is thus functionally complete.  Any new sections added to https://swapi.dev/api will automatically populate over time. All views/tables are supported with 2 components and a thin adapter layer that handles data coming from the backend. 
1. Mobile Responsive by default.
1. Themes can be swapped out cleanly.

## Weaknesses

SWAPI's relational data model does not support human friendly context for associated URLS, thus all associations in the View components can at best return a parsed value from the URL.  This is not ideal UX but this is really a backend issue.

## Possible Improvements

1. Routing.  There are no routes here so URLs don't matter.  Routing is a complex subject and given the nature of the API proxy there was complexity there that I simply chose to ignore.
1. Themes/styles.  There's some minimal theming roughly based on Brave's homepage

## Conclusion

This front-end is mobile responsive from the start, has core support for themes, and allows the full exploration of the SWAPI Api with only a handful of components and a Context Provider for managing state.

