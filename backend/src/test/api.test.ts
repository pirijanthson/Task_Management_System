import request from "supertest";
import app from "../app";

describe("Backend API Integration & Unit Tests", () => {
  it("GET /api/tasks should return 401 Unauthorized without auth token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(401);
  });

  it("POST /api/auth/login should return 400 or 401 on empty credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect([400, 401]).toContain(res.status);
  });
});
