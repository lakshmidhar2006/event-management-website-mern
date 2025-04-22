import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HostEvent from './pages/HostEvent';
import EventList from './pages/EventList';
import MyEvents from './pages/myEvents';
import Navbar from './components/Navbar';
import RegisteredEvents from './pages/RegisteredEvents'; // ⬅️ import it
import Home from './pages/Home'; // ⬅️ import this component





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/host-event" element={<HostEvent />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
