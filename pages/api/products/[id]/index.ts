import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Product, User } from "@prisma/client";

interface ProductWithUser extends Product {
  user: User;
}

type ProductDetailResponse = {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isFav: boolean;
};

const findProductById = async (id: number) =>
  client.product.findUnique({
    where: {
      id,
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

const findProducts = async (terms: any) =>
  client.product.findMany({
    where: terms,
  });

const getContainWordTerms = (name: string) =>
  name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

async function ProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const product = await findProductById(+id);
  if (!product) return res.status(404).end();

  const relatedProducts = await findProducts({
    OR: getContainWordTerms(product.name),
    AND: {
      id: {
        not: product.id,
      },
    },
  });

  const isFav = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    product,
    relatedProducts,
    isFav,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler: ProductsHandler })
);

export type { ProductDetailResponse };
