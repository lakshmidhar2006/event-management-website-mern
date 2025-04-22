import express from 'express';
import { 
  createEvent, 
  getAllEvents, 
  registerForEvent, 
  getEventParticipants, 
  getAllEventsByOrganizer,
  getRegisteredEvents
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent); // Create a new event
router.get('/', getAllEvents); // Get all events (exclude own if userId is passed as query param)
router.post('/register/:eventId', registerForEvent); // Register for an event
router.get('/:eventId/participants', getEventParticipants); // Get participants of an event
router.get('/organizer/:organizerId', getAllEventsByOrganizer); // Get events by organizer
router.get('/registered/:userId', getRegisteredEvents); // Get events user is registered in

export default router;
