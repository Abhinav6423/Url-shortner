import Urlschema from "../models/Urlmodel.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const createUrl = async (req, res) => {

    try {
        const { longUrl, customUrl } = req.body;
        if (!longUrl) {
            res.status(400).json({ message: "LongUrl is required", status: false })
        }



        let shortUrl;
        let exists;

        if (customUrl) {
            exists = await Urlschema.findOne({ shortUrl: customUrl });

            if (exists) {
                return res.status(400).json({ message: "ShortUrl already exists", status: false })
            }
            shortUrl = customUrl;
        }

        do {

            if (!shortUrl) {
                shortUrl = nanoid(9);
            }

            exists = await Urlschema.findOne({ shortUrl: shortUrl });


        } while (exists);


        const url = await Urlschema.create({ longUrl, shortUrl, user: req.user?.id });

        return res.status(200).json({ message: "Url created successfully", status: true, data: url })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", status: false })
    }
}

const getUrls = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", status: false });
        }

        const urls = await Urlschema.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Urls fetched successfully",
            status: true,
            data: urls
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};


const redirection = async (req, res) => {

    try {
        const { shortUrl } = req.params

        const url = await Urlschema.findOne({ shortUrl: shortUrl });

        if (!url) {
            return res.status(404).json({ message: "Url not found", status: false })
        }

        url.clicks = (url.clicks || 0) + 1;
        await url.save();

        return res.redirect(url.longUrl)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", status: false })
    }
}

const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const user = req.user?.id;

    if (!id) {
        return res.status(400).json({ message: "Link Not Found", status: false })
    }

    if (!user) {
        return res.status(401).json({ message: "Unauthorized", status: false })
    }

    try {
        const url = await Urlschema.findOneAndDelete({ _id: id, user: user });

        if (!url) {
            return res.status(400).json({ message: "Link Not Found", status: false })
        }

        return res.status(200).json({ message: "Link Deleted Successfully", status: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", status: false })
    }


}


export { createUrl, redirection, getUrls, deleteUrl }