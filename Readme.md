Client side tests with Cypress

The server side calls were fetch calls and not supported by Cypress.
I have used polyfill as a workaround(/tests/cypress/integration/dashboard.spec.js). 
which then allows me to make a XHR request for which I have mocked the responses. Read more here: https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js

This can be seen for all the server side calls i.e /properties,/client/config,/count?property=**,

The idea is to delete all the fetch calls before load and then evaluate the XHR requests.
Once that is done, we run the tests for that particular page.

To start cypress from your terminal(on MAC):
npm i
./node_modules/.bin/cypress open

Integration with Circle CI.
Integration with circle CI was pretty straightforward.
hardest part was to get the client running and cypress to talk to the client.
background:true, npm modules like wait-on etc did not work.
The workaround can be seen in the circle.ci file (build-client-run-cypress-tests). In future I may split that into two jobs, one to build and start the server and the next one to run the cypress tests.
