# Interform

Forms on the decentralized web. Powered by InterPlanetary File System and Filecoin.

InterForm is the web3 native form builder platform powered by Filecoin. It is the decentralized, censorship-resistant way to collect data. Think Google Forms or Airtable but on decentralized storage. It is web3 native by default - users may sign in with Ethereum to access gated forms. User data is never stored without consent. Interform is the bridge between centralized and decentralized data collection.
It is a browser-based interface for quick and easy form submissions and building. Whether you need to collect data on an existing website or build a bespoke form for a website, InterForm will provide your users with the tools to interact with you in a completely censorship-resistant way. If the web2 DNS of the interform.app is banned or censored, form collectors can still self-host the forms using our open source code base and serve the IPFS files from anywhere in the world.


Collecting data for an activism DAO, or creating a confessions page to expose toxic practices in your organization? Not to mention the many countries and regions where Google, the main form collection tool, is restricted. Interform is an inclusive way to survey individuals while maintaining the right to privacy and a censorship-free web. Our mission is to democratize access to data and contribute to a censorship-free world.


By having users opt-in to share wallet data, we embrace on-chain identity. Gone are the days of sharing your emails when submitting forms. Form creators can opt-in on whether to collect user addresses, and users can opt out of sharing addresses. If addresses are shared, a world of on-chain analytics and user research can be explored opening Interform up to unique product and user research use cases.
We created a drag-and-drop interface to create custom forms and forms can be embedded anywhere you like. The backend is powered by IPFS - we have upload and pin functionality integrated with the app. We used the IPFS Javascript SDK to pin documents and IPNS (InterPlanetary Naming System) to reroute the form addresses as the form collected data.

Fleek Deploy [interform.on.fleek.co](https://interform.on.fleek.co/)


## Get Started
**For Frontend**
```bash
  yarn install
  yarn dev
```
Built with Next.js + Chakra

**For Server**
```bash
  yarn install
  yarn start
```
Built with Express.js
Full API docs [here](/server/)

## License
[MIT License](LICENSE)
