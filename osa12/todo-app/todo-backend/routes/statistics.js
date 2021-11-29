const express = require('express');
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

setAsync("added_todos", 0);

router.get('/', async (_, res) => {
  res.send({ added_todos: Number(await getAsync("added_todos")) });
});

module.exports = router;