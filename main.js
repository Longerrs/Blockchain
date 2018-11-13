// Start by defining what a block looks like
// 1. The index is optional, where does the block sit on the chain 
// 2. The timestamp, when was the block created 
// 3. The data, any data you want to associate, how much money, sender and reciever
// 4. The previous hash of the block that came before

const SHA256 = require('crypto-js/sha256');

//Setup the block and calculating the hash using crypto-js
class Block{
  constructor(index, timestamp, data, previousHash = '' ){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    //This will be the hash of the new block being created and calculated in another function
    this.hash = this.calculateHash();
  }

calculateHash(){
  return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}




//The blockchain
class Blockchain{
  constructor(){
    this.chain =[this.createGenesisBlock()];
  }
  createGenesisBlock(){
    return new Block(0, "12/11/2018", "Genesis Block", "0");
  }
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  //Add a new block to the chain
  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);

  }

  //Validity checks on the bluecoin blockchain
  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      if(currentBlock.hash !== currentBlock.calculateHash()){
         return false;
      }
  
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
      
    }
      return true;
}

}


//Create the blockchain
let blueCoin = new Blockchain();
blueCoin.addBlock(new Block(1,"10/11/2018", {amount: 4}));
blueCoin.addBlock(new Block(2,"11/11/2018", {amount: 10}));


//Print the blockchain
console.log(JSON.stringify(blueCoin, null, 4));


//Check the blockchain is valid (At this point is)
console.log('Is chain valid? ' + blueCoin.isChainValid()); 


//Try and make yourself rich
//Modify the block...
blueCoin.chain[1].data = { amount: 100 };
//Recalculate the hash
blueCoin.chain[1].hash = blueCoin.chain[1].calculateHash(); 
//Revalidate
console.log('Is chain valid? ' + blueCoin.isChainValid()+ ', This is because the blockchain now looks like this' + JSON.stringify(blueCoin,null,4));
