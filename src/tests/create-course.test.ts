import Supertest from "supertest";

import app from "../server.test";
import prisma from "./prisma-test-client";

const request = Supertest(app.server);

describe("Create Course API Test", () => {
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

  it("should create a course successfully", async () => {
    const response = await request.post("/courses").send({
      subject: "ENG",
      courseNumber: "234",
      description: "Introduction to English",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("courseId");
  });

  it("should return error for duplicate course number", async () => {
    await prisma.course.create({
      data: {
        subject: "MAT",
        courseNumber: "045",
        description: "Business Statistics",
      },
    });

    const response = await request.post("/courses").send({
      subject: "GEO",
      courseNumber: "045",
      description: "Business Statistics",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "Duplicated course! It is not allowed to register a new course with this number or subject"
    );
  });

  it("should return error for invalid course number", async () => {
    const response = await request.post("/courses").send({
      subject: "BIO",
      courseNumber: "10",
      description: "Introduction to Biology",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Course Number must be formatted");
  });
});
