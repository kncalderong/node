/****** Sync file system ***** */
const {readFileSync, writeFileSync} = require('fs');
const {readFile, writeFile } = require('fs'); // sync
const { cpSync } = require('node:fs');

//read
const first =  readFileSync('./content/first.txt','utf8');
const second = readFileSync('./content/second.txt','utf8');
console.log("start sync task")

//write ... will create a new one if it doesn't exist,  or it will overwrite the existing one
writeFileSync(
    './content/result-sync.txt',
    `the result is: ${first}, ${second}`,
    {flag:'a'} // the third parameter allows us to append, instead overwrite (default)
)
console.log("done with this task sync")
console.log("start of new task sync")

//* Async file system */
// it handle a callback function
console.log("start async")
readFile('./content/first.txt','utf8' ,(err,result)=>{
    if(err){
        console.log(err);
        return;
    }
    const first = result;

    readFile('./content/second.txt','utf8' ,(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        const second = result;
        
        writeFile('./content/result-async.txt',`the result is: ${first}, ${second}` ,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("done with async task")
        })
    })
})

console.log("starting new async task")
