import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      name: "loegnah2",
      email: "loegnah2@gmail.com",
    },
  });

  res.json({
    ok: true,
    data: "test data",
  });
}
