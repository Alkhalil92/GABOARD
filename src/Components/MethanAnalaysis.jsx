import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";

const rawData = `2018-04-30T00:00:00.000Z,POLYGON((56.478924716219964 17.99989682177798,56.478924716219964 17.99989682177798,53.24767371479064 16.662246008880075,51.91230992812313 19.031632369732307,54.97870117174707 19.995041457978758,56.478924716219964 17.99989682177798)),1820.4945296966437
2018-05-07T00:00:00.000Z,,1830.3752709021933
2018-05-14T00:00:00.000Z,,1814.297740033079
...`; // Full data here

const parsedData = rawData.split('\n').map(line => {
  const [date, aoi, measurement] = line.split(',');
  return {
    date: new Date(date),
    aoi: aoi,
    measurement: parseFloat(measurement)
  };
}).filter(item => !isNaN(item.measurement)).sort((a, b) => a.date - b.date);

const processData = (data) => {
  const yearlyData = data.reduce((acc, curr) => {
    const year = curr.date.getFullYear();
    if (!acc[year]) {
      acc[year] = { year, measurements: [] };
    }
    acc[year].measurements.push(curr.measurement);
    return acc;
  }, {});

  return Object.values(yearlyData).map(yearData => ({
    year: yearData.year,
    average: yearData.measurements.reduce((sum, val) => sum + val, 0) / yearData.measurements.length,
    min: Math.min(...yearData.measurements),
    max: Math.max(...yearData.measurements)
  }));
};

const MethaneAnalysisDashboard = () => {
  const [processedData, setProcessedData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedView, setSelectedView] = useState('trend');

  useEffect(() => {
    setProcessedData(processData(parsedData));
  }, []);

  const filterDataByTimeRange = (data) => {
    if (selectedTimeRange === 'all') return data;
    const currentYear = new Date().getFullYear();
    return data.filter(item => item.year >= currentYear - parseInt(selectedTimeRange) + 1);
  };

  const filteredData = filterDataByTimeRange(processedData);

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="average" stroke="#8884d8" name="Average Methane Concentration (ppb)" />
        <Line type="monotone" dataKey="min" stroke="#82ca9d" name="Minimum" />
        <Line type="monotone" dataKey="max" stroke="#ffc658" name="Maximum" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" name="Year" />
        <YAxis dataKey="average" name="Methane Concentration (ppb)" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Average Methane Concentration" data={filteredData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderSeasonalityChart = () => {
    const monthlyData = parsedData.reduce((acc, curr) => {
      const month = curr.date.getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(curr.measurement);
      return acc;
    }, {});

    const averageMonthlyData = Object.entries(monthlyData).map(([month, measurements]) => ({
      month: parseInt(month),
      average: measurements.reduce((sum, val) => sum + val, 0) / measurements.length
    })).sort((a, b) => a.month - b.month);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={averageMonthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(value) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][value]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="average" fill="#8884d8" name="Average Monthly Methane Concentration" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const calculateTrend = () => {
    if (filteredData.length < 2) {
      return { yearlyChange: 'Unavailable', percentageChange: 'Unavailable' };
    }
    const firstYear = filteredData[0];
    const lastYear = filteredData[filteredData.length - 1];
    const totalYears = lastYear.year - firstYear.year;
    if (totalYears === 0) {
      return { yearlyChange: 'Unavailable', percentageChange: 'Unavailable' };
    }
    const yearlyChange = (lastYear.average - firstYear.average) / totalYears;
    const percentageChange = (yearlyChange / firstYear.average) * 100;
    return {
      yearlyChange: yearlyChange.toFixed(2),
      percentageChange: percentageChange.toFixed(2)
    };
  };

  const trend = calculateTrend();

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white" dir="ltr">
      <h1 className="text-3xl font-bold text-center mb-6">Comprehensive Methane Emissions Analysis in Oman</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Data</SelectItem>
            <SelectItem value="5">Last 5 Years</SelectItem>
            <SelectItem value="3">Last 3 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList className="mb-4">
          <TabsTrigger value="trend">General Trend</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle>General Trend of Methane Concentration</CardTitle>
            </CardHeader>
            <CardContent>{renderTrendChart()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Methane Concentration Distribution Over the Years</CardTitle>
            </CardHeader>
            <CardContent>{renderDistributionChart()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonality">
          <Card>
            <CardHeader>
              <CardTitle>Seasonality in Methane Concentration</CardTitle>
            </CardHeader>
            <CardContent>{renderSeasonalityChart()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredData.length > 0 ? (
            <>
              <p>Average Methane Concentration in Last Year: {filteredData[filteredData.length - 1]?.average.toFixed(2)} ppb</p>
              <p>Yearly Average Change: {trend.yearlyChange} ppb</p>
              <p>Yearly Percentage Change: {trend.percentageChange}%</p>
              <p>Highest Recorded Value: {Math.max(...filteredData.map(d => d.max)).toFixed(2)} ppb</p>
              <p>Lowest Recorded Value: {Math.min(...filteredData.map(d => d.min)).toFixed(2)} ppb</p>
            </>
          ) : (
            <p>Insufficient data for analysis in the selected time range.</p>
          )}
        </CardContent>
      </Card>

      {filteredData.length > 0 && trend.percentageChange !== 'Unavailable' && (
        <Alert className="mt-6">
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            The analysis shows a {parseFloat(trend.percentageChange) > 0 ? "increase" : "decrease"} in methane concentration by {Math.abs(parseFloat(trend.percentageChange))}% annually. This trend requires special attention and further investigation of its potential environmental impacts.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MethaneAnalysisDashboard;
