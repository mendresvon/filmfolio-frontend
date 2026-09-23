import { test } from "node:test";
import assert from "node:assert/strict";
import apiClient from "./apiClient.js";
import { searchMovies } from "./watchlistService.js";

test("search sends the query as an Axios parameter and forwards cancellation", async () => {
  const originalGet = apiClient.get;
  const controller = new AbortController();
  let captured;
  apiClient.get = async (...args) => {
    captured = args;
    return { data: [{ id: 1, title: "A & B" }] };
  };

  try {
    const result = await searchMovies("A & B#cut", { signal: controller.signal });
    assert.deepEqual(result, [{ id: 1, title: "A & B" }]);
    assert.equal(captured[0], "/movies/search");
    assert.deepEqual(captured[1].params, { query: "A & B#cut" });
    assert.equal(captured[1].signal, controller.signal);
  } finally {
    apiClient.get = originalGet;
  }
});
