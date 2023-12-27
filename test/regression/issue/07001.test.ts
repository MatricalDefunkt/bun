import { test, expect } from "bun:test";

test("req.body.locked is true after body is consumed", async () => {
  const req = new Request("https://example.com/", {
    body: "test",
    method: "POST",
  });

  await new Response(req.body).arrayBuffer();

  expect(req.body.locked).toBe(true);
});

test("await fetch(req) throws if req.body is already consumed (arrayBuffer)", async () => {
  const req = new Request("https://example.com/", {
    body: "test",
    method: "POST",
  });

  await new Response(req.body).arrayBuffer();
  expect(() => fetch(req)).toThrow();
});

test("await fetch(req) throws if req.body is already consumed (text)", async () => {
  const req = new Request("https://example.com/", {
    body: "test",
    method: "POST",
  });

  await new Response(req.body).text();
  expect(() => fetch(req)).toThrow();
});

test.todo("await fetch(req) throws if req.body is already consumed (stream)", async () => {
  const req = new Request("https://example.com/", {
    body: "test",
    method: "POST",
  });

  req.body.getReader();
  expect(() => fetch(req)).toThrow();
});
