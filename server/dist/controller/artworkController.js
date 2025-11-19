"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtworks = getAllArtworks;
exports.updateArtwork = updateArtwork;
const artworkModel_1 = __importDefault(require("../models/artworkModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function getAllArtworks(req, res) {
    try {
        const artworks = await artworkModel_1.default.find({});
        console.log(artworks);
        return res.status(200).json(artworks);
    }
    catch (error) {
        ``;
        console.error("Error fetching artworks:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
async function updateArtwork(req, res) {
    try {
        const id = req.body._id;
        const updatedArtwork = await artworkModel_1.default.findOneAndUpdate({ _id: id }, req.body.artwork, { new: true });
        console.log(updatedArtwork);
        return res.status(200).json(updatedArtwork);
    }
    catch (error) {
        console.error("Error updating artwork:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
