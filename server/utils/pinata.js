require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

// return schema:
// {
//   IpfsHash: 'QmNrEidQrAbxx3FzxNt9E6qjEDZrtvzxUVh47BXm55Zuen',
//   PinSize: 25,
//   Timestamp: '2022-07-25T11:10:23.577Z'
// }
const addToPinata = async (payload) => {
  const { address, formCid, type, } = payload;
  const options = {
      pinataMetadata: {
          name: 'Interform',
          keyvalues: {
              address: address || '',
              formCid: formCid || '',
              type: type || '',
          }
      },
      pinataOptions: {
          cidVersion: 0
      }
  };

  pinata.pinJSONToIPFS(payload, options).then((result) => {
      //handle results here
      console.log(result);
      return result;
  }).catch((err) => {
      //handle error here
      console.log(err);
      return err;
  });
}

const fetchAllPinsByAddress = async(address) => {
  const filters = {
    metadata: {
      name: 'Interform',
      keyvalues: {
        address: {
          value: address,
          op: 'iLike',
        },
      }
    }
  }

  return await pinata.pinList(filters).then((result) => {
    console.log(result);
    return result;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}

const fetchTypeByAddress = async(type, address) => {
  if (!type) {
    return new Error('Invalid type', type);
  }

  const filters = {
    metadata: {
      name: 'Interform',
      keyvalues: {
        address: {
          value: address,
          op: 'iLike',
        },
        type: {
          value: type,
          op: 'iLike',
        }
      }
    }
  }

  return await pinata.pinList(filters).then((result) => {
    console.log(result);
    return result;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}

const fetchEntriesByFormCid = async(formCid) => {
  if (!formCid) {
    return new Error('Invalid formCid', formCid);
  }

  const filters = {
    metadata: {
      name: 'Interform',
      keyvalues: {
        formCid: {
          value: formCid,
          op: 'iLike',
        }
      }
    }
  }

  return await pinata.pinList(filters).then((result) => {
    console.log(result);
    return result;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}

module.exports = {
  addToPinata,
  fetchAllPinsByAddress,
  fetchTypeByAddress,
  fetchEntriesByFormCid,
}
