import Supertest from "supertest";

import app from "../server";
import prisma from "./prisma-test-client";

const request = Supertest(app.server);

describe("Delete Course API Test", () => {
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

  it("should delete a course successfully", async () => {
    const course = await prisma.course.create({
      data: {
        subject: "HIS",
        courseNumber: "103",
        description: "Introduction to History",
      },
    });

    const response = await request.delete(`/courses/${course.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Course successfully deleted");
  });

  it("should return error for non-existent course", async () => {
    const response = await request.delete("/courses/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Course not found with this id");
  });
});
