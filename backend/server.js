import express from "express"
import dotenv from "dotenv"
import connectionDb from "./connection/db.connect.js"
import router from "./routes/userRouter.js"
import fileUpload from "express-fileupload"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
connectionDb()
app.use(express.json())
app.use(fileUpload())
app.use('/', express.static(path.join(__dirname, 'public')));

app.use("/user", router)
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})



