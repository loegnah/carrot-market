import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const userData = email ? { email } : phone ? { phone: +phone } : null;
  const payload = Math.floor(100000 + Math.random() * 100000) + "";

  if (!userData) return res.status(400).json({ ok: false });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...userData,
          },
          create: {
            name: "anonymous",
            ...userData,
          },
        },
      },
    },
  });
  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}.`,
  //   });
  //   console.log(message);
  // }
  return res.json({ ok: true });
}

export default withHandler("POST", handler);
