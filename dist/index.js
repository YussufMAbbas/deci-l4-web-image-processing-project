import express from "express";
import router from "./routes/index.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}.`);
});
export default app;
