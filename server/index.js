import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";

// Queue setup
const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  return res.json({ status: "All Good!" });
});

// Upload PDF endpoint
app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  try {
    await queue.add("file-ready", {
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    });

    return res.json({ message: "Uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(8000, () => {
  console.log("Server started on PORT: 8000");
});
