"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const features = [
  {
    id: 1,
    icon: "✅",
    title: "YAANX - COMING SOON!",
    description:
      "Your Premium Travel Experience is About to Begin. The future of luxury travel is here! YAANX is not just another cab service—it's a revolution in premium, safe, and seamless mobility. Designed for those who demand more from their journeys, YAANX blends technology, comfort, and convenience to deliver a ride like never before.🫡",
  },
  {
    id: 2,
    icon: "✅",
    title: "What Makes YAANX Different?",
    description: `<strong>🚘 Handpicked Premium Fleet</strong> - Travel in high-end, well-maintained luxury vehicles.<br>
    <strong>👨‍✈️ Top-Tier Saarthis (Drivers)</strong> - Professionally trained, background-verified, and customer-focused.<br>
    <strong>💰 Smart Pricing & Bidding System</strong> - Pay fair fares with real-time dynamic pricing.<br>
    <strong>📍 Seamless Tech Experience</strong> - AI-powered route optimization, real-time tracking, and effortless booking.<br>
    <strong>🧼 Automated Cleanliness Checks</strong> - Every vehicle is inspected to maintain hygiene and comfort.<br>
    <strong>🛡 Uncompromised Safety</strong> - Live ride tracking, emergency assistance, and driver rating systems.
    🤓`,
  },
  {
    id: 3,
    icon: "✅",
    title: "Experience the Future of Travel",
    description:
 "🚖 <strong>YAANX</strong> is not just a ride, it's an upgrade. Whether it's your daily commute, airport transfer, or an important business meeting, we make sure you reach in style and comfort. <br> Be Among the First to Ride! 📲 Sign up now for early access and exclusive launch offers! 🚖 <br> Join as a Sarthi (Driver) - Earn more with transparent pricing, fair commissions, and top-tier customer demand. <br> The Wait is Almost Over! <strong>YAANX</strong> - The Future of Mobility, Arriving Soon. <br> Stay tuned. Something extraordinary is coming your way! 🫡"
 },
];

const useSatte = (initialState) => {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState((prevState) => !prevState);
  };

  return [state, toggleState];
};

const validateForm = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (!data.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default function LandingPage() {
  const [darkMode, toggleDarkMode] = useSatte(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    appType: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Validate the updated form data
    const errors = validateForm(updatedFormData);
    setFormErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          setPopupMessage("Form submitted successfully!");
          setFormData({
            name: "",
            phone: "",
            email: "",
            appType: "",
          })
        } else {
          setPopupMessage("Form submission failed. Please try again.");
        }
      } catch (error) {
        setPopupMessage("An error occurred. Please try again.");
      } finally {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header
        className={`flex justify-between p-4 border-b sticky top-0 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h1 className="text-lg font-bold text-center flex-1 ml-15">YAAN</h1>
        <button
          onClick={toggleDarkMode}
          className={`relative inline-flex items-center h-8 w-16 rounded-full cursor-pointer transition-all ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
          aria-label="Toggle Dark Mode"
        >
          <Sun
            size={20}
            className={`absolute left-1 transition-all ${
              darkMode ? "text-gray-500" : "text-yellow-500"
            }`}
          />

          <Moon
            size={20}
            className={`absolute right-1 transition-all ${
              darkMode ? "text-blue-400" : "text-gray-500"
            }`}
          />

          <span
            className={`${
              darkMode
                ? "translate-x-8 bg-blue-500"
                : "translate-x-0 bg-yellow-500"
            } inline-block text-white h-7 w-7 transform rounded-full transition-all`}
          />
        </button>
      </header>

      <div className="border-b">
        <div className="grid md:grid-cols-2 px-8 max-w-7xl mx-auto">
          <div className=" md:border-r pb-6 pt-[4rem]">
            <div className="max-w-[450px] mx-auto">
              <h2 className="text-3xl mb-2 font-bold">
                YAANX - COMING SOON!
              </h2>
              {features.map((item) => (
                <div key={item.id} className="space-y-4 mb-6">
                  <div className="flex items-start space-x-2 mb-6">
                    <span className="text-green-500 text-2xl rounded-full">
                      {item.icon}
                    </span>

                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p
                    className="text-gray-500"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-md">
              By Continuing you are agreeing to our terms & Conditions
            </p>
          </div>

          <div className="sm:px-6 pb-6 pt-[4rem] ">
            <div className="mx-auto max-w-[400px]">
              <h2 className="text-3xl font-bold text-center">
                Join our journey and get early access
              </h2>
              <p className="text-center text-sm my-4">
                Join our extensive waitlist today to spark connection and get
                notified when we launch 🎉
              </p>

              <div className="flex justify-center space-x-[-10px] mx-auto p-4 rounded-lg">
                {[
                  "/1.jpeg",
                  "/2.jpeg",
                  "/3.jpeg",
                  "/4.jpeg",
                  "/5.jpeg",
                  "/6.jpeg",
                ].map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`w-[55px] h-[55px] border ${
                      !darkMode ? "border-black" : "border-white"
                    } bg-gray-300 rounded-full flex justify-center items-center`}
                  >
                    <img
                      src={imageUrl}
                      alt={`circle-image-${index}`}
                      className="w-[55px] h-[55px] rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    name="name"
                    className="w-full p-2 border rounded dark:bg-gray-700"
                    placeholder="Tell us your Name..."
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    className="w-full p-2 border rounded dark:bg-gray-700"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    name="email"
                    className="w-full p-2 border dark:text-gray-100 rounded dark:bg-gray-700"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Which part are you looking forward to?
                  </p>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="appType"
                      value="user"
                      className="form-radio"
                      checked={formData.appType === "user"}
                      onChange={handleInputChange}
                    />
                    <span>User App</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 ml-4">
                    <input
                      type="radio"
                      name="appType"
                      value="driver"
                      className="form-radio"
                      checked={formData.appType === "driver"}
                      onChange={handleInputChange}
                    />
                    <span>Driver App</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-green-500 text-white rounded cursor-pointer"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BgSpot />
      {showPopup && (
        <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}
    </div>
  );
}

const BgSpot = () => {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: "60vw",
        height: "60vw",
        maxWidth: "500px",
        maxHeight: "500px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(66, 201, 66, 0.6) 10%, rgba(66, 201, 66, 0) 70%)",
        borderRadius: "50%",
      }}
    ></div>
  );
};