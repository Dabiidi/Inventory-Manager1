// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const multer = require("multer"); // to store image huehue

const app = express();
const PORT = 4000;

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/inventoryapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Define a schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null, // Set a default value to null to indicate no profile picture
  },
});

// Create a User model using the schema
const User = mongoose.model("userlogs", userSchema); // collections

app.use(bodyParser.json());

// API endpoint to save user logs

app.get("/inventoryapp/userlogs", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/inventoryapp/userlogs", async (req, res) => {
  const { name, pass } = req.body;

  const newUser = new User({ name, pass });

  try {
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user" });
  }
});
const inventoryItemSchema = new mongoose.Schema(
  {
    // ITEM LIST INVENTORY SCHEMA
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const InventoryItem = mongoose.model("itemlist", inventoryItemSchema);

app.post("/inventoryapp/itemlist", async (req, res) => {
  const { name, quantity, price, desc, classification } = req.body;

  const newInventoryItem = new InventoryItem({
    name,
    quantity,
    price,
    desc,
    classification,
  });
  console.log("Items", newInventoryItem);
  try {
    await newInventoryItem.save();
    res.status(201).json({ message: "Inventory item saved successfully" });
  } catch (error) {
    console.error("Error saving inventory item:", error);
    res.status(500).json({ message: "Error saving inventory item" });
  }
});

// Update database cutie API ENDPOINT
app.put("/inventoryapp/itemlist/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, desc, classification } = req.body;

  console.log(req.body);
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, quantity, price, desc, classification },
      { upsert: true }
      // This ensures that the updated item is returned
    );

    console.log(updatedItem);
    if (updatedItem) {
      res.status(200).json({ message: "Inventory item updated successfully" });
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Error updating inventory item" });
  }
});

// API endpoint to delete an inventory item
app.delete("/inventoryapp/itemlist/:itemName", async (req, res) => {
  const { itemName } = req.params;

  try {
    await InventoryItem.deleteOne({ name: itemName });
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item" });
  }
});

app.get("/inventoryapp/itemlist", async (req, res) => {
  console.log(req?.query);
  try {
    let inventoryItemSchema = [];
    const query = {};

    if (req.query.name) {
      query.$or = [
        { name: req.query.name },
        { classification: req.query.classification }, // Match by name or classification
      ];
    }

    if (req.query.classification) {
      query.classification = req.query.classification;
    }

    const inventoryItems = await InventoryItem.find(query).sort({
      name: "desc",
    });

    inventoryItemSchema.push(inventoryItems);
    res.status(200).json(inventoryItemSchema[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching inventory items" });
  }
});

app.get("/inventoryapp/itemlist/:param", async (req, res) => {
  const { param } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(param)) {
      // Search by ID
      const existingItem = await InventoryItem.findOne({ _id: param });
      if (existingItem) {
        const { id, name, quantity, price, desc, classification } =
          existingItem;
        res
          .status(200)
          .json({ id, name, quantity, price, desc, classification });
      } else {
        res.status(200).json({ exists: false });
      }
    } else {
      // Search by name
      const existingItems = await InventoryItem.findOne({ name: param });
      console.log(existingItems);
      if (existingItems) {
        res.status(200).json(existingItems);
      } else {
        res.status(200).json({ exists: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error checking item existence" });
  }
});

// app.get("/inventoryapp/itemlist", async (req, res) => {
//   // Search
//   console.log(req.query);
//   // const { id, name, action } = req;

//   // console.log(query);
//   // console.log(req.params);
//   try {
//     const existingItem = await InventoryItem.findOne({ _id: id }); // ID Saerch
//     if (existingItem) {
//       const { id, name, quantity, price, desc } = existingItem;

//       res.status(200).json({ id, name, quantity, price, desc });
//     } else {
//       res.status(200).json({ exists: false });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error checking item existence" });
//   }
// });

// app.get("/inventoryapp/itemlist/:itemName", async (req, res) => {
//   // Search
//   const { itemName } = req.params;
//   console.log(req.params);
//   try {
//     const existingItem = await InventoryItem.findOne({ name: itemName }); // ID Saerch
//     if (existingItem) {
//       res.status(200).json({ exists: true });
//     } else {
//       res.status(200).json({ exists: false });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error checking item existence" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
