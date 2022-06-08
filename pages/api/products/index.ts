import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";

async function ProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, price, description } = req.body;
  const { user } = req.session;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "abc",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({ method: "POST", handler: ProductsHandler })
);
