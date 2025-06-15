import express from "express";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../images")));

app.use("/api", router);

app.use("/", express.static("public"));

app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}.`);
});

export default app;
