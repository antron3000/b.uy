# b.uy

**Buy anything. Pay any way.**

b.uy is a purchase router. A person or an AI agent says what they want, b.uy finds the best way to get it, accepts payment on whatever rail the buyer has, and routes money to the seller and the thing to the buyer.

b.uy is not a store, a bank, or a custodian. It never holds funds. It quotes, routes, and tracks.

## The three layers

| Layer | Job | Phase 1 (crypto) |
|---|---|---|
| Intent and catalog | Turn "I want X" into comparable offers | Fiat → crypto, crypto → crypto |
| Payment router | Accept any rail, pay the seller on their rail | Card, bank, Apple/Google Pay, Interac, PIX, SEPA, crypto |
| Fulfillment router | Deliver goods, services, or digital assets | On-chain delivery to the buyer's own wallet |

## Strategy

**Aggregator and router first.** Licensed providers do KYC, hold money, and settle. b.uy sits in front of all of them, compares real all-in prices, and routes each order to the best provider for that buyer, country, payment method, and asset. This is legal without a money-transmitter licence, it ships in weeks instead of years, and it is literally the "route payments to different sellers" idea from day one.

**Crypto is the first "anything".** It is digital, delivered instantly, has no returns, and the "pay any way" half of the tagline is exactly the on-ramp problem. Once buyers hold stablecoins through b.uy, stablecoins become the settlement rail for every other kind of seller later.

**Agents are a first-class customer.** Agents can find things but very few can complete a purchase safely. A short domain plus one `buy` endpoint with spending limits and a receipt is what agent builders want.

## Primary rail: U.CASH

[U.CASH](https://u.cash) (U.CASH Inc., Ontario) is the primary partner. It is non-custodial and is not an MSB, which matches b.uy's posture. The pieces b.uy uses:

- **Buy** (buy.u.cash): fiat ramp to UCASH, BTC, ETH and more via card, bank, Interac e-Transfer, Apple Pay, Google Pay. KYC and payment handled by U.CASH partners. Delivers to the buyer's wallet.
- **Swap and Bridge**: crypto-to-crypto across 19 EVM chains plus Solana, routed through 0x, Jupiter, LI.FI, and ChangeNOW. 0.50% all-in.
- **Pay** (pay.u.cash): non-custodial checkout for 50+ assets, cards via the merchant's own Stripe, and 22 bank/wallet rails. b.uy uses it when b.uy is itself the seller.
- **Agents** (agents.u.cash): HTTP 402 payments, x402 on Base, and MCP servers. This is the backbone of the agent product.

Secondary routes (Coinbase Onramp, Stripe Onramp, Transak, MoonPay, Banxa, Revolut Ramp, Kraken Ramp, Ramp Network) fill coverage gaps by country, payment method, and asset.

## Phases

1. **Crypto router.** Fiat → crypto and crypto → crypto, to the buyer's own wallet, via U.CASH and secondary on-ramps. Web UI plus API plus MCP server. See [docs/v1-spec.md](docs/v1-spec.md).
2. **Digital goods and services.** Anything deliverable online, paid in fiat or crypto through U.CASH Pay. Agents pay via 402.
3. **Physical goods.** Connectors to Shopify, Amazon, and Stripe merchants, with a human-in-the-loop concierge for the long tail.
4. **Open supply.** Sellers list directly and choose their payout rail.

## Revenue

- Referral or routing share from each provider on every order.
- Spread on currency and rail conversion where b.uy is the merchant.
- Per-call or subscription pricing for agent developers and businesses.

## Status

Vision and v1 spec only. No code yet.
