import * as express from "express";
import playlistsRoutes from "./playlists";
import deezerRoutes from "./deezer";
import jamendoRoutes from "./jamendo";
import spotifyRoutes from "./spotify";


const router = express.Router();

router.use("/jamendo", jamendoRoutes);
router.use("/deezer", deezerRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/playlists", playlistsRoutes);

export default router;
