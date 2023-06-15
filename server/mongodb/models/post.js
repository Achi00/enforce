import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    stock: {type: Number, required: true},
    serving: {type: Number, required: true},
    weight: {type: Number, required: true},
    flavor: {type: [String], required: false},
    productType: {type: String, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    photo2: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const postModel = mongoose.model('Post', PostSchema)

export default postModel