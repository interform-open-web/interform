import type { NextApiRequest, NextApiResponse } from "next";
const { fetchFromIpfs } = require('../../../utils/ipfs.ts');

// This handler supports both GET and POST requests.
// GET will return the specified cid.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    // fetch form
    const { query: { formCid } } = req;

    if (!formCid) {
      res.status(400).json({ msg: 'formCid is required' });
      return;
    }

    let content = await fetchFromIpfs(formCid);

    res.status(200).json({
      success: true,
      result: {
        cid: formCid,
        content,
      },
    });
  } else {
    res.status(400).json("Unable to handle request");
  }
}
