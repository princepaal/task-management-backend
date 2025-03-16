import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express";
import { IProfile, IUser } from "../interface/user";
import { User } from "../models/userSchema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const user = {
  createUser: async (req: Request, res: Response): Promise<any> => {
    const { name, email, password }: IUser = req.body;
    const user = mongoose.model("User");
    console.log("user", user);
    try {
      if (name && email && password) {
        //finding the user is existed before the cration of the user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
            .status(203)
            .send({
              success: false,
              message: "User Exists Already with this email.",
            });
        }
        console.log("hh");
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashPassword", hashPassword);
        const generateUser = await User.create({
          name,
          email,
          password: hashPassword,
        });

        if (generateUser) {
          return res.status(201).send({
            success: true,
            message: "User Created Succesfully",
            // user: generateUser,
          });
        } else {
          return res
            .status(400)
            .send({ success: false, message: "User failed to Create" });
        }
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Invalid Payload" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid credentials" });
      }
      //comparing the password here.
      const isMatch = await bcrypt.compare(password,user.password);
      console.log('isMatch', isMatch)
      if(!isMatch){
        return res
          .status(401)
          .send({ success: false, message: "Invalid credentials" });
      }

      //generating the JWT token here.
      const token = jwt.sign({userId: user._id},process.env.JWT_SECRET!,{ expiresIn: "15h" })
      return res.status(200).send({success: true,message: "Logged in Successfully", token,userId: user?._id })

    } catch (error) {}
   
   
  },
};

export default user;
