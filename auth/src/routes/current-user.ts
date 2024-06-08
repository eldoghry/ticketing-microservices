import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/current", (req: Request, res: Response) => {
  res.send("current user");
});

export { router as currentUserRouter };
