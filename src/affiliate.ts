import express from "express";

export class Affiliate {
  private purchaseId: string;
  private aidKey: number;
  private pidKey: number;
  private sidKey: string|undefined;

  constructor(private req: express.Request) { }

  public process(): any {
    this.parseAffiliateParams();
  }

  public result(): any {
    return {
      aid: this.aidKey,
      pid: this.pidKey,
      purchaseId: this.purchaseId,
      sid: this.sidKey
    };
  }

  private parseAffiliateParams(): any {
    const { purchaseId, aid, sid, pid } = this.req.body;
    this.purchaseId = purchaseId;
    this.aidKey = aid;
    this.pidKey = pid;
    this.sidKey = sid;
  }
}
