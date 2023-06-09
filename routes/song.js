const router = require("express").Router();
const songController = require("../controllers/song.js");
const { Upload_image_or_audio } = require("../middleware/file_middleware");
const { verifyToken } = require("../middleware/auth.js");

router.get("/", songController.get_all_songs);
router.get("/:id", songController.get_song_by_id);
router.get("/user/:id", songController.get_songs_by_user_id);
router.post("/played", songController.song_played);
router.post(
  "/",
  [
    verifyToken,
    Upload_image_or_audio.fields([
      { name: "cover", maxCount: 1 },
      { name: "song", maxCount: 1 },
    ]),
  ],
  songController.create_song
);

router.delete("/remove/:id", [verifyToken], songController.remove_song);
router.post("/update", [verifyToken], songController.update_song);
router.post("/buy", [verifyToken], songController.buy_nft);
router.post("/like_song", [verifyToken], songController.update_like_status);
// router.put(
//   "/:id/edit_song",
//   [verifyToken, Upload_image_or_audio.single("song")],
//   songController.update_song
// );
module.exports = router;
