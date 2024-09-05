import Supertest from "supertest";

import app from "../server.test";
import prisma from "./prisma-test-client";

const request = Supertest(app.server);

describe("List Courses API Test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "courses";`;
  });

  it("should list courses with pagination", async () => {
    await prisma.course.createMany({
      data: [
        { subject: "ART", courseNumber: "001", description: "Art course" },
        { subject: "SCI", courseNumber: "002", description: "Science course" },
      ],
    });

    const response = await request.get("/courses?page=1");

    expect(response.status).toBe(200);
    expect(response.body.courses).toHaveLength(2);
    expect(response.body.pagination).toHaveProperty("totalItems");
    expect(response.body.pagination).toHaveProperty("totalPages");
  });

  it("should filter courses by description", async () => {
    await prisma.course.createMany({
      data: [
        {
          subject: "GEO",
          courseNumber: "003",
          description: "Geography course",
        },
        {
          subject: "LIT",
          courseNumber: "004",
          description: "Literature course",
        },
        {
          subject: "BIO",
          courseNumber: "101",
          description: "Introduction to Biology",
        },
      ],
    });

    const response = await request.get("/courses?page=1&description=bio");

    expect(response.status).toBe(200);
    expect(response.body.courses).toHaveLength(1);
    expect(response.body.courses[0].description).toContain("Biology");
  });

  it("should return error for invalid page parameter", async () => {
    const response = await request.get("/courses?page=-1");

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Page must be a positive integer");
  });
});
