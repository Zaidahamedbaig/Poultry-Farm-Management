import { Router } from "express";
import { addPartner, getAllPartners } from "../controllers/partner/partner";

const router = Router();

router.post("/add", addPartner);
router.get("/all", getAllPartners);

export default router;
