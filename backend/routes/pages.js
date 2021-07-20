const express = require("express");
const router = express.Router();

const Page = require("../models/Page");
const TextResource = require("../models/TextResource");

// @route    GET pages/
// @desc     Get all pages
// @access   Public
router.get("/", async (req, res) => {
  try {
    let docs = await Page.find();

    res.status(200).send({ pages: docs });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    POST pages/
// @desc     Create new page
// @access   Public
router.post("/", async (req, res) => {
  let name = req.body.name;
  let url = req.body.url;
  let description = req.body.description;
  let image = req.body.image;

  try {
    let page = new Page({
      name,
      url,
      description,
      image,
    });

    page = await page.save();
    res.status(200).send({ page: page });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    GET pages/:id
// @desc     Return a page by ID
// @access   Public
router.get("/:id", async (req, res) => {
  let pageId = req.params.id;
  try {
    let page = await Page.findById(pageId);
    res.status(200).send({ page });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    PATCH pages/:id
// @desc     Update page by ID
// @access   Public
router.patch("/:id", async (req, res) => {
  let pageId = req.params.id;
  let pageName = req.body.name;
  let pageDesc = req.body.description;
  let pageImage = req.body.image;

  try {
    let page = await Page.findById(pageId);
    page.name = pageName;
    page.description = pageDesc;
    page.image = pageImage;

    page = await page.save();
    res.status(200).send({ page });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    DELETE pages/:id
// @desc     Delete page by ID
// @access   Public
router.delete("/:id", async (req, res) => {
  let pageId = req.params.id;

  try {
    let page = await Page.findById(pageId);
    for (let i = 0; i < page.textResources.length; i++) {
      await TextResource.deleteOne({ _id: page.textResources[i] });
    }
    await Page.deleteOne({ _id: Object(pageId) });
    res.status(200).send({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

module.exports = router;
