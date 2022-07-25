require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use((_, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  next();
})

const { addToIpfs, fetchFromIpfs } = require('../utils/ipfs.js');
const { addToPinata, fetchAllPinsByAddress, fetchTypeByAddress, fetchEntriesByFormCid } = require('../utils/pinata.js');

// const formCache = new Cache(); // formAddr -> formData

app.get('/api/', async (_, res) => {
  res.send('Hello Interform!');
})

/******* FORM-RELATED ROUTES ********/

// create a new form
app.post('/api/forms', async (req, res) => {
  console.log('req body', req.body);
  const { name, timestamp, formOptions, address } = req.body;

  // can do some validation here, but otherwise proceed to saving to ipfs

  if (!name || !formOptions) {
    console.log('name', name, 'formoptions', formOptions);
    res.status(400).json({ msg: 'Invalid form' });
    return;
  }

  // add entry to ipfs
  let formCid = await addToIpfs({
    name,
    timestamp: timestamp || Date.now(),
    formOptions,
  });

  // also add to pinata :D
  let pinataResult = await addToPinata({
    address,
    type: 'form',
    name,
    timestamp: timestamp || Date.now(),
    formOptions,
  });

  console.log('formCid', formCid);
  console.log('pinataResult', pinataResult);

  res.status(200).json({
    success: true,
    result: {
      cid: formCid,
    },
  })
})

// get specific form by cid
app.get('/api/forms/cid/:cid', async (req, res) => {
  const { params: { cid } } = req;

  if (!cid) {
    res.status(400).json({ msg: 'Cid is required' });
    return;
  }

  let content = await fetchFromIpfs(cid);

  res.status(200).json({
    success: true,
    result: {
      cid,
      content,
    },
  });
})

// get all forms created by address
app.get('/api/forms/address/:address', async (req, res) => {
  const { params: { address } } = req;

  if (!address) {
    res.status(400).json({ msg: 'address is required' });
    return;
  }

  let pins = await fetchTypeByAddress('form', address);
  let results = await Promise.all(pins.rows.map((value, _) => {
    return new Promise(async(resolve, _) => {
      let content = await fetchFromIpfs(value.ipfs_pin_hash);
      console.log('found forms', content);
      resolve(content);
    });
  }));

  res.status(200).json({
    success: true,
    address,
    result: results,
  });
})

/******* ENTRY-RELATED ROUTES ********/

// create new entry
app.post('/api/entries', async (req, res) => {
  const { name, formCid, response, address, timestamp } = req.body;
  if (!formCid) {
    res.status(400).json({ msg: 'Form CID is required' });
    return;
  }

  // add entry to ipfs
  let entryCid = await addToIpfs({
    name,
    formCid,
    address,
    response,
  });

  // also add to pinata :D
  let pinataResult = await addToPinata({
    name,
    formCid,
    address,
    response,
    type: 'entry',
    timestamp: timestamp || Date.now(),
  });

  console.log('entryCid', entryCid);
  console.log('pinataResult', pinataResult);

  // flexible on the shape of this
  res.status(200).json({
    success: true,
    result: {
      entryCid,
      formCid,
    },
    message: "Entry added successfully",
  });
})

// get specific entry by cid
app.get('/api/entries/cid/:cid', async (req, res) => {
  const { params: { cid } } = req;

  if (!cid) {
    res.status(400).json({ msg: 'cid is required' });
    return;
  }

  let content = await fetchFromIpfs(cid);

  res.status(200).json({
    success: true,
    result: {
      cid,
      content,
    },
  });
})

// get all entries created by address
app.get('/api/entries/address/:address', async (req, res) => {
  const { params: { address } } = req;

  if (!address) {
    res.status(400).json({ msg: 'address is required' });
    return;
  }

  let pins = await fetchTypeByAddress('entry', address);
  let results = await Promise.all(pins.rows.map((value, _) => {
    return new Promise(async(resolve, _) => {
      let content = await fetchFromIpfs(value.ipfs_pin_hash);
      resolve(content);
    });
  }));

  res.status(200).json({
    success: true,
    address,
    result: results,
  });
})

// get all entries related to form
app.get('/api/entries/form/:formCid', async (req, res) => {
  const { params: { formCid } } = req;

  if (!formCid) {
    res.status(400).json({ msg: 'formCid is required' });
    return;
  }

  let pins = await fetchEntriesByFormCid(formCid);
  let results = await Promise.all(pins.rows.map((value, _) => {
    return new Promise(async(resolve, _) => {
      let content = await fetchFromIpfs(value.ipfs_pin_hash);
      console.log('found entries', content);
      resolve(content);
    });
  }));

  res.status(200).json({
    success: true,
    formCid,
    result: results,
  });
})

/* ------------ CONFIGS --------------- */
// for vercel deployment
module.exports = app;

// for local testing
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Interform listening on port ${PORT}`)
})
