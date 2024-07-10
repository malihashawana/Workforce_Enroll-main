import mongoose from "mongoose";
const adminSchema= new mongoose.Schema({
    admin_name:{
        type:String,
        required:true
    },
    admin_email:{
        type:String,
        required:true,
        unique:true

},
    password:{
        type:String,
        required:true
    },
    
})
const Admin=mongoose.model("Admin",adminSchema);
export default Admin;