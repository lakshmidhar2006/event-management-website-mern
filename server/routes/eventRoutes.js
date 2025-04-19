import express from 'express';
import {
  createEvent,
  getAllEvents,
  registerForEvent,
  getEventParticipants
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent); 
router.get('/', getAllEvents); 
router.post('/register/:eventId', registerForEvent);
router.get('/:eventId/participants', getEventParticipants);

export default router;
