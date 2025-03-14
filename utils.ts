// // import user from "./controller/user";

// import mongoose from "mongoose";
// import { IProfile } from "./interface/user";

// export const findExistingUser = async(email: string)=>{
//     const user = mongoose.model('User')
//     console.log('user', user)
//     await user
//     .findOne({ email: email })
//     .then((result: IProfile) => {
//         console.log('result', result)
//       return result;
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
// }