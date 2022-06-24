var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});
const PER_PAGE = 3;

router.get("/:page", async (req, res) => {
  // Pagination Logic
  let { page } = req.params;
  page = page - 1;
  if (page < 0) {
    page = 0;
  }

  const contracts = await prisma.contract.findMany({
    take: PER_PAGE,
    skip: page * PER_PAGE,
    select: {
      id: true,
      created_at: true,
      operator: { select: { name: true, email: true, service_provider: true } },
      tourist: true,
    },
  });
  const count_contracts = await prisma.operator.count({});
  res.status(200).json({
    data: contracts,
    count: count_contracts,
    count_contracts_in_current_page: contracts.length,
    total_pages: Math.ceil(count_contracts / PER_PAGE),
  });
});

router.post(
  "/",
  body("operator_id").isInt(),
  body("name").isString(),
  body("passport_no").isString(),
  body("country").isString().isLength({ max: 2 }).optional(),
  async function (req, res, next) {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const count_contracts = await prisma.operator.count({
      where: { id: req.body.operator_id },
    });
    if (count_contracts == 0) {
      res.status(400).json({ error: "Operator Doesnt Exist" });
    }
    const count_tourists = await prisma.tourist.count({
      where: { passport_no: req.body.passport_no },
    });
    if (count_tourists > 0) {
      res
        .status(400)
        .json({ error: `Mr. ${req.body.name} Already Had a Contract !` });
    }

    const tourist = await prisma.tourist.create({
      data: {
        name: req.body.name,
        passport_no: req.body.passport_no,
        country: req.body.country,
      },
    });
    const contract = await prisma.contract.create({
      data: {
        tourist_id: tourist.id,
        operator_id: req.body.operator_id,
      },
    });
    res.status(201).json({
      resposne: "Contract & Tourist Has Been Created",
      data: {
        tourist: tourist,
        contract: contract,
      },
    });
  }
);

module.exports = router;
