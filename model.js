let mongoose=require('mongoose')

const schema = new mongoose.Schema({ name: "string", password: "string" });
 const users = mongoose.model("Users", schema);
 module.exports=users
