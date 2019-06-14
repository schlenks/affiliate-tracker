import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

import { App } from "./app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("baseRoute", () => {
  let app: App;
  beforeEach(() => {
    app = new App();
  });

  it("should be json", (done) => {
    chai.request(app.express).get("/").end((err, res) => {
      expect(err).to.eql(null);
      expect(res.type).to.eql("application/json");
      done();
    });
  });

  it("should have a message prop", (done) => {
    chai.request(app.express).get("/").end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.message).to.eql("Hello World!");
      done();
    });
  });
});
