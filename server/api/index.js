const express = require('express')
const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Interform listening on port ${port}`)
})