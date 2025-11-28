import express from "express";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./categories.routes.js";
import productRoutes from "./products.routes.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/categories", categoryRoutes);
mainRouter.use("/products", productRoutes);

export default mainRouter;
