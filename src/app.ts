import bodyParser from "body-parser";
import express from "express";

import { Affiliate } from "./affiliate";
import { AffiliateRequest } from "./affiliate-request";
import { validate, validationError } from "./validation";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(validationError);
  }

  private routes(): void {
    const router = express.Router();

    router.get("/", (req, res) => {
      res.json({
        message: "Hello World!"
      });
    });

    router.post("/", validate(AffiliateRequest), (req, res) => {
      const affiliate = new Affiliate(req);
      affiliate.process();
      res.json(affiliate.result());
    });

    this.express.use("/", router);
  }
}

export default new App().express;
