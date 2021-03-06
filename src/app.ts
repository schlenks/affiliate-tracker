import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { AffiliatePurchase } from "./entity/AffiliatePurchase";
import { validate, validationError } from "./validation";

export class App {
  public express: express.Application;

  private port: number;
  private connection: any;

  constructor() {
    this.port = this.normalizePort(process.env.PORT);
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  public listen(): void {
    createConnection().then(async (connection: any) => {
      this.connection = connection;
      this.express.listen(this.port, () => {
        // tslint:disable-next-line: no-console
        console.log(`Affiliate Tracker server started on port ${this.port}`);
      });
    });
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get("/", (req, res) => {
      res.json({
        message: "Hello World!"
      });
    });

    router.post("/", validate(AffiliatePurchase), async (req, res) => {
      // req.body is now an AffiliateRequest or we will error out
      const savedAffiliate = await this.connection.manager.save(req.body);
      res.json({ message: "Affiliate Saved", affiliate: savedAffiliate });
    });

    this.express.use("/", router);
  }

  private errorHandlers(): void {
    this.express.use(validationError);
  }

  private normalizePort(val: number|string, defaultPort: number = 3000): number {
    const portNumber: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (!isNaN(portNumber) && portNumber >= 0) {
      return portNumber;
    }
    return defaultPort;
  }
}
