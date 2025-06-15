import processImage from "../../utilities/processImage.js";

describe("processImage", () => {
    it("should process the image with given width and height", async () => {
        const imagePath = "src/tests/assets/test-image.jpg";
        const width = 100;
        const height = 100;
        const outputPath = "src/tests/assets/output-image.jpg";

        expect(async () => {
            await processImage(imagePath, width, height, outputPath);
        }).not.toThrow();
    });
});
