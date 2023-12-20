# Offers Actions
This contract encompasses actions related to offers, which allow users to exchange resources and earn rewards.

### `offer.add`
This action registers an offer claimable by eligible accounts. Requires contract authority.

**Input Parameters:**

```ts
requirements: OfferRequirements,
actions: OfferAction,
rewards: OfferRewards,
limits: OfferLimits
```

Details on the input parameters are specified on the [Offers Table](../tables/offers) page.

**Authentication:**
Requires contract authority, typically invoked by inline actions

**Validation:**

- NFT actions with `burn` set to true must not have `lock_rounds` greater than zero.
- `activate_booster_ids` included in rewards must correspond to valid booster IDs.
- `available_until_round` within limits must be set for a future round.
- `offer_quantity_remaining` within limits must be greater than zero.
- If `team_id` is specified in requirements, validate each specified team.

**Table Updates:**
A new entry is added to the `offers` table with the provided offer data.

---

### `offer.claim`
Allows an account to claim benefits from an active offer.

**Input Parameters:**

```ts
boid_id: Name, // Account claiming the offer
offer_id: u64, // ID of the offer from the offers table
required_nft_action_ids: u64[] // Asset IDs for any required NFT actions
```

**Authentication:**
Authenticated as `boid_id`

**Validation:**

- Validates sufficient offer quantity is remaining.
- Ensures the offer is not expired by round.
- Minimum balance requirements are met.
- Minimum team contribution level is satisfied.
- Power ratings are above required thresholds.
- Total staked amount meets or exceeds requirement.
- Team membership is eligible if necessary.

**Table Updates:**

- Depending on the offer, related tables may be updated.
- Decreases `offer_quantity_remaining`.
- Increments `offer.total_claimed`.

**Inline Actions:**
Trigger actions such as additional account stake, transfers, and possibly boosts based on the offer details.

---

### `offer.rm`
Removes an offer from the system. Requires contract authority.

**Input Parameters:**

```ts
offer_id: u64 // ID of the offer to remove
```

**Authentication:**
Requires contract authority

**Validation:**

- Validates the existence of the offer before removal.

**Table Updates:**

- Removes the specified offer from the `offers` table.

---

### `offers.clean`
Batch removal of offers. Intended to clear expired or invalid offers from the system. Requires contract authority.

**Input Parameters:**
None

**Authentication:**
Requires contract authority

**Validation:**

- Batch process, might be subject to transaction resource limits.

**Table Updates:**

- Non-specific, may iterate and remove offers up to a specified system limit.

