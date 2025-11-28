import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const router = Router();
const ctrl = new CategoryController();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create); // create category (optional protected)
router.get("/:id", ctrl.getById);

export default router;
