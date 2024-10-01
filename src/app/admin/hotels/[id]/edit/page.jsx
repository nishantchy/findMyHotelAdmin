"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function EditHotel({ params }) {
  const router = useRouter();
  const { id } = params;
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id || id === "undefined") {
        setError("Invalid hotel ID");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/hotels/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hotel data");
        }
        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHotel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || id === "undefined") {
      setError("Cannot update hotel with invalid ID");
      return;
    }

    try {
      console.log("Sending data:", JSON.stringify(hotel));
      const response = await fetch(`http://localhost:8000/api/hotels/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          console.error("Server response:", errorData);
          throw new Error(
            `Failed to update hotel: ${
              errorData.message || response.statusText
            }`
          );
        } else {
          const textResponse = await response.text();
          console.error("Server response:", textResponse);
          throw new Error(
            `Failed to update hotel: ${
              textResponse || "Non-JSON response received"
            }`
          );
        }
      }

      const updatedHotel = await response.json();
      console.log("Update successful:", updatedHotel);
      setHotel(updatedHotel);
      setSuccessMessage("Hotel updated successfully!");

      setTimeout(() => {
        router.push("/admin/hotels");
      }, 2000);
    } catch (err) {
      console.error("Error details:", err);
      setErrorMessage(`Failed to update hotel: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const response = await fetch(`http://localhost:8000/api/hotels/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete hotel");
        }

        // Remove the deleted hotel from the state
        setHotels(hotels.filter((hotel) => hotel._id !== id));
        toast.success("Hotel deleted successfully");
      } catch (error) {
        console.error("Error deleting hotel:", error);
        toast.error("Failed to delete hotel");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const nestedKey = name.split(".")[1];
      setHotel((prevHotel) => ({
        ...prevHotel,
        location: {
          ...prevHotel.location,
          [nestedKey]: value,
        },
      }));
    } else {
      setHotel((prevHotel) => ({
        ...prevHotel,
        [name]: value,
      }));
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!hotel) return <div className="text-gray-700">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Edit Hotel Information
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={hotel.name}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="location.address"
              value={hotel.location.address}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="ratings"
              className="block text-lg font-medium text-gray-700"
            >
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              name="ratings"
              value={hotel.ratings}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="numberOfRooms"
              className="block text-lg font-medium text-gray-700"
            >
              Number of Rooms
            </label>
            <input
              type="number"
              id="numberOfRooms"
              name="numberOfRooms"
              value={hotel.numberOfRooms}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-lg font-medium rounded-2xl text-white bg-primary "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
