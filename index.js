
//note: this code uses a custom noblox version that i modified myself to adapt to roblox's API changes, if noblox retuns error then you need to install my custom noblox version in my github.


const fs = require('fs');
const noblox = require('noblox.js');

//process.env.t are the cookie locations for repl, if your not using that then replace each one with a cookie in parenthises
//like the following : ["token234455", "token5675", "etc.."]
const TOKENS = [process.env.t2, process.env.t3, process.env.t4];

let i = 0;
let roll = TOKENS[i];

let currentAssetId = 34587933;

const getCurrentUser = async () => {
  try {
    const currentUser = await noblox.setCookie(TOKENS[i]);
    i = (i + 1) % TOKENS.length;
    roll = TOKENS[i];
    return currentUser;
  } catch (error) {
    if (error.message.includes('You are not logged in')) {
     // console.log('ratelimit');
    } else {
      throw error;
    }
  }
};


const fetchAndSaveProductInfo = async () => {
  try {
    const productInfo = await noblox.getProductInfo(currentAssetId);
    const finalid = productInfo.Creator.CreatorTargetId;
    console.log(currentAssetId);
    await fs.writeFile('currentasset.json', JSON.stringify(currentAssetId), () => {});
  } catch (error) {
    //console.log("asset lost");
  }
};

setInterval(async () => {
  try {
  const currentUser = await getCurrentUser();
  console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
} catch (error) {}
    
}, 10);

setInterval(async () => {
  await fetchAndSaveProductInfo()
  currentAssetId += 1;
}, 10);
 
//let ownership = await noblox.getOwnership(123456, 234567, "GamePass")
