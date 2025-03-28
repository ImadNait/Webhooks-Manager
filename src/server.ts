import express, { Request, Response } from "express";
import cors from "cors";
require('dotenv').config()
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBH_URL

app.use(cors());
app.use(bodyParser.json());

export async function sendToDiscord(event: any) {
  try {
    if(DISCORD_WEBHOOK){
      const discordMessage = {
          embeds: [
              {
                  title: `New Webhook Event: ${event.type}`,
                  description: `Received an event from Stripe.`,
                  color: 3447003,
                  fields: [
                      { name: "Event Type", value: event.type, inline: true },
                      { name: "Event ID", value: event.id, inline: true },
                      { name: "Timestamp", value: new Date(event.created * 1000).toISOString(), inline: false }
                  ],
              }
          ]
      };

      await axios.post(DISCORD_WEBHOOK, discordMessage);
      console.log("Webhook forwarded to Discord successfully.");
    }
  } catch (error) {
      console.error("Failed to send webhook to Discord:", error);
  }
}



app.post("/webhook", async (req: Request, res: Response) => {
  console.log("Webhook received:", req.body);

  try {
    await axios.post(`${process.env.Nest_API}`, { data: req.body });
    console.log("Webhook's been sent to Nest server"); 
  } catch (error) {
    console.error("Error forwarding webhook:", error);
  }

  res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Webhook receiver running on port ${PORT}`));