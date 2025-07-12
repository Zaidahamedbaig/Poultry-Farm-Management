import { Router, Request, Response } from "express";

const router = Router();

router.get("/details", (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: 1,
        name: "zaid",
        phone: 9008775929,
        address: "Areoplane building road  JJ Hatti chitradurga 577501",
      },
      {
        id: 2,
        name: "Javeed",
        phone: 9008775929,
        address: "Areoplane building road  JJ Hatti chitradurga 577501",
      },
    ],
  });
});

export default router;
