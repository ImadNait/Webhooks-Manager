import express, { Request, Response } from "express";
import cors from "cors";
require('dotenv').config()
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
  console.log("Webhook received:", req.body);

  try {
    await axios.post(`${process.env.Nest_API}`, { data: req.body });
  } catch (error) {
    console.error("Error forwarding webhook:", error);
  }

  res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Webhook receiver running on port ${PORT}`));
