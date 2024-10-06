import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const GreenHouseGasesDashboard = () => {
  const [data, setData] = useState({
    concentrationLevels: [],
    monthlyEmissions: [],
    annualTrends: [],
    sectoralDistribution: [],
    reductionEfforts: []
  });

  useEffect(() => {
    // Fetch or generate data here
    setData({
      concentrationLevels: [
        { name: 'CO2', value: 65 },
        { name: 'CH4', value: 20 },
        { name: 'N2O', value: 15 }
      ],
      monthlyEmissions: [
        { month: 'January', CO2: 20, CH4: 15, N2O: 10 },
        { month: 'February', CO2: 22, CH4: 16, N2O: 11 },
        { month: 'March', CO2: 25, CH4: 18, N2O: 12 },
        { month: 'April', CO2: 23, CH4: 17, N2O: 11 }
      ],
      annualTrends: [
        { year: 2020, value: 10 },
        { year: 2021, value: 15 },
        { year: 2022, value: 22 },
        { year: 2023, value: 38 }
      ],
      sectoralDistribution: [
        { name: 'Energy', value: 40 },
        { name: 'Industry', value: 30 },
        { name: 'Agriculture', value: 20 },
        { name: 'Transportation', value: 10 }
      ],
      reductionEfforts: [
        { platform: 'Project 1', cost: 5 },
        { platform: 'Project 2', cost: 12 },
        { platform: 'Project 3', cost: 18 },
        { platform: 'Project 4', cost: 25 }
      ]
    });
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white" dir="ltr">
      <h1 className="text-3xl font-bold text-center mb-6">Greenhouse Gases Reports</h1>
      <h2 className="text-xl font-semibold text-center mb-4">Statistical Charts</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Greenhouse Gases Concentration Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.concentrationLevels}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.concentrationLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Greenhouse Gas Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.monthlyEmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="CO2" fill="#8884d8" />
                <Bar dataKey="CH4" fill="#82ca9d" />
                <Bar dataKey="N2O" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annual Emissions Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.annualTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sectoral Emissions Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.sectoralDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.sectoralDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Emission Reduction Efforts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.reductionEfforts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="platform" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GreenHouseGasesDashboard;
