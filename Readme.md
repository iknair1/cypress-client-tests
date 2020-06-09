### Client side tests with Cypress

##### Lets begin with pain points!
The performance app under test was making were making fetch calls which are and not supported by Cypress. 
I have used polyfill as a workaround(Example can be seen here: /tests/cypress/integration/dashboard.spec.js). 
This then allows me to make a XHR request for which I have mocked the responses. [Read more here](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js)

In the nutshell, we have mocked all the server side calls i.e /properties,/client/config,/count?property=**,
The idea is to delete all the fetch calls before load and then evaluate the XHR requests. Once that is done, we run the client side tests for that particular page.

To start cypress tests from your terminal(on MAC): 
```
cd {project_directory}
npm i
./node_modules/.bin/cypress run (or) npm run cypress-local
```

#### Integration with Circle CI.

Integration with Circle CI was pretty straightforward.
The hardest part was to get the client running and cypress to talk to the client. 
`background:true`, npm modules like `wait-on` etc did not work for us. 
The workaround can be seen in the circle.ci file (build-client-run-cypress-tests)

![Workflow](/Workflow.png)

![Passing Tests](/PassingTests.png)


##### To do:
1. In future I may split the single job into two, one to build and start the server and the next one to run the cypress tests.
2. Saving and Restoring caches which should speed up the pipeline job. I am on a free trial so every minute that can be saved is good :)
