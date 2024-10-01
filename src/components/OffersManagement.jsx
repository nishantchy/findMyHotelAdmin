import { useState } from "react";

export default function OffersManagement() {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Luxury Hotel", featured: false },
    { id: 2, name: "Seaside Resort", featured: true },
    // Add more hotel data as needed
  ]);

  const toggleFeatured = (id) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === id ? { ...hotel, featured: !hotel.featured } : hotel
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Manage Offers
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hotel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hotel.featured ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleFeatured(hotel.id)}
                    className={`px-4 py-2 rounded ${
                      hotel.featured
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {hotel.featured
                      ? "Remove from Featured"
                      : "Add to Featured"}
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
