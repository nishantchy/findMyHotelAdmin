"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p className="text-center text-primary">Loading map...</p>,
});

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    pricePerPerson: "",
    location: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
    },
    numberOfRooms: "",
    ratings: "",
    propertyType: "",
    email: "",
    phoneNumber: "",
    basePrice: "",
    roomTypes: [],
  });
  const roomTypeOptions = [
    "Suite",
    "Single",
    "Double",
    "King",
    "Queen",
    "Deluxe",
  ];
  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...acceptedFiles],
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  const handleRoomTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      roomTypes: checked
        ? [...prevState.roomTypes, value]
        : prevState.roomTypes.filter((type) => type !== value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((image) => {
          data.append("images", image);
        });
      } else if (key === "location") {
        data.append("location", JSON.stringify(formData.location));
      } else if (key === "roomTypes") {
        data.append("roomTypes", JSON.stringify(formData.roomTypes));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/hotels", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      toast.success("Hotel added successfully!");
      console.log("Hotel added successfully:", result);
    } catch (error) {
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        toast.warning(
          "Hotel may have been added, but there was a network error. Please check your database."
        );
        console.warn(
          "Possible network error, but hotel might have been added:",
          error
        );
      } else {
        toast.error("Error adding hotel: " + error.message);
        console.error("Error adding hotel:", error);
      }
    }
  };

  return (
    <div className="bg-gradient-radial from-white to-gray-100 min-h-screen py-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6"
      >
        <h1 className="text-2xl font-title text-primary mb-4">Add New Hotel</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Hotel Name"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-primary"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {formData.images.length > 0 && (
          <div className="mt-2">
            <p>Selected files:</p>
            <ul className="list-disc pl-5">
              {formData.images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="pricePerPerson"
            value={formData.pricePerPerson}
            onChange={handleInputChange}
            placeholder="Price Per Person"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="text"
            name="name"
            value={formData.location.name}
            onChange={handleLocationChange}
            placeholder="Location Name"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <input
          type="text"
          name="address"
          value={formData.location.address}
          onChange={handleLocationChange}
          placeholder="Address"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleInputChange}
            placeholder="Number of Rooms"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleInputChange}
            placeholder="Ratings"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            placeholder="Property Type"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleInputChange}
            placeholder="Base Price"
            required
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Room Types:</p>
          <div className="grid grid-cols-3 gap-2">
            {roomTypeOptions.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="roomTypes"
                  value={type}
                  checked={formData.roomTypes.includes(type)}
                  onChange={handleRoomTypeChange}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-64 w-full relative rounded-lg overflow-hidden">
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="latitude"
            value={formData.location.latitude}
            onChange={handleLocationChange}
            placeholder="Latitude"
            readOnly
            className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="number"
            name="longitude"
            value={formData.location.longitude}
            onChange={handleLocationChange}
            placeholder="Longitude"
            readOnly
            className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition duration-300 font-bold text-sm"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotelForm;
