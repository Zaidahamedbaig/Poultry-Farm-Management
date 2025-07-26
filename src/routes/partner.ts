import { Router } from "express";
import {
  addPartner,
  deletePartner,
  editPartnerDetails,
  getAllPartners,
} from "../controllers/partner/partner";

const router = Router();

router.post("/add", addPartner);
router.get("/all", getAllPartners);
router.delete("/delete/:id", deletePartner);
router.put("/edit/:id", editPartnerDetails);

export default router;
