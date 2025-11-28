import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const ctrl = new ProductController();

// by category with pagination query
router.get("/category/:categoryId", ctrl.getByCategory);

router.get("/", ctrl.getAll); // optional: all products with filter
router.post("/", ctrl.create); // create product
router.get("/:id", ctrl.getById);

export default router;
