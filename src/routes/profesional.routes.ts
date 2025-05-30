import { Router } from "express";
import {
  getProfesionales,
  getProfesional,
  createProfesional,
  updateProfesional,
  deleteProfesional,
} from "../controllers/Profesional.controller";

const router = Router();

router.get("/", getProfesionales);
router.get("/:id", getProfesional);
router.post("/", createProfesional);
router.put("/:id", updateProfesional);
router.delete("/:id", deleteProfesional);

export default router;
