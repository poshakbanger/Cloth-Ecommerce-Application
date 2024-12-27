// import jwt from "jsonwebtoken";


// const authUser = async (req,res,next) => {
//     const {token} = req.headers;

     // if (!token) {
     //     return res.json({ success: false, message: "Not Authorized Login Again" })
     // }

//     try {
//         if (!token) {
//             return res.json({ success: false, message: "Not Authorized Login Again" })
//         }
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         console.log(token);
//         req.body.userId = token_decode.id;
//         next();

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authUser

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to the request body
        req.body.userId = decoded.id;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
