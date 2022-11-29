/**
 * Importing the User model to perform create operations
 */
 const User = require("../../models/UserSchema")

/**
 * getUserTodos() - Asynchronous Function
 *      - Destructures the input received in req.params.
 *      - Validated if userId is received.
 *      - Validated if userId received is of type string.
 *      - Fetches the user with respect to userId and populate todos field. (Asynchronous operation - find())
 */
 exports.getUserTodos = async (req, res) => {
    try{
        const { userId } = req.query

        if(!userId){
            throw new Error("Appwrite user id is required to fetch the todo")
        }

        if(typeof userId !== "string"){
            throw new Error("Appwrite user Id should of type string")
        }

        const user = await User.find({appwriteId: userId}).populate('todos')

        res.status(200).json({
            success: true,
            message: "User Todos fetched successfully",
            user: user[0]
        })
    } catch(error){
        console.log("Error in get user todos controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in get user todos controller",
            error
        })
    }
}

