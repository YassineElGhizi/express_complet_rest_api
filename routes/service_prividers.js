var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});
/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.status(200).json({
    data: await prisma.service_provider.findMany({}),
  });
});

module.exports = router;
