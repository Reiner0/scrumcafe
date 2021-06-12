import { Router } from "express";
import { db } from "../app";

const router = Router();

router.get("/", function (req, res, next) {
	const menuItems = db.get("menuItems").value();
	res.json(menuItems);
});

module.exports = router;
