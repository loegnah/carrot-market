import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = email ? { email } : { phone: +phone };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "anonymous",
      ...payload,
    },
    update: {},
  });
  console.log(user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
