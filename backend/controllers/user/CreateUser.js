/**
 * Importing the User model to perform create operations
 */
 const User = require("../../models/UserSchema")

 /**
  * createUser() - Asynchronous Function
  *      - Destructures the input received in req.body.
  *      - Create a userObj object.
  *      - Validated if name is received.
  *      - Validated if name received is of type string.
  *      - define name property in userObj.
  *      - Validated if email is received.
  *      - Validated if email received is of type string.
  *      - define email property in userObj.
  *      - Validated if profession is received then it should be of type string.
  *      - If profession is valid define it in userObj.
  *      - Validated if appwriteId is received.
  *      - Validated if appwriteId is of type string.
  *      - If appwriteId is valid define it in userObj.
  *      - Creates a new document from the validated data. (Asynchronous operation - create())
  */
exports.createUser = async (req, res) => {
    try{
        const {name, email, profession, appwriteId} = req.body

        const userObj = {}

        if(!name){
            throw new Error("Name is required, Please pass name to create a user")
        }

        if(typeof name !== "string"){
            throw new Error("Name should have a string value")
        }

        Object.defineProperty(userObj, "name", {
            value: name,
            enumerable: true 
        })

        if(!email){
            throw new Error("Email is required, Please pass email to create a user")
        }

        if(typeof email !== "string"){
            throw new Error("Email should have a string value")
        }

        Object.defineProperty(userObj, "email", {
            value: email,
            enumerable: true 
        })

        if(profession && (typeof profession !== "string")){
            throw new Error("Profession should have a string value")
        }

        if(profession){
            Object.defineProperty(userObj, "profession", {
                value: profession,
                enumerable: true 
            })
        }

        if(!appwriteId){
            throw new Error("Appwrite ID is required, Please pass name to create a user")
        }

        if(typeof appwriteId !== "string"){
            throw new Error("Appwrite Id should have a string value")
        }

        Object.defineProperty(userObj, "appwriteId", {
            value: appwriteId,
            enumerable: true 
        })

        const user = await User.create(userObj)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
    } catch(error){
        console.log("Error in create user controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in create user controller",
            error
        })

    }
}
