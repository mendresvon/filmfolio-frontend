import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeApiError } from "./apiErrors.js";

test("preserves structured API response errors", () => {
  const body = { msg: "Name is required", errors: [{ path: "name" }] };
  assert.equal(normalizeApiError({ response: { data: body } }), body);
});

test("returns a useful message when the API cannot be reached", () => {
  assert.deepEqual(normalizeApiError(new Error("Network Error")), {
    msg: "Unable to connect to FilmFolio. Check your connection and try again.",
  });
});
