// 利用Wallet类发送ETH
// 由于playcode不支持ethers.Wallet.createRandom()函数，我们只能用VScode运行这一讲代码
import { ethers } from "ethers";

// 准备Infura API Key, 教程：https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL02_Infura/readme.md
const INFURA_ID = 'ecd4ee24d7104f029b1339a2b543d082'
// 连接rinkeby测试网
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic // 获取助记词

const privateKey = ''
const wallet2 = new ethers.Wallet(privateKey, provider)

const wallet3 = ethers.Wallet.fromMnemonic(mnemonic.phrase)

const address1 = await wallet1.getAddress()
const address2 = await wallet2.getAddress() 
const address3 = await wallet3.getAddress() // 获取地址
console.log(`1. 获取钱包地址`);
console.log(`钱包1地址: ${address1}`);
console.log(`钱包2地址: ${address2}`);
console.log(`钱包3地址: ${address3}`);
console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);


console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`)

console.log(`钱包2私钥: ${wallet2.privateKey}`)

const txCount1 = await wallet1WithProvider.getTransactionCount()
const txCount2 = await wallet2.getTransactionCount()
console.log(`钱包1发送交易次数: ${txCount1}`)
console.log(`钱包2发送交易次数: ${txCount2}`)

const main = async() => {
        // 5. 发送ETH
    // 如果这个钱包没rinkeby测试网ETH了，去水龙头领一些，钱包地址: 0xe16C1623c1AA7D919cd2241d8b36d9E79C1Be2A2
    // 1. chainlink水龙头: https://faucets.chain.link/rinkeby
    // 2. paradigm水龙头: https://faucet.paradigm.xyz/
    console.log(`\n5. 发送ETH（测试网）`);
    // i. 打印交易前余额
    console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
    console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: address1,
        value: ethers.utils.parseEther("0.001")
    }
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
    console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
}

main()
