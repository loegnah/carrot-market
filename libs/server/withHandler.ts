import type { NextApiRequest, NextApiResponse } from "next";

type ResponseType = {
  ok: boolean;
  [key: string]: any;
};

type WithHandlerParams = {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
};

function withHandler({ method, handler, isPrivate = true }: WithHandlerParams) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
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
