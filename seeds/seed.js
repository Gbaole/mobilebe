import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/connectDB.js";
dotenv.config();

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

const SALT_ROUNDS = 10;

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const sampleCategories = [
  "Action",
  "Adventure",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
  "Puzzle",
  "Racing",
  "Fighting",
  "Indie",
];

const sampleProductTitles = [
  "Super Blast",
  "Hero Quest",
  "Speed Racer",
  "Mystic Lands",
  "Galaxy Wars",
  "Castle Builder",
  "Brain Teaser",
  "Ultimate Soccer",
  "Stealth Ops",
  "Pixel Adventure",
  "Shadow Fighter",
  "Turbo Drift",
  "Farm Story",
  "Space Miner",
  "Dungeon Crawler",
  "Retro Fun",
  "Magic Arena",
  "Island Escape",
  "City Sim",
  "Battle Royale",
  "Cyber Runner",
  "Forest Tale",
  "Ocean Explorer",
  "Arcade Mania",
  "Alien Invasion",
  "Neo Kart",
  "Puzzle Master",
  "Quest for Gold",
  "Robo Clash",
  "Storm Riders",
];

const sampleDescriptions = [
  "An exciting game with amazing gameplay.",
  "Immerse yourself in a fantastic world.",
  "Fast-paced action and intense levels.",
  "Build, craft and conquer.",
  "A relaxing simulation with deep mechanics.",
];

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected for seeding.");

    // Optional: clear existing collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // --- Seed users (10)
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const username = `user${i}`;
      const email = `user${i}@example.com`;
      const passwordHash = await bcrypt.hash("Password123", SALT_ROUNDS);
      users.push({
        username,
        email,
        password: passwordHash,
        isActive: true, // already activated for seed
        createdAt: new Date(),
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log("Seeded users:", createdUsers.length);

    // --- Seed categories (at least 10)
    const categoriesToInsert = sampleCategories.map((name, idx) => ({
      name,
      order: idx + 1,
    }));
    const createdCategories = await Category.insertMany(categoriesToInsert);
    console.log("Seeded categories:", createdCategories.length);

    // --- Seed products (>= 10) distribute across categories
    const products = [];
    const totalProducts = Math.max(30, createdCategories.length * 2); // ensure >=10
    for (let i = 0; i < totalProducts; i++) {
      const title =
        sampleProductTitles[i % sampleProductTitles.length] + ` ${i + 1}`;
      const description = sampleDescriptions[i % sampleDescriptions.length];
      const price = randomInt(50, 500); // some price
      const category = createdCategories[i % createdCategories.length]._id;
      const images = [
        `/images/${title.replace(/\s+/g, "_").toLowerCase()}.jpg`,
      ];
      products.push({
        title,
        description,
        price,
        category,
        images,
        createdAt: new Date(),
      });
    }
    const createdProducts = await Product.insertMany(products);
    console.log("Seeded products:", createdProducts.length);

    console.log("Seeding finished. Exiting.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

run();
