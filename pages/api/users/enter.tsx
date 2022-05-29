import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const userData = email ? { email } : phone ? { phone: +phone } : null;

  if (!userData) return res.status(400).json({ ok: false });

  const token = await client.token.create({
    data: {
      payload: Math.floor(100000 + Math.random() * 100000) + "",
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
  console.log(token);
  return res.json({ ok: true });
}

export default withHandler("POST", handler);
