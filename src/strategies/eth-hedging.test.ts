import { EthHedgingStrategy } from "./eth-hedging";
import { describe, it, expect } from "vitest";


describe("EthHedgingStrategy", () => {
  it("should be defined", async () => {
    const strategy = new EthHedgingStrategy("0x38f8b30067BE6AaaC130D2252c77D524b74edBEA");
    const targetPosition = await strategy.calculateTargetPosition();
    console.log("🚀 ~ it ~ targetPosition:", targetPosition)
    expect(targetPosition).toBeDefined();
  });
});
