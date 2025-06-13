import app from "../../../index.js";
import supertest from "supertest";

describe("Test uploadImage endpoint", () => {
    it("uploads an image successfully", async () => {
        const response = await supertest(app)
            .post("/api/uploadImage")
            .attach("image", "src/tests/assets/test-image.jpg");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Image uploaded successfully.");
    });

    it("handles missing image file", async () => {
        const response = await supertest(app).post("/api/uploadImage");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No image file uploaded.");
    });

    it("handles unsupported file types", async () => {
        const response = await supertest(app)
            .post("/api/uploadImage")
            .attach("image", "src/tests/assets/test-document.txt");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
            "Unsupported file type. Please upload a valid image.",
        );
    });
});
