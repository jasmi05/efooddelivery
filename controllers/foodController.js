import FoodModel from "../models/FoodModel.js";
import fs from 'fs'


const addFood = async (req,res) => {
let image_filename = `${req.file.filename}`

const food = new FoodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
try {
    await food.save();
    res.json({success:true,message:"Food Added"})
} catch (error) {
    console.log(error)
    res.json({suucess:false,message:"Error"})
}
}

const listFood = async (req,res) => {
try {
    const foods = await FoodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

const removeFood = async (req, res) => {
    try {
        // Find food item by id
        const food = await FoodModel.findById(req.body.id);
        
        // If food is not found, return an error response
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the image file associated with the food item
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            }
        });

        // Delete the food item from the database
        await FoodModel.findByIdAndDelete(req.body.id);
        
        // Send success response
        res.json({ success: true, message: "Food Removed" });
        
    } catch (error) {
        // Log the error and send an error response
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

        

        


export {addFood,listFood,removeFood}