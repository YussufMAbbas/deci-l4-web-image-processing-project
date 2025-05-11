import app from "../../index.js";
import supertest from "supertest";

describe("Test main endpoint", () => {
    it("gets the main endpoint", async () => {
        const response = await supertest(app).get("/api/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Connected to main router.");
    });
});
