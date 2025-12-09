import express from "express";
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import Product from "./server/models/product.model.js";

// Required for ES module __dirname
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------ DATABASE CONNECTION + SEEDING ------------
const defaultProducts = [
  { name: 'Thunderbolt Hoodie', category: 'Apparel', price: 49.99, image: '/images/hoodie.png' },
  { name: 'Pika Pika T-Shirt', category: 'Apparel', price: 24.99, image: '/images/tshirt.png' },
  { name: 'Electric Bolt Cap', category: 'Accessories', price: 19.99, image: '/images/cap.png' },
  { name: 'Pikachu Socks', category: 'Apparel', price: 9.99, image: '/images/socks.png' },
  { name: 'Lightning Keychain', category: 'Accessories', price: 5.99, image: '/images/keychain.png' },
  { name: 'Pikachu Backpack', category: 'Apparel', price: 39.99, image: '/images/backpack.png' },
  { name: 'Pika Mug', category: 'Accessories', price: 12.99, image: '/images/mug.png' },
  { name: 'Electric Gloves', category: 'Apparel', price: 14.99, image: '/images/globes.png' },
  { name: 'Pikachu Notebook', category: 'Accessories', price: 7.99, image: '/images/notebook.png' },
  { name: 'Thunderbolt Sneakers', category: 'Apparel', price: 59.99, image: '/images/sneakers.png' }
];

mongoose
  .connect(config.mongoUri)
  .then(async () => {
    console.log("Connected to the database!");

    for (const prod of defaultProducts) {
      const exists = await Product.findOne({ name: prod.name });
      if (!exists) {
        await new Product(prod).save();
        console.log(`Added product: ${prod.name}`);
      }
    }
    console.log("Default products seeded.");
  })
  .catch((err) => {
    console.error(`Unable to connect to database: ${config.mongoUri}`, err);
  });

// ------------ API ROUTES (YOUR EXISTING ROUTES IN express.js) ------------

// Example API root
app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// ------------ SERVE REACT BUILD (FIX FOR YOUR PROBLEM) ------------

// Point static files to React build folder
app.use(express.static(path.join(__dirname, "client", "build")));

// Catch-all => return React index.html for ANY non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// ------------ START SERVER ------------
app.listen(config.port, () => {
  console.info(`Server started on port ${config.port}.`);
});
