const arr = [];
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = "shivampatil";
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    const details = req.body;
    const user = arr.find((items)=>{               // will get individual array items 
        return details.email === items.email       // will give a boolean value & we use this to check if the email user is entering is present in the details or not
    })
    if(user){
        return res.status(200).send({message:"User already registered,Please try to login!!"})
    }
    
    const hashedPassword = await bcrypt.hash(details.password,saltRounds)

    const obj ={
        name : details.name,
        phone : details.phone,
        email : details.email,
        password : hashedPassword
    }
    arr.push(obj);
    console.log(arr)
    res.send(arr)
}

const login = async (req,res) =>{
    const details = req.body;
    const user = arr.find((items)=>{
        if(details.email === items.email){
            return items
        }
        else{
            return res.send({message:"User is not registered,Register first!!"})
        }
    })
    const checkUser = await bcrypt.compare(details.password,user.password)
    if(checkUser){
        const token = await jwt.sign(user.email,secretKey)
        return res.send({token : token , message:"User logged in successfully!!"})
    }
    // return res.send({message : "Password does not match,Try entering the correct password!!"})
}

module.exports = {register,login}

// const userData=[];
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const secretKey="shivampatil";
// const saltRound=10;

// const register=(req, res)=>{
//     const newUser=req.body;
//     const oldUser=userData.find((info)=>{
//         return newUser.email === info.email
//     })
//     if (oldUser){
//         return res.status(200).send({message:"User already existed. Please try to LogIn !"})
//     }
//     const hashedpassword=bcrypt.hashSync(newUser.password, saltRound);
//     const userCredinals={
//         name:newUser.name,
//         phone:newUser.phone,
//         email:newUser.email,
//         password:hashedpassword
//     }
//     userData.push(userCredinals);
//     res.status(200).send({message:"New user Registered Successfully !"})
// }
// const login= (req, res)=>{
//     const loginData=req.body;
//     const storedData=userData.find((items)=>{
//         if(loginData.email === items.email){
//             return items
//         }
//         else{
//             return res.send({message:"Not registered!"});
//         }
//     });
//     console.log(storedData);
//     const validate=bcrypt.compareSync(loginData.password, storedData.password);
//     if(validate){
//         const token= jwt.sign(loginData.email, secretKey);
//         return res.status(200).send({message:"User Logged in successfully !", Token: token});
//     }
//     else{
//         return res.status(200).send({message:"Invalid log in details !"})
//     }
// }
// module.exports={register, login}