import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { ChartBar, Target, Zap, Users, Shield, TreeDeciduous } from "lucide-react";

const PersonalWebsite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" dir="ltr">
      {/* <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">GABOARD</h1>
          <nav>
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Gas Sensor Dashboard</Button>
            <Button variant="ghost">Gas Analysis Dashboard</Button>
            <Button variant="ghost">Comprehensive Emissions Dashboard</Button>
          </nav>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-center mb-8">Gas Sensor Dashboard in Oman</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-6 w-6 text-blue-500" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We aim to improve air quality in Oman through precise monitoring and continuous analysis of gas levels in the air, contributing to a healthy and sustainable environment for all residents.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-6 w-6 text-yellow-500" />
                  Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>To provide an effective tool for decision-makers and environmental specialists to monitor and analyze gas levels in different areas of Oman, facilitating immediate actions and long-term strategies to improve air quality.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChartBar className="mr-2 h-6 w-6 text-green-500" />
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Real-time gas level monitoring</li>
                  <li>Analysis of trends and changes over time</li>
                  <li>Identification of the most polluted areas and taking necessary actions</li>
                  <li>Supporting environmental and health decision-making</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-6 w-6 text-purple-500" />
                    Improve Public Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>By monitoring and improving air quality, we contribute to reducing respiratory diseases and improving public health for residents of Oman.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-6 w-6 text-red-500" />
                    Environmental Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Thanks to accurate data, we can take effective actions to protect the environment and reduce pollution in urban areas.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TreeDeciduous className="mr-2 h-6 w-6 text-green-600" />
                    Promote Sustainability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The provided information helps in developing long-term plans to promote environmental sustainability in Oman and improve the quality of life.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; GABOARD</p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalWebsite;
