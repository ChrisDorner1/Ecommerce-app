const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      model: Product,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(data);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json(500).json(data)
    });
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(data);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
