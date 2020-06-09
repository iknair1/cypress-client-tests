import "cypress-localstorage-commands";

describe("dashboard page tests", () => {
  beforeEach(() => {
    let polyfill;
    const polyfillUrl = "https://unpkg.com/unfetch/dist/unfetch.umd.js";
    cy.request(polyfillUrl).then((response) => {
      polyfill = response.body;
    });
    cy.visit("/auth/login");
    cy.setLocalStorage(
      "AUTH_authToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzE1MjhkOWQ3MzAwNTNhNjE2OTQ3ZSIsImlhdCI6MTU5MTI3NDIwOSwiZXhwIjoxNTkxMjgxNDA5fQ.T2vhHktiCT7mRN9W3LuE7A2KFVMy83L3WN8vKHeunAI"
    );

    cy.server();
    cy.route({
      method: "GET",
      url: "/api/properties",
      response: {
        properties: [
          {
            domains: ["foodwonderfulfood.co.uk"],
            beacons: [],
            _id: "5ec261251a20f86d51b56edc",
            name: "fwf UK",
            key: "123-321",
            organisation: "5ec152049d730053a6169479",
            __v: 0,
          },
          {
            domains: ["_ANY_"],
            beacons: [],
            _id: "5ec261251a20f86d51b56edd",
            name: "fwf US",
            key: "111-111",
            organisation: "5ec152049d730053a6169479",
            __v: 0,
          },
        ],
      },
    });

    cy.route({
      method: "GET",
      url: "/api/client/config",
      response: {
        metrics: {
          PAGE_LOAD: { key: "page_load", value: "Page Loaded" },
          DNS_TIME: { key: "dns_time", value: "DNS Time" },
          NETWORK_LATENCY: { key: "network_latency", value: "Network Latency" },
          DOM_CONTENT_LOADED: {
            key: "dom_content_loaded",
            value: "DOM Loaded",
          },
          DOM_INTERACTIVE: { key: "dom_interactive", value: "DOM Interactive" },
          TTFB: { key: "ttfb", value: "Time to First Byte" },
          REDIRECT_TIME: { key: "redirect", value: "Redirect Time" },
        },
      },
    });

    cy.route({
      method: "GET",
      url: "/api/beacons/count?property=5ec261251a20f86d51b56edd&**",
      response: { count: 129911223 },
    });

    cy.route({
      method: "GET",
      url: "/api/beacons/count?property=5ec261251a20f86d51b56edc&**",
      response: { count: 88888 },
    });

    cy.route({
      method: "GET",
      url: "/api/performance/summary?property=5ec261251a20f86d51b56edd&percentile=80&metric=page_load",
      response: { bouncingDistribution: {}, nonBouncingDistribution: {} },
    });

    cy.route({
      method: "GET",
      url:
        "/api/performance/summary?property=5ec261251a20f86d51b56edc&percentile=80&metric=page_load",
      response: {
        bouncingDistribution: {
          "285": 1,
          "295": 0,
          "305": 0,
          "315": 0,
          "325": 0,
          "335": 0,
          "345": 0,
          "355": 0,
          "365": 0,
          "375": 0,
          "385": 1,
          "395": 1,
          "405": 1,
          "415": 0,
          "425": 0,
          "435": 0,
          "445": 0,
          "455": 1,
          "465": 0,
          "475": 0,
          "485": 0,
          "495": 0,
          "505": 1,
          "515": 0,
          "525": 0,
          "535": 0,
          "545": 2,
          "555": 2,
          "565": 3,
          "575": 1,
          "585": 1,
          "595": 1,
          "605": 1,
          "615": 0,
          "625": 1,
          "635": 0,
          "1245": 2,
          "1255": 1,
          "1345": 0,
          "1355": 1,
          "645": 2,
          "655": 1,
          "665": 2,
          "675": 3,
          "685": 1,
          "695": 0,
          "705": 0,
          "715": 2,
          "725": 2,
          "735": 1,
          "745": 0,
          "755": 0,
          "765": 3,
          "775": 2,
          "785": 1,
          "795": 2,
          "805": 3,
          "815": 1,
          "825": 2,
          "835": 2,
          "845": 2,
          "855": 0,
          "865": 0,
          "875": 1,
          "885": 2,
          "895": 0,
          "905": 0,
          "915": 1,
          "925": 3,
          "935": 0,
          "945": 2,
          "955": 0,
          "965": 1,
          "975": 2,
          "985": 0,
          "995": 1,
          "1005": 3,
          "1015": 1,
          "1025": 2,
          "1035": 0,
          "1045": 0,
          "1055": 2,
          "1065": 0,
          "1075": 0,
          "1085": 2,
          "1095": 0,
          "1105": 0,
          "1115": 0,
          "1125": 0,
          "1135": 0,
          "1145": 0,
          "1155": 0,
          "1165": 0,
          "1175": 1,
          "1185": 0,
          "1195": 0,
          "1205": 0,
          "1215": 0,
          "1225": 1,
          "1235": 0,
          "1265": 0,
          "1275": 0,
          "1285": 1,
          "1295": 0,
          "1305": 0,
          "1315": 0,
          "1325": 0,
          "1335": 0,
          "1365": 1,
          "1375": 0,
          "1385": 0,
          "1395": 0,
          "1405": 0,
          "1415": 0,
          "1425": 0,
          "1435": 0,
          "1445": 1,
        },
        nonBouncingDistribution: {
          "285": 1,
          "295": 0,
          "305": 0,
          "315": 0,
          "325": 0,
          "335": 0,
          "345": 0,
          "355": 0,
          "365": 0,
          "375": 0,
          "385": 1,
          "395": 1,
          "405": 1,
          "415": 0,
          "425": 0,
          "435": 0,
          "445": 0,
          "455": 1,
          "465": 0,
          "475": 0,
          "485": 0,
          "495": 0,
          "505": 1,
          "515": 0,
          "525": 0,
          "535": 0,
          "545": 2,
          "555": 2,
          "565": 3,
          "575": 1,
          "585": 1,
          "595": 1,
          "605": 1,
          "615": 0,
          "625": 1,
          "635": 0,
          "1245": 2,
          "1255": 1,
          "1345": 0,
          "1355": 1,
          "645": 2,
          "655": 1,
          "665": 2,
          "675": 3,
          "685": 1,
          "695": 0,
          "705": 0,
          "715": 2,
          "725": 2,
          "735": 1,
          "745": 0,
          "755": 0,
          "765": 3,
          "775": 2,
          "785": 1,
          "795": 2,
          "805": 3,
          "815": 1,
          "825": 2,
          "835": 2,
          "845": 2,
          "855": 0,
          "865": 0,
          "875": 1,
          "885": 2,
          "895": 0,
          "905": 0,
          "915": 1,
          "925": 3,
          "935": 0,
          "945": 2,
          "955": 0,
          "965": 1,
          "975": 2,
          "985": 0,
          "995": 1,
          "1005": 3,
          "1015": 1,
          "1025": 2,
          "1035": 0,
          "1045": 0,
          "1055": 2,
          "1065": 0,
          "1075": 0,
          "1085": 2,
          "1095": 0,
          "1105": 0,
          "1115": 0,
          "1125": 0,
          "1135": 0,
          "1145": 0,
          "1155": 0,
          "1165": 0,
          "1175": 1,
          "1185": 0,
          "1195": 0,
          "1205": 0,
          "1215": 0,
          "1225": 1,
          "1235": 0,
          "1265": 0,
          "1275": 0,
          "1285": 1,
          "1295": 0,
          "1305": 0,
          "1315": 0,
          "1325": 0,
          "1335": 0,
          "1365": 1,
          "1375": 0,
          "1385": 0,
          "1395": 0,
          "1405": 0,
          "1415": 0,
          "1425": 0,
          "1435": 0,
          "1445": 1,
        },
      },
    });

    cy.visit("/", {
      onBeforeLoad: (win) => {
        delete win.fetch;
        win.eval(polyfill);
        win.fetch = win.unfetch;
      },
    });
  });

  it("properties returns correct values", () => {
    cy.get(".nav.collapse.in").should("not.be.visible");
    cy.get("#current-property-name").click();
    cy.get(".nav.collapse.in").should("be.visible");
    cy.get(".sidebar-normal").contains("fwf US");
  });

  it("changes the selected property when a new one is chosen", () => {
    cy.get("#current-property-name").contains("fwf UK");
    cy.get(".chartjs-render-monitor").should("be.visible");

    cy.get("#current-property-name").click();
    cy.get("#sidebar-property-5ec261251a20f86d51b56edd").contains("fwf US");
    cy.get(".nav.collapse.in").should("be.visible");

    cy.get("#sidebar-property-5ec261251a20f86d51b56edd").click();
    cy.get("#current-property-name").contains("fwf US");
    //cy.get('.chartjs-render-monitor').should('not.be.visible'); // we are not rendering a chart for fwf us - BUG!
    cy.get(".nav.collapse.in").should("not.be.visible");
  });

  it("updates the beacon count when selecting a new property", () => {
    cy.get("#current-property-name").click();
    cy.get("#sidebar-property-5ec261251a20f86d51b56edc").click();
    cy.get("#beacons_value").contains("88888");

    cy.get("#current-property-name").click();
    cy.get("#sidebar-property-5ec261251a20f86d51b56edd").click();
    cy.get("#beacons_value").contains("129911223");
  });

  it("property sees ", () => {
    cy.get("#page-link-logout").click();
    cy.get("#google_login").contains("Login");
  });

  it("logout takes user back to login page", () => {
    cy.get("#page-link-logout").click();
    cy.get("#google_login").contains("Login");
  });
});
