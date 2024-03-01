const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const eventos = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};
const createEvent = async (req, res) => {
  const { body } = req;

  const { uid } = req;

  const newEventPayload = {
    ...body,
    user: uid,
  };

  try {
    let event = new Event(newEventPayload);

    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      savedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error saving the event",
    });
  }
};
const updateEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).send({
        ok: false,
        msg: "Event does not exit",
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).send({
        ok: false,
        msg: "You can not update this event",
      });
    }

    const newEvent = { ...req.body, user: req.uid };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "Event Updated",
      updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error updating the event",
    });
  }
};
const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).send({
        ok: false,
        msg: "Event does not exit",
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).send({
        ok: false,
        msg: "You can not delete this event",
      });
    }

    const deleteEvent = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: "Event Deleted",
      deleteEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error deleting the event",
    });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
};
