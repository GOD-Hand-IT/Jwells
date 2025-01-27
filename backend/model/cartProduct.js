import mongoose from 'mongoose'

const addToCart = mongoose.Schema({
    productId: {
        ref: 'product',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    userId: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.addToCart || mongoose.model("addToCart", addToCart)