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

// const formCache = new Cache(); // formAddr -> formData

app.get('/api/', async (_, res) => {
  res.send('Hello Interform!');
})

/******* FORM-RELATED ROUTES ********/

// create a new form
app.post('/api/form', async (req, res) => {
  console.log('req body', req.body);
  const { name, timestamp, formOptions } = req.body;

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

  res.status(200).json({
    success: true,
    result: {
      cid: formCid,
    },
  })
})

app.get('/api/form/:cid', async (req, res) => {
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

/******* ENTRY-RELATED ROUTES ********/

app.post('/api/entry', async (req, res) => {
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
})

app.get('/api/entry/:cid', async (req, res) => {
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

/* ------------ CONFIGS --------------- */
// for vercel deployment
module.exports = app;

// for local testing
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Interform listening on port ${PORT}`)
})
