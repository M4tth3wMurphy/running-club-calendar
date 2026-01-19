import express from "express";
import { db } from "../config/firebase.js";

const router = express.Router();

/* GET /api/races */

router.get("/", async (req, res) => {
  try {
    const { distance, surface, month } = req.query;

    const snapshot = await db.ref("races").once("value");
    const data = snapshot.val() || {};

    let races = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

    if (distance) {
      races = races.filter((race) => race.distance === distance);
    }

    if (surface) {
      races = races.filter((race) => race.surface === surface);
    }

    if (month) {
      races = races.filter((race) => race.date?.split("-")[1] === month);
    }

    res.json(races);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch races" });
  }
});

/* GET /api/races/:id */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const snapshot = await db.ref(`races/${id}`).once("value");
    const race = snapshot.val();

    if (!race) {
      return res.status(404).json({ message: "Race not found" });
    }

    res.json({
      id,
      ...race,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch race" });
  }
});

export default router;
