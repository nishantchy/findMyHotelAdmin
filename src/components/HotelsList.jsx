export default function HotelsList() {
  const hotels = [
    { id: 1, name: "Luxury Hotel", location: "Paris, France", rating: 4.5 },
    { id: 2, name: "Seaside Resort", location: "Bali, Indonesia", rating: 4.2 },
    // Add more hotel data as needed
  ];

  const handleEdit = (id) => {
    // Handle edit functionality
    console.log(`Edit hotel with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality
    console.log(`Delete hotel with id: ${id}`);
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
                Actions
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
                  {hotel.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hotel.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(hotel.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
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
