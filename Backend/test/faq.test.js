const request = require("supertest");
const app = require("../server");

describe("FAQ API", () => {
  it("should fetch FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.status).toBe(200);
  });
});
