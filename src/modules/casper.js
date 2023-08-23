import {CEP18Client} from 'casper-cep18-js-client';
import {CLPublicKey, DeployUtil, CasperClient} from "casper-js-sdk";

// const NODE_URL = 'https://casper-node.xyz:7777/rpc';
const NODE_URL = 'http://161.97.166.230:7777/rpc';
const NETWORK_NAME = 'casper';
// const contractHash = 'hash-366519ebaf58c936bc1d6de938c3dc43f0220b327dcf8a69f43bc1703109ce53';
const contractHash = 'hash-1e8c31d7170ed4cf3ef9fb80f5e790bb36d3ed88e0025a7c69ed6613d40b059c';

export const getBalance = async (publicKey) => {
  try {
    const cep18 = new CEP18Client(NODE_URL, NETWORK_NAME);
    const userPublicKey = CLPublicKey.fromHex(publicKey);

    cep18.setContractHash(contractHash);

    const balance = await cep18.balanceOf(userPublicKey);
    const balanceHEX = balance._hex;

    return {
      publicKey: publicKey,
      balance: parseInt(balanceHEX),
    };
  } catch (e) {
    console.log(e);
    return {
      publicKey: publicKey,
      balance: 0,
    };
  }
}

export const transfer = async (sender, recipient, amount) => {
  const cep18 = new CEP18Client(NODE_URL, NETWORK_NAME);
  const casperClient = new CasperClient(NODE_URL);
  const CasperWalletProvider = window.CasperWalletProvider;
  const provider = CasperWalletProvider();

  try {
    const senderPublicKey = CLPublicKey.fromHex(sender.publicKey);
    cep18.setContractHash(contractHash);

    const transferDeploy = cep18.transfer(
        {recipient: CLPublicKey.fromHex(recipient.publicKey), amount: amount * 10000},
        1_000_000_000,
        senderPublicKey,
        NETWORK_NAME,
        []
    );

    const deployJson = DeployUtil.deployToJson(transferDeploy);
    const result = await provider.sign(JSON.stringify(deployJson), sender.publicKey);

    if (result.cancelled) {
      alert('Signature canceled');
      return;
    }
    let signedDeploy = DeployUtil.setSignature(transferDeploy, result.signature, senderPublicKey);
    const signedDeployJson = DeployUtil.deployToJson(signedDeploy);

    signedDeploy = DeployUtil.deployFromJson(signedDeployJson).unwrap();
    const deployHash = signedDeployJson.deploy.hash;

    await casperClient.putDeploy(signedDeploy);
    return {deployHash};
  } catch (e) {
    throw new Error(e);
  }
}
