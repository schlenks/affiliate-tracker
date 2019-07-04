import dotenv from "dotenv";
import "reflect-metadata";

import { App } from "./app";

dotenv.config();

const app = new App();
app.listen();
