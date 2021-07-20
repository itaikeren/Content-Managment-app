const express = require("express");
const router = express.Router();

const TextResource = require("../models/TextResource");
const Page = require("../models/Page");

// @route    GET tr/all/:pageid
// @desc     Get all text resources of a pge
// @access   Public
router.get("/all/:pageid", async (req, res) => {
  let pageId = req.params.pageid;

  try {
    let docs = await TextResource.find({ page: pageId }).sort({ createdAt: 1 });

    res.status(200).send({ tr: docs });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    POST tr/
// @desc     Create new text resource
// @access   Public
router.post("/", async (req, res) => {
  var ObjectId = require("mongoose").Types.ObjectId;

  let key = req.body.key;
  let value = req.body.value;
  let type = req.body.type;
  let maxChar = req.body.maxChar;
  let multiLine = req.body.multiLine;
  let pageId = req.body.pageid;

  try {
    let textResource = new TextResource({
      key,
      value,
      metadata: { type, maxChar, multiLine },
      page: ObjectId(pageId),
    });

    textResource = await textResource.save();

    let page = await Page.findById(pageId);

    page.textResources.push(ObjectId(textResource._id));

    await page.save();

    res.status(200).send({ tr: textResource });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    GET tr/:id
// @desc     Return a tr by ID
// @access   Public
router.get("/:id", async (req, res) => {
  let trId = req.params.id;
  try {
    let tr = await TextResource.findById(trId);
    res.status(200).send({ tr });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    DELETE tr/:id
// @desc     Delete a tr by ID
// @access   Public
router.delete("/:id", async (req, res) => {
  let trId = req.params.id;
  try {
    let tr = await TextResource.findById(trId);
    let page = await Page.findById(tr.page);

    page.textResources = page.textResources.filter((el) => el != trId);
    await page.save();
    await TextResource.deleteOne({ _id: trId });

    res.status(200).send({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// @route    PATCH tr/:id
// @desc     Update a tr by ID
// @access   Public
router.patch("/:id", async (req, res) => {
  let trId = req.params.id;
  let trKey = req.body.key;
  let trValue = req.body.value;
  let trType = req.body.type;
  let trMaxChar = req.body.maxChar;
  let trMultiline = req.body.multiLine;

  try {
    let tr = await TextResource.findById(trId);

    tr.key = trKey;
    tr.value = trValue;
    tr.metadata = {
      type: trType,
      maxChar: trMaxChar,
      multiLine: trMultiline,
    };

    tr = await tr.save();
    res.status(200).send({ tr });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

module.exports = router;
