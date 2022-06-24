const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});
const { body, validationResult } = require("express-validator");
const PER_PAGE = 3;

router.get("/:page", async function (req, res) {
  // Pagination Logic
  let { page } = req.params;
  page = page - 1;
  if (page < 0) {
    page = 0;
  }

  const operators = await prisma.operator.findMany({
    take: PER_PAGE,
    skip: page * PER_PAGE,
    select: {
      id: true,
      name: true,
      service_provider: true,
    },
  });
  const count_operators = await prisma.operator.count({});
  res.status(200).json({
    data: operators,
    count: count_operators,
    count_operators_in_current_page: operators.length,
    total_pages: Math.ceil(count_operators / PER_PAGE),
  });
});

router.post(
  "/",
  body("email").isEmail(),
  body("name").isString(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const operator = await prisma.operator.create({ data: req.body });
    res.status(201).json({
      data: {
        reponse: "Operator Has Been Created",
        operator: operator,
      },
    });
  }
);

router.put(
  "/",
  body("id").isInt(),
  body("name").isString().optional(),
  body("service_provider_id").isInt().optional(),
  async (req, res) => {
    // Data Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.id <= 0) {
      res.status(400).json({ error: "Non Valid ID was given" });
    } else {
      const count_operator = await prisma.operator.count({
        where: { id: Number(req.body.id) },
      });
      if (count_operator == 0) {
        res.status(400).json({ error: "Operator Doesnt Exist" });
      }
    }
    if (req.body.service_provider_id > 0) {
      const count_service_provider = await prisma.service_provider.count({
        where: { id: req.body.service_provider_id },
      });
      if (count_service_provider == 0) {
        res.status(400).json({ error: "Service Provider does not Exists" });
      }
    } else {
      res.status(400).json({ error: "Non Valid ID was given" });
    }
    // END Data Validation

    const operator = await prisma.operator.update({
      where: { id: Number(req.body.id) },
      data: req.body,
      include: { service_provider: true },
    });
    res.status(200).json({
      reponse: "Operaton Has Been Updated",
      data: operator,
    });
  }
);

module.exports = router;
