import { create } from 'ipfs-http-client'
import 'dotenv/config'

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const ipfs = create({
  url: "https://ipfs.infura.io:5001",
  headers: {
    authorization: auth
  }
})

// export const createNewForm = async (cid) => {
//   const { name, value } = await ipfs.name.publish(cid);
//   return true;
// }

// return CID aka path
export const addToIpfs = async (payload) => {
  let result = await ipfs.add(JSON.stringify(payload));
  return result.path;
}

export const fetchFromIpfs = async (cid) => {
  const resp = await ipfs.cat(cid);
  let content = [];
  for await (const chunk of resp) {
    content = [...content, ...chunk];
  }
  const raw = Buffer.from(content).toString('utf8');

  // if the response contains json, parse it; otherwise, return the raw string
  return hasJsonStructure(raw) ? JSON.parse(raw) : raw;
}

// helper function to determine if a string returned from ipfs contains json or not
const hasJsonStructure = (str) => {
  if (typeof str !== 'string') return false;
  try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]'
          || type === '[object Array]';
  } catch (err) {
      return false;
  }
};
