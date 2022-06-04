import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import type { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const existToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  console.log(existToken);
  if (!existToken) res.status(404).end();

  req.session.user = {
    id: existToken!.userId,
  };
  await req.session.save();

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "9759827459254702345972342342342342341111128458",
});
