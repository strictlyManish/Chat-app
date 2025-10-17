import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/soket.js";
import User from "../models/user.model.js";
import Message from './../models/message.model.js';


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInuserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInuserId } }).select("-password");
        res.status(200).json(filterUsers)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            receiverId,
            senderId,
            text,
            image: imageUrl
        });

        await newMessage.save();


        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)

    } catch (error) {

        res.status(500).json({ message: 'Internal server error' })
    }
};