import { create } from 'ipfs-http-client'

// TODO: figure out auth
// const ipfs = create({
//   headers: {
//     authorization: 'Bearer ' + TOKEN
//   }
// })

const ipfs = create()

const createNewForm = () => {
  ipfs.name.publish()
}

module.exports = {
  createNewForm
}