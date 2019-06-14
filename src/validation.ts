
import {Validator} from "class-validator";
import {ValidationError} from "class-validator";
import * as express from "express";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";

// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = new() => T;

// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
export function validate<T>(type: Constructor<T>): express.RequestHandler {
  const validator = new Validator();
  const jsonConvert: JsonConvert = new JsonConvert();

  return (req, res, next) => {
    jsonConvert.operationMode = OperationMode.ENABLE;
    jsonConvert.ignorePrimitiveChecks = true;
    jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
    const input = jsonConvert.deserialize(req.body, type);
    const errors = validator.validateSync(input);
    if (errors.length > 0) {
      next(errors);
    } else {
      req.body = input;
      next();
    }
  };
}

// This middleware handles the case where our validation
// middleware says the request failed validation. We return
// those errors to the client here.
export function validationError(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    res.status(400).json({errors: err}).end();
  } else {
    next(err);
  }
}
