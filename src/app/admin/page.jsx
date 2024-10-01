import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>
      <nav className="space-y-4">
        <Link
          href="/admin/dashboard"
          className="block text-lg text-primary hover:underline"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="block text-lg text-primary hover:underline"
        >
          Users
        </Link>
        <Link
          href="/admin/add-hotel"
          className="block text-lg text-primary hover:underline"
        >
          Add New Hotel
        </Link>
        <Link
          href="/admin/track-orders"
          className="block text-lg text-primary hover:underline"
        >
          Track Orders
        </Link>
        <Link
          href="/admin/hotels"
          className="block text-lg text-primary hover:underline"
        >
          Hotels
        </Link>
        {/* <Link
          href="/admin/offers"
          className="block text-lg text-primary hover:underline"
        >
          Offers
        </Link> */}
      </nav>
    </div>
  );
}
