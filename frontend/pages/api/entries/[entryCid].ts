import type { NextApiRequest, NextApiResponse } from "next";
const { fetchFromIpfs } = require('../../../utils/ipfs.ts');

// This handler supports both GET and POST requests.
// GET will return the specified cid.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    // fetch entry
    const { query: { entryCid } } = req;

    if (!entryCid) {
      res.status(400).json({ msg: 'entryCid is required' });
      return;
    }
  
    let content = await fetchFromIpfs(entryCid);
  
    res.status(200).json({
      success: true,
      result: {
        cid: entryCid,
        content,
      },
    });
  } else {
    res.status(400).json("Unable to handle request");
  }
}
