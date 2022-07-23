const express = require('express')
const app = express()
const port = 3000

const Cache = require('../cache');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const formCache = new Cache(); // formAddr -> formData

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.post('/createForm', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { formName } = req.body;

  if (!formName) {
    res.status(400).json({ msg: 'formName is required' });
    return;
  }
  res.send('Hello World!')
})


app.get('/:addr', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { params: { addr } } = req;
  const { formEntry } = req.body;

  if (!addr) {
    res.status(400).json({ msg: 'addr is required' });
    return;
  }

  if (!formEntry) {
    res.status(400).json({ msg: 'formEntry is required in the body' });
    return;
  }
})

app.post('/addEntry/:addr', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { params: { addr } } = req;
  if (!addr) {
    res.status(400).json({ msg: 'addr is required' });
    return;
  }

  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Interform listening on port ${port}`)
})