import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Prisma } from "@prisma/client";

type ProductsIdResponse = {
  ok: boolean;
  product: Prisma.ProductGetPayload<{
    include: {
      user: true;
    };
  }>;
};

async function ProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
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
  withHandler({ methods: ["GET"], handler: ProductsHandler })
);

export type { ProductsIdResponse };
