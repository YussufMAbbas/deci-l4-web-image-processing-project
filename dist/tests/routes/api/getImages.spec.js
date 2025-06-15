import app from "../../../index.js";
import supertest from "supertest";
describe("Test getImages endpoint", () => {
    it("returns a list of images", async () => {
        const response = await supertest(app).get("/api/getImages");
        expect(response.status).toBe(200);
        expect(response.body.images).toBeDefined();
        expect(Array.isArray(response.body.images)).toBe(true);
        expect(response.body.images.length).toBeGreaterThan(0);
    });
});
