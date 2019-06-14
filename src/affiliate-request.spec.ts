import { fail } from "assert";
import chai from "chai";
import { JsonConvert } from "json2typescript";
import "mocha";

import { AffiliateRequest } from "./affiliate-request";

const expect = chai.expect;
const jsonConvert: JsonConvert = new JsonConvert();

describe("AffiliateRequest Deserialize", () => {
  it("should convert json to AffiliateRequest object", () => {
    const testJson: object = {
      aid: 12345,
      pid: 67890,
      purchaseId: "TEST_12345",
      sid: "ABCD1234"
    };

    let input: AffiliateRequest;
    try {
      input = jsonConvert.deserializeObject(testJson, AffiliateRequest);
    } catch (error) {
      fail(error);
    }

    expect(input.aid).to.eql(12345);
    expect(input.pid).to.eql(67890);
    expect(input.purchaseId).to.eql("TEST_12345");
    expect(input.sid).to.eql("ABCD1234");
  });

  it("should convert json to AffiliateRequest object with optional properties missing", () => {
    const testJson: object = {
      aid: 12345,
      pid: 67890,
      purchaseId: "TEST_12345"
    };

    let input: AffiliateRequest;
    try {
      input = jsonConvert.deserializeObject(testJson, AffiliateRequest);
    } catch (error) {
      fail(error);
    }

    expect(input.aid).to.eql(12345);
    expect(input.pid).to.eql(67890);
    expect(input.purchaseId).to.eql("TEST_12345");
    expect(input.sid).to.eql(undefined);
  });

  it("should not convert json to AffiliateRequest object with required properties missing", () => {
    const testJson: object = {
      aid: 12345
    };

    let input: AffiliateRequest;
    try {
      input = jsonConvert.deserializeObject(testJson, AffiliateRequest);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
    expect(input).to.eql(undefined);
  });
});
