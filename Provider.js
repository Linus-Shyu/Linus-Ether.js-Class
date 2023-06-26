import { ethers } from "ethers";

//封装
const API = 'b07254c2a21e46de96c53f5fa3e062c8';
const ETH = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API}`);


//读取钱包余额
console.log("读取V神在以太坊主网上的余额");
const balance = await ETH.getBalance(`Vitalik.eth`);
console.log(`V神的钱包余额为:${ethers.utils.formatEther(balance)} ETH`);


//读取链上数据

const Network_information = await ETH.getNetwork();
console.log(Network_information);

//读取区块高度

const chain_number = await ETH.getBlockNumber();
console.log(chain_number);