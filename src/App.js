import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Calendar, Gauge, IndianRupee } from 'lucide-react';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(15);
  const [showCalculator, setShowCalculator] = useState(false);

  // Sample car images
  const carImages = [
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
  ];

  const carDetails = {
    model: 'BMW 3 Series',
    year: '2022',
    mileage: '12,500 km',
    price: '₹42,50,000',
    transmission: 'Automatic',
    fuel: 'Petrol',
    ownership: 'First Owner'
  };

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

  const handle360View = () => {
    alert('360° View Feature: This would open an interactive 360° viewer of the car');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-purple-700">Alpha</h1>
            <nav className="flex gap-6">
              <a href="#gallery" className="text-gray-700 hover:text-purple-700 font-medium">Gallery</a>
              <a href="#details" className="text-gray-700 hover:text-purple-700 font-medium">Details</a>
              <a href="#calculator" className="text-gray-700 hover:text-purple-700 font-medium">Calculator</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Carousel Section */}
        <section id="gallery" className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 sm:h-[500px]">
              <img
                src={carImages[currentImage]}
                alt={`Car view ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2 h-2 rounded-full transition ${
                      idx === currentImage ? 'bg-purple-600 w-8' : 'bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* 360° View Button */}
              <button
                onClick={handle360View}
                className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition"
              >
                <Eye className="w-5 h-5" />
                <span className="font-semibold">360° View</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {carImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentImage ? 'border-purple-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Car Overview Section */}
        <section id="details" className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Car Overview</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-purple-600 mb-2">
                  <Gauge className="w-6 h-6" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Model</div>
                <div className="text-xl font-bold text-gray-900">{carDetails.model}</div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-purple-600 mb-2">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Year</div>
                <div className="text-xl font-bold text-gray-900">{carDetails.year}</div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-purple-600 mb-2">
                  <Gauge className="w-6 h-6" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Mileage</div>
                <div className="text-xl font-bold text-gray-900">{carDetails.mileage}</div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-purple-600 mb-2">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Price</div>
                <div className="text-xl font-bold text-gray-900">{carDetails.price}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div>
                <div className="text-sm text-gray-600 mb-1">Transmission</div>
                <div className="text-lg font-semibold text-gray-900">{carDetails.transmission}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Fuel Type</div>
                <div className="text-lg font-semibold text-gray-900">{carDetails.fuel}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Ownership</div>
                <div className="text-lg font-semibold text-gray-900">{carDetails.ownership}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Price Calculator */}
        <section id="calculator" className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Event Price Calculator</h2>
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {showCalculator ? 'Hide' : 'Show'} Calculator
              </button>
            </div>

            {showCalculator && (
              <div className="space-y-8">
                {/* Number of Invites */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">Number of Invites</label>
                    <span className="text-2xl font-bold text-purple-600">{invites}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={invites}
                    onChange={(e) => setInvites(Number(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${((invites - 10) / 490) * 100}%, #e9d5ff ${((invites - 10) / 490) * 100}%, #e9d5ff 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>10</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Duration of Event */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">Duration of Event</label>
                    <span className="text-2xl font-bold text-purple-600">{duration} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${((duration - 1) / 89) * 100}%, #e9d5ff ${((duration - 1) / 89) * 100}%, #e9d5ff 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 Day</span>
                    <span>90 Days</span>
                  </div>
                </div>

                {/* Calculated Price */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mt-6">
                  <div className="text-sm text-gray-600 mb-2">Estimated Event Price</div>
                  <div className="text-4xl font-bold text-purple-700 mb-4">
                    ₹{calculatePrice().toLocaleString('en-IN')}
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                    Check Availability
                  </button>
                  <p className="text-xs text-gray-600 mt-4">
                    *Price may vary based on event type and additional services. Final quote will be provided after consultation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Interested in This Car?</h2>
          <p className="text-purple-100 mb-8 text-lg">Schedule a test drive or get in touch with our sales team today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition shadow-lg">
              Schedule Test Drive
            </button>
            <button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-4 px-8 rounded-xl transition border-2 border-white">
              Contact Sales
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Alpha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;