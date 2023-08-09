const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");

const { Media } = require("../models");

router.get("/", async (req, res) => {
  const media = await Media.findAll({
    attributes: ["id", "image"],
  });

  const mappedMedia = media.map((res) => {
    res.image = `${req.get("host")}/${res.image}`;
    return res;
  });

  return res.json({
    status: "success",
    data: mappedMedia,
  });
});

router.post("/", (req, res) => {
  const image = req.body.image;

  //cek apakah request mengirimkan base64 (gambar atau bukan)
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }

  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", message: "error upload image" });
    }

    const filename = filepath.split("\\").pop().split("/").pop();

    console.log(filename);

    const media = await Media.create({ image: `images/${filename}` });

    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: `${req.get("host")}/images/${filename}`,
      },
    });
  });
});

module.exports = router;
