import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import '../styles/Dashboard.css';

interface RegistrationChartProps {
  data: { time: Date; count: number }[];
}

const RegistrationChart: React.FC<RegistrationChartProps> = ({ data }) => {
  // Format time for display
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Convert Date objects to strings for recharts compatibility
  const formattedData = data.map((point) => ({
    ...point,
    time: point.time.toISOString(), // Convert Date to ISO string
  }));

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time"
            tickFormatter={formatTime}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={formatTime}
            formatter={(value: number) => [value, 'Registrations']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="Registrations"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;