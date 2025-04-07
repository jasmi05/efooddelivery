import userModel from "../models/userModel.js";

// Add to user cart  
const addToCart = async (req, res) => {
   try {
      // Fetch user data by userId
      let userData = await userModel.findOne({ _id: req.body.userId });

      if (!userData) {
         return res.json({ success: false, message: "User not found" });
      }

      // Ensure cartData exists, initialize if not
      let cartData = userData.cartData || {}; // Default to an empty object if cartData is null/undefined

      // If item is not in the cart, initialize it
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      // Otherwise, increment the item count
      else {
         cartData[req.body.itemId] += 1;
      }

      // Update the user's cart in the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error adding item to cart" });
   }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      // Fetch user data by userId
      let userData = await userModel.findById(req.body.userId);

      if (!userData) {
         return res.json({ success: false, message: "User not found" });
      }

      // Ensure cartData exists
      let cartData = userData.cartData || {}; // Default to an empty object if cartData is null/undefined

      // Check if the item exists in the cart and has a quantity greater than 0
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      } else {
         return res.json({ success: false, message: "Item not found in cart or quantity is 0" });
      }

      // Update the user's cart in the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error removing item from cart" });
   }
};

// Get user cart
const getCart = async (req, res) => {
   try {
      // Fetch user data by userId
      let userData = await userModel.findById(req.body.userId);

      if (!userData) {
         return res.json({ success: false, message: "User not found" });
      }

      // Ensure cartData exists, default to an empty object if it doesn't
      let cartData = userData.cartData || {};

      res.json({ success: true, cartData: cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching cart data" });
   }
};

export { addToCart, removeFromCart, getCart };
