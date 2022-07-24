// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { addToIpfs } = require('../../utils/ipfs.ts');

// This handler supports POST requests.
// POST will attempt to create a new ENTRY via IPFS.
// This does not support GET (to fetch all global entries), for privacy considerations.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    console.log('req body', req.body);
    const { formCid, response } = req.body;
    if (!formCid) {
      res.status(400).json({ msg: 'Form CID is required' });
      return;
    }

    // add entry to ipfs
    let entryCid = await addToIpfs({
      formCid,
      response,
    });

    // flexible on the shape of this
    res.status(200).json({
      success: true,
      result: {
        entryCid,
        formCid,
      },
      message: "Entry added successfully",
    });
  } else {
    res.status(400).json("Unable to handle request");
  }
}
