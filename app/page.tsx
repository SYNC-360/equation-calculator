'use client';

import { useState } from 'react';
import { Calculator, Circle, Ruler, ArrowRight } from 'lucide-react';

export default function EquationCalculator() {
  const [h, setH] = useState<string>('0');
  const [k, setK] = useState<string>('0');
  const [radius, setRadius] = useState<string>('5');
  const [generalD, setGeneralD] = useState<string>('');
  const [generalE, setGeneralE] = useState<string>('');
  const [generalF, setGeneralF] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'standard' | 'general'>('standard');

  const calculateStandardForm = () => {
    const hNum = parseFloat(h) || 0;
    const kNum = parseFloat(k) || 0;
    const r = parseFloat(radius) || 0;

    return {
      standard: `(x ${hNum >= 0 ? '-' : '+'} ${Math.abs(hNum)})² + (y ${kNum >= 0 ? '-' : '+'} ${Math.abs(kNum)})² = ${(r * r).toFixed(2)}`,
      center: `(${hNum}, ${kNum})`,
      radius: r.toFixed(2),
      general: `x² + y² ${-2 * hNum >= 0 ? '+' : ''} ${(-2 * hNum).toFixed(2)}x ${-2 * kNum >= 0 ? '+' : ''} ${(-2 * kNum).toFixed(2)}y ${hNum * hNum + kNum * kNum - r * r >= 0 ? '+' : ''} ${(hNum * hNum + kNum * kNum - r * r).toFixed(2)} = 0`,
      parametric: `x = ${hNum} + ${r}cos(θ), y = ${kNum} + ${r}sin(θ)`,
    };
  };

  const calculateFromGeneral = () => {
    const D = parseFloat(generalD) || 0;
    const E = parseFloat(generalE) || 0;
    const F = parseFloat(generalF) || 0;

    const hCalc = -D / 2;
    const kCalc = -E / 2;
    const rCalc = Math.sqrt(hCalc * hCalc + kCalc * kCalc - F);

    if (isNaN(rCalc) || rCalc <= 0) {
      return {
        error: 'Invalid circle equation - check your coefficients',
        center: 'N/A',
        radius: 'N/A',
        standard: 'N/A',
      };
    }

    return {
      center: `(${hCalc.toFixed(2)}, ${kCalc.toFixed(2)})`,
      radius: rCalc.toFixed(2),
      standard: `(x ${hCalc >= 0 ? '-' : '+'} ${Math.abs(hCalc).toFixed(2)})² + (y ${kCalc >= 0 ? '-' : '+'} ${Math.abs(kCalc).toFixed(2)})² = ${(rCalc * rCalc).toFixed(2)}`,
      general: `x² + y² ${D >= 0 ? '+' : ''}${D}x ${E >= 0 ? '+' : ''}${E}y ${F >= 0 ? '+' : ''}${F} = 0`,
    };
  };

  const result = activeTab === 'standard' ? calculateStandardForm() : calculateFromGeneral();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Equation of a Circle Calculator",
            "description": "Calculate circle equations in standard form, general form, and parametric form with step-by-step solutions",
            "url": "https://equationofacircle.com",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Equation of a Circle Calculator
          </h1>
          <p className="text-xl text-emerald-100 mb-6">
            Convert between standard form, general form, and parametric equations instantly
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'standard'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              From Center & Radius
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'general'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              From General Form
            </button>
          </div>

          {activeTab === 'standard' ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-emerald-600" />
                  Input Values
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Center X-Coordinate (h)
                    </label>
                    <input
                      type="number"
                      value={h}
                      onChange={(e) => setH(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter h value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Center Y-Coordinate (k)
                    </label>
                    <input
                      type="number"
                      value={k}
                      onChange={(e) => setK(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter k value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius (r)
                    </label>
                    <input
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter radius"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  Circle Equations
                </h3>
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
                    <p className="text-sm font-medium text-emerald-800 mb-2">Standard Form</p>
                    <p className="text-lg font-mono text-emerald-900">{result.standard}</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg border-2 border-teal-200">
                    <p className="text-sm font-medium text-teal-800 mb-2">General Form</p>
                    <p className="text-lg font-mono text-teal-900">{result.general}</p>
                  </div>
                  {'parametric' in result && (
                    <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-200">
                      <p className="text-sm font-medium text-cyan-800 mb-2">Parametric Form</p>
                      <p className="text-sm font-mono text-cyan-900">{result.parametric}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Center</p>
                      <p className="text-lg font-semibold text-gray-800">{result.center}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Radius</p>
                      <p className="text-lg font-semibold text-gray-800">{result.radius}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  General Form: x² + y² + Dx + Ey + F = 0
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coefficient D (x term)
                    </label>
                    <input
                      type="number"
                      value={generalD}
                      onChange={(e) => setGeneralD(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter D"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coefficient E (y term)
                    </label>
                    <input
                      type="number"
                      value={generalE}
                      onChange={(e) => setGeneralE(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter E"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Constant F
                    </label>
                    <input
                      type="number"
                      value={generalF}
                      onChange={(e) => setGeneralF(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-lg"
                      placeholder="Enter F"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Results</h3>
                <div className="space-y-4">
                  {'error' in result ? (
                    <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                      <p className="text-red-800">{result.error}</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
                        <p className="text-sm font-medium text-emerald-800 mb-2">Standard Form</p>
                        <p className="text-lg font-mono text-emerald-900">{result.standard}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600">Center</p>
                          <p className="text-lg font-semibold text-gray-800">{result.center}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600">Radius</p>
                          <p className="text-lg font-semibold text-gray-800">{result.radius}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding the Equation of a Circle
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The equation of a circle is one of the most fundamental concepts in coordinate geometry. This calculator helps you work with circle equations in multiple forms.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-6 h-6 text-emerald-600" />
            Related Circle Calculators
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="https://circumferenceofacircle.com" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Circumference Calculator</h3>
              <p className="text-sm text-gray-600">Calculate circumference</p>
            </a>
            <a href="https://areaofcircle.com" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Area Calculator</h3>
              <p className="text-sm text-gray-600">Find circle area</p>
            </a>
            <a href="https://radiusofacircle.com" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Radius Calculator</h3>
              <p className="text-sm text-gray-600">Calculate radius</p>
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Circle Calculator Network</h2>
            <p className="text-gray-400">Professional mathematical tools</p>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            <p>© 2025 Circle Calculator Network</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
