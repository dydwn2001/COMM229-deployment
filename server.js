import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import Product from "./server/models/product.model.js"; // import your product model

// Mapea productos a los nombres de archivo en public/images
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

    // Seed default products
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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to The PikaPika Project" });
});

app.listen(config.port, () => {
  console.info("Server started on port %s.", config.port);
  console.info("Server URL: http://localhost:%s", config.port);
});
