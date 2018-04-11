import * as express from "express";
import * as controller from "./../controllers/jamendo";

const router = express.Router();

router.get("/search/songs", controller.getSongs);

export default router;