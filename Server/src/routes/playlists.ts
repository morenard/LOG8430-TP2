import * as express from "express";
import * as controller from "./../controllers/playlists";

const router = express.Router();

router.get("/", controller.getPlaylists);
router.post("/", controller.addPlaylist);
router.patch("/", controller.modifyPlaylist);
router.delete("/", controller.removePlaylist);

export default router;