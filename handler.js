const { create, jsonMiddleware } = require("slspress");
const serverless = require("serverless-http");
const express = require("express")
// const objectId=require('mongodb').ObjectId
const bodyParser = require('body-parser');
const app = express();
const AWS = require('aws-sdk');
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
//  const handler = create();

// handler.on('helloWorld')
//     .middleware(jsonMiddleware)
//     .get('/hello-world', (req, res) => {
//         return res.ok('Hello-World!');
//     });

// handler.on('test')
//     .middleware(jsonMiddleware)
//     .get('/test', (req, res) => {
//         return res.ok('this is test');
//     });
// module.exports = handler.export();

let connect = require("./connection");
let users = require("./model");
const { ObjectId } = require("mongodb");

// module.exports.helloWorld = async (event, context) => {
//   let { status } = await connect.connection();
//   if (status) {
//     await users.create({ name: "Alen", password: "password" });
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ name: "Alen" }),
//     };
//   } else {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ name: "Alen" }),
//     };
//   }
// };
app.use(cors());
app.use(compression());
app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/createUser",async (req, res, next) => {
  console.log(req.body);
  let {status}=await connect.connection()
    if(status){
       await users.create(req.body)
       return res.status(200).json({
        message: "created",
      });
    }else{
        return res.status(500).json({
            message:"something wrong"
        })
    }

});
app.delete("/deleteUser/:id",async (req, res, next) => {
    let {status}=await connect.connection()
    if(status){
       await users.deleteOne({_id:new ObjectId(req.params.id)})
       return res.status(200).json({
        message: "deleted",
      });
    }else{
        return res.status(500).json({
            message:"something wrong"
        })
    }
});
app.get("/getUser/:id",async (req, res, next) => {
    let {status}=await connect.connection()
    if(status){
        console.log(req.params.id);
        // const ObjectId=new objectId(req.params.id)
      let user= await users.findOne({_id:new ObjectId(req.params.id)})
      console.log(user);
       return res.status(200).json(user);
    }else{
        return res.status(500).json({
            message:"something wrong"
        })
    }
});


app.patch("/updateUser/:id",async (req, res, next) => {
    let {status}=await connect.connection()
    if(status){
       await users.updateOne({_id:new ObjectId(req.params.id)},{name:req.body.name,password:req.body.password})
       return res.status(200).json({
        message: "updated",
      });
    }else{
        return res.status(500).json({
            message:"something wrong"
        })
    }
});
module.exports.handler = serverless(app);