// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { addToIpfs } = require('../../utils/ipfs.ts');

// This handler supports both GET and POST requests.
// TODO: GET will return all forms.
// POST will attempt to create a new FORM via IPFS.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    console.log('req body', req.body);
    const { name, timestamp, formOptions } = req.body;

    // can do some validation here, but otherwise proceed to saving to ipfs

    if (!name || !formOptions) {
      console.log('name', name, 'formoptions', formOptions);
      res.status(400).json({ msg: 'Invalid form' });
      return;
    }

    // add form to ipfs
    let formCid = await addToIpfs({
      name,
      timestamp: timestamp || Date.now(),
      formOptions,
    });

    res.status(200).json({
      success: true,
      result: {
        cid: formCid,
      },
      message: "Form added successfully",
    })
  } else {
    res.status(400).json("Unable to handle request");
  }
}
