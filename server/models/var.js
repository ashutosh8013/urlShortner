const mongoose=require('mongoose');
const {Schema}=mongoose
const variable=new Schema({
    name:String,
    value:Number
})
const UserModel=mongoose.model('variable',variable);
module.exports=UserModel;