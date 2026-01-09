import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Calendar, Gauge, IndianRupee, X, Sparkles, Shield, Award } from 'lucide-react';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(15);
  const [showCalculator, setShowCalculator] = useState(false);
  const [show360View, setShow360View] = useState(false);
  const [rotation360, setRotation360] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Different angle images for 360 view
  const view360Images = [
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f1f10?w=800',
  ];

  const carImages = [
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
  ];

  const carDetails = {
    model: 'BMW 3 Series M Sport',
    year: '2022',
    mileage: '12,500 km',
    price: '₹42,50,000',
    transmission: 'Automatic',
    fuel: 'Petrol',
    ownership: 'First Owner',
    color: 'Sapphire Black',
    engine: '2.0L Turbo'
  };

  const features = [
    { icon: Shield, text: 'Certified Pre-Owned' },
    { icon: Award, text: '6 Month Warranty' },
    { icon: Sparkles, text: 'Premium Interior' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const calculatePrice = () => {
    const basePrice = 5000;
    const pricePerInvite = 100;
    const pricePerDay = 500;
    return basePrice + (invites * pricePerInvite) + (duration * pricePerDay);
  };

  const handle360ViewOpen = () => {
    setShow360View(true);
  };

  const handle360ViewClose = () => {
    setShow360View(false);
    setRotation360(0);
  };

  // Handle mouse/touch drag for 360 view
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const diff = currentX - startX;
    const newRotation = (rotation360 + Math.floor(diff / 10)) % view360Images.length;
    setRotation360(newRotation < 0 ? view360Images.length + newRotation : newRotation);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, rotation360, startX]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Alpha Motors</h1>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#gallery" className="text-white/80 hover:text-white font-medium transition relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all"></span>
              </a>
              <a href="#details" className="text-white/80 hover:text-white font-medium transition relative group">
                Details
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all"></span>
              </a>
              <a href="#calculator" className="text-white/80 hover:text-white font-medium transition relative group">
                Calculator
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all"></span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Experience Luxury
          </h2>
          <p className="text-xl text-purple-200">Your dream car awaits</p>
        </div>

        {/* Image Carousel Section */}
        <section id="gallery" className="mb-16">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="relative h-[500px] md:h-[600px] group">
              <img
                src={carImages[currentImage]}
                alt={`Car view ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 p-4 rounded-full shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/30"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 p-4 rounded-full shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/30"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {carImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImage ? 'bg-white w-12' : 'bg-white/50 w-6'
                    }`}
                  />
                ))}
              </div>

              {/* 360° View Button */}
              <button
                onClick={handle360ViewOpen}
                className="absolute top-6 right-6 backdrop-blur-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                <Eye className="w-5 h-5" />
                <span className="font-semibold">360° View</span>
              </button>

              {/* Car Name Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-1">{carDetails.model}</h3>
                <p className="text-purple-200">{carDetails.year} • {carDetails.mileage}</p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 p-6 overflow-x-auto bg-black/20 backdrop-blur-sm">
              {carImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                    idx === currentImage ? 'border-purple-400 shadow-lg shadow-purple-500/50' : 'border-white/20'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-white/10 rounded-2xl px-6 py-4 flex items-center gap-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <feature.icon className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Car Overview Section */}
        <section id="details" className="mb-16">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-10 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></span>
              Vehicle Specifications
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Gauge, label: 'Model', value: carDetails.model },
                { icon: Calendar, label: 'Year', value: carDetails.year },
                { icon: Gauge, label: 'Mileage', value: carDetails.mileage },
                { icon: IndianRupee, label: 'Price', value: carDetails.price }
              ].map((item, idx) => (
                <div key={idx} className="group backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
                  <item.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-sm text-purple-200 mb-1">{item.label}</div>
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              {[
                { label: 'Transmission', value: carDetails.transmission },
                { label: 'Fuel Type', value: carDetails.fuel },
                { label: 'Ownership', value: carDetails.ownership },
                { label: 'Color', value: carDetails.color }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-sm text-purple-200 mb-2">{item.label}</div>
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Price Calculator */}
        <section id="calculator" className="mb-16">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-10 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></span>
                Event Calculator
              </h2>
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="backdrop-blur-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-purple-400/30"
              >
                {showCalculator ? 'Hide' : 'Show'} Calculator
              </button>
            </div>

            {showCalculator && (
              <div className="space-y-8 animate-fadeIn">
                {/* Number of Invites */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xl font-semibold text-white">Number of Invites</label>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{invites}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={invites}
                    onChange={(e) => setInvites(Number(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #3b82f6 ${((invites - 10) / 490) * 100}%, rgba(255,255,255,0.1) ${((invites - 10) / 490) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-purple-200 mt-2">
                    <span>10</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Duration of Event */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xl font-semibold text-white">Duration of Event</label>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{duration} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #3b82f6 ${((duration - 1) / 89) * 100}%, rgba(255,255,255,0.1) ${((duration - 1) / 89) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-purple-200 mt-2">
                    <span>1 Day</span>
                    <span>90 Days</span>
                  </div>
                </div>

                {/* Calculated Price */}
                <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl p-8 mt-8 border border-purple-400/30">
                  <div className="text-sm text-purple-200 mb-2">Estimated Event Price</div>
                  <div className="text-5xl font-bold text-white mb-6">
                    ₹{calculatePrice().toLocaleString('en-IN')}
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-5 rounded-xl transition-all duration-300 shadow-xl transform hover:scale-105">
                    Check Availability
                  </button>
                  <p className="text-xs text-purple-200 mt-4 text-center">
                    *Final pricing subject to event requirements and additional services
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="backdrop-blur-xl bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-3xl shadow-2xl p-8 sm:p-16 text-center border border-white/20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Drive Home?</h2>
          <p className="text-purple-100 mb-10 text-xl max-w-2xl mx-auto">Experience this premium vehicle with a personalized test drive. Our team is ready to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-5 px-10 rounded-xl transition-all duration-300 shadow-xl transform hover:scale-105">
              Schedule Test Drive
            </button>
            <button className="backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 border-2 border-white/30">
              Contact Sales Team
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative backdrop-blur-md bg-black/40 border-t border-white/10 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-200">© 2024 Alpha Motors. Redefining Luxury Automotive Experience.</p>
        </div>
      </footer>

      {/* 360° View Modal */}
      {show360View && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-4">
            <button
              onClick={handle360ViewClose}
              className="absolute top-4 right-4 z-10 backdrop-blur-md bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 border border-white/30"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="relative h-full flex flex-col items-center justify-center">
              <h3 className="text-white text-2xl font-bold mb-4">360° Interactive View</h3>
              <p className="text-purple-200 mb-8">Drag left or right to rotate the car</p>
              
              <div 
                className="relative w-full h-[70vh] cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <img
                  src={view360Images[rotation360]}
                  alt="360 view"
                  className="w-full h-full object-contain rounded-2xl"
                  draggable="false"
                />
                
                {/* Rotation Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 px-6 py-3 rounded-full border border-white/30">
                  <span className="text-white font-semibold">
                    {Math.round((rotation360 / view360Images.length) * 360)}°
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                {view360Images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === rotation360 ? 'bg-purple-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;