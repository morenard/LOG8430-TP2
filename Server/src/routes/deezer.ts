import * as express from "express";
import * as controller from "./../controllers/deezer";

const router = express.Router();

router.get("/search/songs", controller.getSongs);

export default router;