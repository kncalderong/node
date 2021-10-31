/*** this is a promise */

const {readFile,writeFile} = require('fs').promises

/* const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)
 */

//Async await to handle promises
const start = async function(){
    try {
        const first = await readFile('./content/first.txt','utf8')
        const second = await readFile('./content/second.txt','utf8')
        await writeFile("./content/resultAsync",`This is awaesome: ${first} +++ ${second}`,{flag:"a"})
       
    } catch (error) {
        console.log(error);
    }
}
start()



//this is how to make a promise in the standar way
/* const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path,"utf8",(err,data)=>{
            if(err){
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
} */

//this is to handle async traditionally.. without await anything
/* getText('./content/first.txt')
    .then((result)=>console.log(result))
    .catch((error)=>console.log(error)) */

    