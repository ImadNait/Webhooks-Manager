import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
  console.log("Webhook received:", req.body);

  try {
    await axios.post("http://localhost:5000/webhook/logs", { data: req.body });
  } catch (error) {
    console.error("Error forwarding webhook:", error);
  }

  res.status(200).json({ success: true });
});

app.listen(4000, () => console.log("Webhook receiver running on port 4000"));
