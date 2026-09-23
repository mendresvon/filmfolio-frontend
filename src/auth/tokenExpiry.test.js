import { test } from "node:test";
import assert from "node:assert/strict";
import { getTokenExpirationTime } from "./tokenExpiry.js";

const tokenWithPayload = (payload) =>
  `header.${btoa(JSON.stringify(payload)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}.signature`;

test("converts a JWT exp claim from seconds to milliseconds", () => {
  assert.equal(getTokenExpirationTime(tokenWithPayload({ exp: 1234 })), 1_234_000);
});

test("rejects tokens without a finite expiration claim", () => {
  assert.equal(getTokenExpirationTime(tokenWithPayload({ user: { id: "u1" } })), null);
});
