import Event from '../models/Event'
import User from '../models/User'

export const createEvent = async(req,res)=>{
    try{
     const {title,description,date,location,maxParticipants,organizerId} = req.body
     const newEvent = new Event({title,description,date,location,maxParticipants,organizerId})
     await newEvent.save()
     res.status(201).json(newEvent)
    }
    catch(e){
        res.status(500).json({message:'error creating event',errot:e.message})

    }
}


export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('organizer', 'name email');
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
  };




export const registerForEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.participants.includes(userId)) {
        return res.status(400).json({ message: 'User already registered' });
      }
  
      if (event.participants.length >= event.maxParticipants) {
        return res.status(400).json({ message: 'Event is full' });
      }
  
      event.participants.push(userId);
      await event.save();
  
      res.status(200).json({ message: 'Registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  };

  export const getEventParticipants = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const event = await Event.findById(eventId).populate('participants', 'name email');
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      res.status(200).json(event.participants);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching participants', error: err.message });
    }
  };