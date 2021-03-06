import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler: postsHandler,
  })
);

async function postsHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") return handlePost(req, res);
  if (req.method === "GET") return handleGet(req, res);
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question, longitude, latitude },
    session: { user },
  } = req;
  const post = await client.post.create({
    data: {
      question,
      longitude,
      latitude,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { longitude, latitude },
  } = req;
  const parsedLatitude = parseFloat(latitude.toString());
  const parsedLongitude = parseFloat(longitude.toString());

  const posts = await client.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          wondering: true,
          answers: true,
        },
      },
    },
    where: {
      latitude: {
        gte: parsedLatitude - 0.01,
        lte: parsedLatitude + 0.01,
      },
      longitude: {
        gte: parsedLongitude - 0.01,
        lte: parsedLongitude + 0.01,
      },
    },
  });
  res.json({
    ok: true,
    posts,
  });
}
