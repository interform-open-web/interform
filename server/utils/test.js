import * as IPFS from 'ipfs-core';

async function main() {
  const node = await IPFS.create();
  const version = await node.version();

  console.log("Version:", version.version);

  const fileAdded = await node.add({
    path: "hello.txt",
    content: "Hello World 101",
  });

  console.log("Added file:", fileAdded.path, fileAdded.cid);
  // ...
}

await main();
