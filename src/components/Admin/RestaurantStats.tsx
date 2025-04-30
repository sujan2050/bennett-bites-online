
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { RestaurantStats as RestaurantStatsType } from "../../types";

interface RestaurantStatsProps {
  data: RestaurantStatsType[];
}

const colors = ["#0EA5E9", "#38BDF8", "#0369A1", "#0284C7", "#0891B2", "#06B6D4"];

const RestaurantStatsChart = ({ data }: RestaurantStatsProps) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Restaurant Performance</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="restaurantName" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`₹${value}`, 'Revenue'];
                return [value, name];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" radius={[5, 5, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="totalOrders" name="Orders" fill="#10B981" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RestaurantStatsChart;
