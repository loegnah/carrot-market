import type { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "DELETE";

type ResponseType = {
  ok: boolean;
  [key: string]: any;
};

type WithHandlerParams = {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
};

function withHandler({
  methods,
  handler,
  isPrivate = true,
}: WithHandlerParams) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

export default withHandler;
export type { ResponseType };
