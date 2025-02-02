const request = require("supertest");
const app = require("../index");
const FAQ = require("../models/faqModel");
const { createClient } = require("redis");

// ✅ Initialize Redis client properly
const redis = createClient();

before(async () => {
  await redis.connect(); // ✅ Connect Redis before all tests
});

// Mock FAQ Data
const mockFaq = {
  question: "What is Redis?",
  answer: "Redis is an in-memory data structure store.",
};

// ✅ Clear database and Redis cache before each test
beforeEach(async () => {
  await FAQ.deleteMany({});
  await redis.sendCommand(["FLUSHALL"]); // ✅ Correct Redis flush
});

// ✅ Cleanup after all tests
after(async () => {
  await redis.quit(); // ✅ Close Redis connection properly
});

describe("FAQ API", () => {
  it("should fetch FAQs (empty initially)", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  it("should create a new FAQ", async () => {
    const res = await request(app).post("/api/faqs").send(mockFaq);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    expect(res.body.question).to.equal(mockFaq.question);
  });

  it("should fetch FAQs from the database", async () => {
    await FAQ.create(mockFaq);
    const res = await request(app).get("/api/faqs");
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].question).to.equal(mockFaq.question);
  });

  it("should cache FAQs in Redis", async () => {
    await FAQ.create(mockFaq);
    await request(app).get("/api/faqs"); // First request to populate cache
    const cachedFaqs = await redis.get("faqs_en");
    expect(JSON.parse(cachedFaqs).length).to.equal(1);
  });

  it("should fetch a single FAQ by ID", async () => {
    const createdFaq = await FAQ.create(mockFaq);
    const res = await request(app).get(`/api/faqs/${createdFaq._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.question).to.equal(mockFaq.question);
  });

  it("should return 404 for non-existent FAQ", async () => {
    const res = await request(app).get("/api/faqs/123456789012345678901234");
    expect(res.status).to.equal(404);
  });

  it("should update an existing FAQ", async () => {
    const createdFaq = await FAQ.create(mockFaq);
    const updatedData = {
      question: "What is Docker?",
      answer: "Docker is a containerization platform.",
    };
    const res = await request(app)
      .put(`/api/faqs/${createdFaq._id}`)
      .send(updatedData);
    expect(res.status).to.equal(200);
    expect(res.body.question).to.equal(updatedData.question);
  });

  it("should delete an FAQ", async () => {
    const createdFaq = await FAQ.create(mockFaq);
    const res = await request(app).delete(`/api/faqs/${createdFaq._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("FAQ deleted successfully");
  });

  it("should return 404 when deleting a non-existent FAQ", async () => {
    const res = await request(app).delete("/api/faqs/123456789012345678901234");
    expect(res.status).to.equal(404);
  });
});
