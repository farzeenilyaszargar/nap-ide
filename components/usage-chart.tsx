"use client";

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface UsageChartProps {
    data: {
        date: string;
        usage: number;
    }[];
    title: string;
    color: string;
}

export function UsageChart({ data, title, color }: UsageChartProps) {
    // Styling for custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-xl">
                    <p className="text-gray-500 text-sm mb-1">{label}</p>
                    <p className="text-black font-bold text-lg">
                        {payload[0].value.toLocaleString()} Tokens
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-6">{title}</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#888"
                            tick={{ fill: '#666' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#888"
                            tick={{ fill: '#666' }}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.1)' }} />
                        <Line
                            type="monotone"
                            dataKey="usage"
                            stroke={color}
                            strokeWidth={3}
                            dot={{ fill: color, strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#000' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
