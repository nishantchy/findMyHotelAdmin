// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

const data = [
  { name: "Jan", userTraffic: 4000, totalEarnings: 2400, bookings: 2400 },
  { name: "Feb", userTraffic: 3000, totalEarnings: 1398, bookings: 2210 },
  { name: "Mar", userTraffic: 2000, totalEarnings: 9800, bookings: 2290 },
  { name: "Apr", userTraffic: 2780, totalEarnings: 3908, bookings: 2000 },
  { name: "May", userTraffic: 1890, totalEarnings: 4800, bookings: 2181 },
  { name: "Jun", userTraffic: 2390, totalEarnings: 3800, bookings: 2500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Hotels" value="120" />
        <DashboardCard title="Total Bookings" value="1,234" />
        <DashboardCard title="Total Users" value="5,678" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="userTraffic" fill="#8884d8" />
              <Bar dataKey="totalEarnings" fill="#82ca9d" />
              <Bar dataKey="bookings" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer> */}
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}
