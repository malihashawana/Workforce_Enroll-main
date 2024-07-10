import User1 from "../model/company.model.js";
import bcryptjs from "bcryptjs";
export const signup1=async(req,res)=>{
    try{
        const {company_name,company_email,company_address,password }=req.body;
        const user1= await User1.findOne({company_email});
        if(user1){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword= await bcryptjs.hash(password,8)
        const createdUser1=new User1({
            company_name:company_name,
            company_email:company_email,
            company_address:company_address,
            password:hashPassword,
        })
        await createdUser1.save()
        res.status(201).json({message:"User created successfully"})

    }catch(error){
        console.log("Error: " + error.message);
        res.status(500).json({message:"Internal server error"});

    }
};
export const login1=async(req,res)=>{
    try{
        const { company_email, password, company_name } = req.body;

        const user1 = await User1.findOne({ company_email });
        if (!user1) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check if the company names match
        if (user1.company_name !== company_name) {
            return res.status(400).json({ message: "Invalid company name" });
        }

        const isMatch = await bcryptjs.compare(password, user1.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user1: {
                _id: user1._id,
                company_name: user1.company_name,
                company_email: user1.company_email,
            },
        });







        {/*const {company_email,password}=req.body;
        
        const user1=await User1.findOne({company_email});
        const isMatch=await bcryptjs.compare(password,user1.password)
        if(!user1|| !isMatch){
            return res.status(400).json({message:"Invalid email or password"});

        }else{
            res.status(200).json({message:"Login successful",user1:{
                _id:user1._id,
                company_name:user1.company_name,
                company_email:user1.company_email


        }})
        }}*/}
    }catch(error){
        console.log("Error:"+error.message)
        res.status(500).json({message:"Internal server error"});
    }
}