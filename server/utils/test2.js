const ipfsClient = require('ipfs-http-client');
const projectId = '2CMrXu68HMgZmhsnet7Ve76JfOS';
const projectSecret = 'f44e1c49fa7b74be938e9a3bb2aa1e20';

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

client.add('Hello Worldy').then((res) => {
    console.log(res);
});
