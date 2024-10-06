import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Checkbox } from './ui/Checkbox';

const gasTypes = [
  { name: 'CO2', maxLimit: 1000, unit: 'ppm' },
  { name: 'CH4', maxLimit: 500, unit: 'ppm' },
  { name: 'N2O', maxLimit: 1, unit: 'ppm' },
  { name: 'O3', maxLimit: 70, unit: 'ppb' }
];

const regions = [
  'Muscat', 'Dhofar', 'Musandam', 'Al Buraimi', 'Ad Dakhiliyah',
  'North Al Batinah', 'South Al Batinah', 'South Ash Sharqiyah', 'North Ash Sharqiyah', 'Al Dhahirah', 'Al Wusta'
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GasSensorDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedGas, setSelectedGas] = useState(gasTypes[0].name);
  const [newReading, setNewReading] = useState('');
  const [selectedGases, setSelectedGases] = useState(gasTypes.map(gas => gas.name));
  const [selectedRegions, setSelectedRegions] = useState(regions);

  useEffect(() => {
    const initialData = regions.map(region => ({
      region: region,
      ...gasTypes.reduce((acc, gas) => {
        acc[gas.name] = Math.floor(Math.random() * gas.maxLimit);
        return acc;
      }, {})
    }));
    setSensorData(initialData);
  }, []);

  const handleAddReading = () => {
    if (newReading && !isNaN(newReading)) {
      const updatedData = sensorData.map(item => 
        item.region === selectedRegion 
          ? { ...item, [selectedGas]: parseFloat(newReading) }
          : item
      );
      setSensorData(updatedData);
      setNewReading('');
    }
  };

  const handleGasToggle = (gasName) => {
    setSelectedGases(prev => 
      prev.includes(gasName) ? prev.filter(g => g !== gasName) : [...prev, gasName]
    );
  };

  const handleRegionToggle = (regionName) => {
    setSelectedRegions(prev => 
      prev.includes(regionName) ? prev.filter(r => r !== regionName) : [...prev, regionName]
    );
  };

  const filteredSensorData = sensorData.filter(item => selectedRegions.includes(item.region));

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white" dir="ltr">
      <h1 className="text-3xl font-bold text-center mb-6">Gas Sensors Dashboard - Oman</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedGas} onValueChange={setSelectedGas}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gas Type" />
              </SelectTrigger>
              <SelectContent>
                {gasTypes.map(gas => (
                  <SelectItem key={gas.name} value={gas.name}>{gas.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={newReading}
              onChange={(e) => setNewReading(e.target.value)}
              placeholder="Enter New Reading"
            />
            <Button onClick={handleAddReading}>Add Reading</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Display Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Gases</h3>
              {gasTypes.map(gas => (
                <div key={gas.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gas-${gas.name}`}
                    checked={selectedGases.includes(gas.name)}
                    onCheckedChange={() => handleGasToggle(gas.name)}
                  />
                  <label htmlFor={`gas-${gas.name}`}>{gas.name}</label>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">Regions</h3>
              {regions.map(region => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={`region-${region}`}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={() => handleRegionToggle(region)}
                  />
                  <label htmlFor={`region-${region}`}>{region}</label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gas Levels by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredSensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedGases.map((gasName, index) => (
                <Bar key={gasName} dataKey={gasName} fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GasSensorDashboard;
