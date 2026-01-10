import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Check } from 'lucide-react';
import CarLoader from './CarLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentModel, setCurrentModel] = useState(0);
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(15);
  const [show360View, setShow360View] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const carModels = [
    '/models/baleno.glb',
    '/models/brezza.glb',
    '/models/ertiga.glb',
    '/models/s-presso.glb',
    '/models/swift_dzire.glb',
    '/models/xl6.glb',
  ];

  const carDetailsList = [
    {
      model: 'Baleno',
      fullName: 'Maruti Suzuki Baleno',
      year: '2022',
      mileage: '18,200 km',
      price: '7,85,000',
      transmission: 'Manual',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Nexa Blue',
      engine: '1.2L DualJet',
      seats: '5'
    },
    {
      model: 'Brezza',
      fullName: 'Maruti Suzuki Brezza',
      year: '2022',
      mileage: '19,800 km',
      price: '10,40,000',
      transmission: 'Manual',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Sizzling Red',
      engine: '1.5L Smart Hybrid',
      seats: '5'
    },
    {
      model: 'Ertiga',
      fullName: 'Maruti Suzuki Ertiga',
      year: '2022',
      mileage: '24,500 km',
      price: '9,75,000',
      transmission: 'Manual',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Metallic Magma Grey',
      engine: '1.5L K-Series',
      seats: '7'
    },
    {
      model: 'S-Presso',
      fullName: 'Maruti Suzuki S-Presso',
      year: '2023',
      mileage: '9,400 km',
      price: '4,85,000',
      transmission: 'Manual',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Solid Fire Red',
      engine: '1.0L K-Series',
      seats: '5'
    },
    {
      model: 'Swift Dzire',
      fullName: 'Maruti Suzuki Swift Dzire',
      year: '2021',
      mileage: '26,500 km',
      price: '7,20,000',
      transmission: 'Automatic',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Pearl Arctic White',
      engine: '1.2L K-Series',
      seats: '5'
    },
    {
      model: 'XL6',
      fullName: 'Maruti Suzuki XL6',
      year: '2021',
      mileage: '22,100 km',
      price: '11,90,000',
      transmission: 'Automatic',
      fuel: 'Petrol',
      ownership: 'First Owner',
      color: 'Metallic Premium Silver',
      engine: '1.5L Smart Hybrid',
      seats: '6'
    }
  ];

  const carDetails = carDetailsList[currentModel];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const nextModel = () => {
    setCurrentModel((prev) => (prev + 1) % carModels.length);
  };

  const prevModel = () => {
    setCurrentModel((prev) => (prev - 1 + carModels.length) % carModels.length);
  };

  const calculatePrice = () => {
    const basePrice = 5000;
    const pricePerInvite = 100;
    const pricePerDay = 500;
    return basePrice + (invites * pricePerInvite) + (duration * pricePerDay);
  };

  const formatPrice = (price) => {
  const numericPrice = Number(price.replace(/[₹, ]/g, ''));
  return (numericPrice / 100000).toFixed(2) + 'L onwards';
};


  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  if (isLoading) {
    return <CarLoader onLoadingComplete={() => setIsLoading(false)} />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-30"></div>
      </div>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-black">ALPHA CARS</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#inventory" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Inventory</a>
              <a href="#calculator" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Financing</a>
              <a href="#contact" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Contact</a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-md">
                Book Test Drive
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Model */}
      <section className="relative pt-20 min-h-screen flex items-center">
        {/* Accent stripe */}
        <div className="absolute left-0 top-1/3 w-2 h-32 bg-gradient-to-b from-blue-500 to-orange-500"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded">
                  {carDetails.year} Model
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                {carDetails.model}
              </h1>
              
              <p className="text-xl text-gray-600">
                {carDetails.engine} • {carDetails.transmission} • {carDetails.mileage}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">₹{formatPrice(carDetails.price)}</span>
                <span className="text-sm text-gray-500">onwards</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <button 
                  onClick={() => setShow360View(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
                >
                  View in 360°
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-sm font-medium hover:bg-blue-600 hover:text-white transition">
                  Schedule Visit
                </button>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="border-l-4 border-blue-600 pl-4 bg-blue-50/50 py-3">
                  <div className="text-2xl font-bold text-gray-900">{carDetails.fuel}</div>
                  <div className="text-xs text-gray-500 uppercase">Fuel Type</div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-3">
                  <div className="text-2xl font-bold text-gray-900">{carDetails.seats}</div>
                  <div className="text-xs text-gray-500 uppercase">Seater</div>
                </div>
                <div className="border-l-4 border-green-600 pl-4 bg-green-50/50 py-3">
                  <div className="text-2xl font-bold text-gray-900">{carDetails.ownership}</div>
                  <div className="text-xs text-gray-500 uppercase">Owner</div>
                </div>
              </div>
            </div>

            {/* Right: 3D Model Viewer */}
            <div className="relative lg:h-[600px] h-[400px]">
              <model-viewer
                src={carModels[currentModel]}
                alt={carDetails.fullName}
                camera-controls
                auto-rotate
                rotation-per-second="30deg"
                style={{ width: '100%', height: '100%' }}
                exposure="1"
                shadow-intensity="1"
                environment-image="neutral"
                camera-orbit="0deg 75deg 105%"
              ></model-viewer>

              {/* Model Navigation */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {carModels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentModel(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentModel ? 'bg-black w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevModel}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextModel}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Inventory */}
      <section id="inventory" className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative element */}
        <div className="absolute right-0 top-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Browse Our Collection</h2>
            <p className="text-gray-600">Certified pre-owned vehicles with warranty</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carDetailsList.map((car, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentModel(idx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left bg-white overflow-hidden hover:shadow-2xl transition-all group border-b-4 ${
                  idx === currentModel ? 'border-blue-600 shadow-xl' : 'border-transparent'
                }`}
              >
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <model-viewer
                    src={carModels[idx]}
                    alt={car.fullName}
                    auto-rotate
                    rotation-per-second="20deg"
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                    camera-orbit="0deg 75deg 105%"
                  ></model-viewer>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-1">{car.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{car.model}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{car.mileage}</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₹{formatPrice(car.price)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-blue-600">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center rounded">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Certified Quality</h3>
              <p className="text-gray-600">Every vehicle undergoes rigorous 150-point inspection</p>
            </div>
            <div className="space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-orange-500">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center rounded">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">6 Month Warranty</h3>
              <p className="text-gray-600">Comprehensive coverage on all certified vehicles</p>
            </div>
            <div className="space-y-3 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-green-600">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center rounded">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Easy Financing</h3>
              <p className="text-gray-600">Flexible EMI options with competitive rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500"></div>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Event Pricing Calculator</h2>
            <p className="text-gray-600">Calculate the cost for your car exhibition event</p>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl rounded-lg border-t-4 border-blue-600">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-sm font-medium text-gray-900">Number of Invites</label>
                  <span className="text-3xl font-bold text-gray-900">{invites}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={invites}
                  onChange={(e) => setInvites(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-sm font-medium text-gray-900">Duration (Days)</label>
                  <span className="text-3xl font-bold text-gray-900">{duration}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>90</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-sm text-gray-600">Estimated Price</span>
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{calculatePrice().toLocaleString('en-IN')}
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-lg">
                  Request Quote
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  *Final pricing may vary based on event requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-orange-100 rounded-full blur-2xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Visit Our Showroom</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">Kolkata, West Bengal, India</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">+91 99999 88888</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">info@alphacars.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <textarea
                  rows="4"
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">A</span>
                </div>
                <span className="text-lg font-bold">ALPHA CARS</span>
              </div>
              <p className="text-sm text-gray-400">Premium pre-owned vehicles</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#inventory" className="hover:text-white">Inventory</a></div>
                <div><a href="#calculator" className="hover:text-white">Financing</a></div>
                <div><a href="#contact" className="hover:text-white">Contact</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-white">FAQ</a></div>
                <div><a href="#" className="hover:text-white">Warranty</a></div>
                <div><a href="#" className="hover:text-white">Service</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-white">Privacy Policy</a></div>
                <div><a href="#" className="hover:text-white">Terms of Service</a></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 text-center">
            © 2024 Alpha Cars. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 360 Modal */}
      {show360View && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setShow360View(false)}
            className="absolute top-6 right-6 text-white text-sm font-medium hover:text-gray-300"
          >
            Close ✕
          </button>
          
          <div className="w-full h-full max-w-7xl p-8">
            <div className="text-white text-center mb-4">
              <h3 className="text-2xl font-bold">{carDetails.model} - 360° View</h3>
              <p className="text-sm text-gray-400">Drag to rotate • Scroll to zoom</p>
            </div>
            
            <div className="h-[calc(100vh-200px)]">
              <model-viewer
                src={carModels[currentModel]}
                alt={carDetails.fullName}
                camera-controls
                auto-rotate
                rotation-per-second="20deg"
                style={{ width: '100%', height: '100%' }}
                exposure="1.2"
                shadow-intensity="1"
                environment-image="neutral"
              ></model-viewer>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {carModels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentModel(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentModel ? 'bg-white w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;