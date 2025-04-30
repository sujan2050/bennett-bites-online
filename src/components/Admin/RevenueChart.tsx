
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface RevenueData {
  date: string;
  amount: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  title: string;
}

const RevenueChart = ({ data, title }: RevenueChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#0EA5E9" 
              strokeWidth={2} 
              dot={{ stroke: '#0EA5E9', strokeWidth: 2, fill: '#fff', r: 4 }}
              activeDot={{ stroke: '#0EA5E9', strokeWidth: 2, fill: '#0EA5E9', r: 6 }}
            />
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Revenue']}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
