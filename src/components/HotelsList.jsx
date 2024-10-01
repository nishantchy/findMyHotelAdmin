"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function HotelsList() {
  const router = useRouter();

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      let data = await fetch("http://localhost:8000/api/hotels");
      let fetchedHotels = await data.json();
      setHotels(fetchedHotels);
    };
    fetchHotels();
  }, []);

  // Handle edit
  const handleEdit = (id) => {
    if (id) {
      router.push(`/admin/hotels/${id}/edit`);
    } else {
      console.error("Hotel ID is undefined");
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Hotels</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rooms Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hotel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hotel.location.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hotel.ratings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hotel.numberOfRooms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(hotel._id)}
                    className="text-gray-500 hover:text-indigo-900 mr-4"
                  >
                    <MdModeEdit
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <MdDelete
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
