import app from "../../../index.js";
import supertest from "supertest";

describe("Test resizeImage endpoint", () => {
    it("sends an image buffer", async () => {
        const response = await supertest(app).post("/api/resizeImage").send({
            imageName: "image-5.jpg",
            width: 200,
            height: 200,
        });
        expect(response.body).toBeInstanceOf(Buffer);
    });
    it("handles missing fields", async () => {
        const response = await supertest(app).post("/api/resizeImage").send({
            imageName: "image-1.jpg",
            width: 200,
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Missing or invalid required fields.");
    });
    it("handles not found images", async () => {
        const response = await supertest(app).post("/api/resizeImage").send({
            imageName: "invalid-image.jpg",
            width: 200,
            height: 200,
        });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Image not found.");
    });
});
