import mongoose from "mongoose"
export const connectDB = async () => {
      await mongoose.connect('mongodb+srv://jasminenayak266:12qETWSntrYrAvSM@cluster0.1jqno.mongodb.net/food_site').then(()=>console.log("DB CONNECTED"));
}