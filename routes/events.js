const { Router } = require("express");
const { check } = require("express-validator");
const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validateJWT");
const { fieldValidation } = require("../middlewares/fieldValidation");
const { isDate } = require("../helpers/isDate");

const router = Router();

//Midleware
router.use(validateJWT);

//Obtener Evento
router.get("/", getEvents);

//Crear evento
router.post(
  "/",
  [
    check("title", "A title is needed").not().isEmpty(),
    check("title", "The title must be a string").isString(),
    check("start", "The Start date is needed").custom(isDate),
    check("end", "The End date is needed").custom(isDate),
    fieldValidation,
  ],
  createEvent
);

//Actualizar evento
router.put("/:id", updateEvent);

//Borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
