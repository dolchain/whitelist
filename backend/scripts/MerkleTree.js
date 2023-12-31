const keccak256 = require("keccak256");
const { default: MerkleTree } = require("merkletreejs");
const fs = require("fs");

const address = [
  "0x7b9f50c80A572b71C0db446Da66C308252eE4b3A",
  "0xC34eDdA53dD4d1B0E68d3c67e34208d5A7Aa3bB2",
  "0x2aF6d4315C9A2B9C6cB8817A20b973FdB014ce4f",
  "0xe1Cc9f7Aa75A9a1c7bF34a03d9dF0964D7Dab14A",
  "0x3d390D327C2d2C63B827CE3A89C0db3f7cD5b13a",
  "0xD5D7Fbfb91e52f11B40d67D5c8Cf876bb23bCC61",
  "0x867f2a103066BD06C6B864CbD0f50F654FfD99C0",
  "0x05662B0408aD0B600DD20Bf7dC6A2EB003e4Dd22",
  "0x1f1206A9e8A59524eBc109654cB58f4C9Ea5C43B",
  "0x4f8459cD0d9F9b8eC4C9f46B1f74E0f0EB72Ff76",
  "0xB7260F52AcB0410C4A3B58D67d411f30c3eA94b5",
  "0x9C7d4aA550Bf186eC17B6Ac12B6E9F95C699b9c5",
  "0xDeF75Eb1174f90FCA70Cb5F624F2Aa913148A0A4",
  "0x68e15F87910Ff93a987450e2926805bc0701e6Ce",
  "0x0aAc07AC2594aDFc5151E255Dad05F9fB6cBBBb8",
  "0x2262aB5e5eAbAa9a0Db597CfBfd4be7e72dF6F0C",
  "0x8B6Fa12677300c677edEAe66a5BAA0f9511AAc0D",
  "0x378A1e9bEcA2e9306A0076b76884F81E3f2f8c56",
  "0x9EcD1E090b3833654e65C63ff3E9E7b7D877edc4",
  "0x81bAC695B4D972DdF570Bc7778EDB8eAEd260f72",
  "0x47039C514D7d06DA97a1B6c61931dAF710Aa50bF",
];

//  Hashing All Leaf Individual
const leaves = address.map((leaf) => keccak256(leaf));

// Constructing Merkle Tree
const tree = new MerkleTree(leaves, keccak256, {
  sortPairs: true,
});

//  Utility Function to Convert From Buffer to Hex
const buf2Hex = (x) => "0x" + x.toString("hex");

// Get Root of Merkle Tree
console.log(`Here is Root Hash: ${buf2Hex(tree.getRoot())}`);

let data = [];

// Pushing all the proof and leaf in data array
address.forEach((address) => {
  const leaf = keccak256(address);

  const proof = tree.getProof(leaf);

  let tempData = [];

  proof.map((x) => tempData.push(buf2Hex(x.data)));

  data.push({
    address: address,
    leaf: buf2Hex(leaf),
    proof: tempData,
  });
});

// Create WhiteList Object to write JSON file

let whiteList = {
  whiteList: data,
};

//  Stringify whiteList object and formating
const metadata = JSON.stringify(whiteList, null, 2);

// Write whiteList.json file in root dir
fs.writeFile(`whiteList.json`, metadata, (err) => {
  if (err) {
    throw err;
  }
});
