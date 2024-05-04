import mongoose from "mongoose"

const connectDb = handler => async(req, res) => {
    try {
        if(mongoose.connections[0].readyState){
            return handler(req, res)
        }
        await mongoose.connect(process.env.MONGODB_URL)
        return handler(req, res)
    } catch (error) {
        console.log(error);
    }
}

export default connectDb