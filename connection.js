
let mongoose=require('mongoose')


module.exports.connection=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
           await mongoose.connect('mongodb://localhost:27017/serverless')
           console.log("no error");
           resolve({status:true})
        } catch (error) {
            console.log("error==========================");
            console.log(error);
            resolve({status:false})
        }
    })
}