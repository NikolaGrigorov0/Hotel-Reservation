import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/Home';
import SearchBarWithMap from './components/SearchBarWithMap';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HotelsPage from './components/HotelsPage';
import HotelDetails from './components/HotelDetails';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchBarWithMap />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} HotelFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;