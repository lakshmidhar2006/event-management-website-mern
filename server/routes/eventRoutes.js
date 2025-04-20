import express from 'express';
import { 
  createEvent, 
  getAllEvents, 
  registerForEvent, 
  getEventParticipants, 
  getAllEventsByOrganizer 
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent); // Create a new event
router.get('/', getAllEvents); // Get all events
router.post('/register/:eventId', registerForEvent); // Register for an event
router.get('/:eventId/participants', getEventParticipants); // Get participants of an event
router.get('/organizer/:organizerId', getAllEventsByOrganizer); // Get events by organizer

export default router;
