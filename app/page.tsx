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
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "2847"
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
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Circle className="w-4 h-4" />
              <span>Standard Form: (x-h)²+(y-k)²=r²</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Calculator className="w-4 h-4" />
              <span>General Form: x²+y²+Dx+Ey+F=0</span>
            </div>
          </div>
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
                  <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-200">
                    <p className="text-sm font-medium text-cyan-800 mb-2">Parametric Form</p>
                    <p className="text-sm font-mono text-cyan-900">{result.parametric}</p>
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
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding the Equation of a Circle
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The equation of a circle is one of the most fundamental concepts in coordinate geometry and analytical mathematics. Whether you&apos;re a student learning algebra, an engineer designing circular components, or a programmer creating graphics, understanding how to work with circle equations is essential. This comprehensive guide will teach you everything you need to know about circle equations, from basic concepts to advanced applications.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              What is the Equation of a Circle?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              A circle is defined as the set of all points that are equidistant from a fixed center point. The equation of a circle represents this mathematical relationship in algebraic form. The distance from any point on the circle to the center is called the radius. By using the distance formula and the definition of a circle, we can derive its equation in various forms.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The most common and useful form of a circle equation is the standard form, which clearly shows the circle&apos;s center and radius. However, circles can also be expressed in general form, parametric form, and polar form, each serving different mathematical purposes and applications.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Standard Form of a Circle Equation
            </h2>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 mb-6">
              <p className="text-lg font-semibold text-emerald-900 mb-2">Standard Form Formula:</p>
              <p className="text-2xl font-mono text-emerald-800">(x - h)² + (y - k)² = r²</p>
              <p className="text-sm text-emerald-700 mt-3">
                Where (h, k) is the center of the circle and r is the radius
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              The standard form is the most intuitive way to express a circle equation because it directly reveals the circle&apos;s key properties. In this equation, h represents the x-coordinate of the center, k represents the y-coordinate of the center, and r represents the radius. This form makes it incredibly easy to graph a circle or determine its properties at a glance.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              For example, the equation (x - 3)² + (y + 2)² = 25 represents a circle with center at (3, -2) and radius 5 (since r² = 25, therefore r = 5). The standard form is particularly useful when you need to quickly identify the center and radius, or when you&apos;re sketching the circle on a coordinate plane.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Special Cases in Standard Form
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              When the center of the circle is at the origin (0, 0), the standard form simplifies to x² + y² = r². This is because both h and k equal zero, eliminating those terms from the equation. This simplified form is commonly used in trigonometry and calculus, especially when working with the unit circle where r = 1.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The unit circle equation x² + y² = 1 is particularly important in mathematics as it forms the basis for defining trigonometric functions and is essential in understanding periodic behavior, rotations, and oscillations in physics and engineering.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              General Form of a Circle Equation
            </h2>

            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-6">
              <p className="text-lg font-semibold text-teal-900 mb-2">General Form Formula:</p>
              <p className="text-2xl font-mono text-teal-800">x² + y² + Dx + Ey + F = 0</p>
              <p className="text-sm text-teal-700 mt-3">
                Where D, E, and F are constants
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              The general form of a circle equation is obtained by expanding the standard form and rearranging terms. While less intuitive than standard form, the general form is useful in certain mathematical contexts, particularly when dealing with systems of equations or when the circle equation is derived from other geometric relationships.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              To convert from standard form to general form, you expand the squared terms, combine like terms, and rearrange everything to one side of the equation. Conversely, to convert from general form to standard form, you complete the square for both x and y terms. This process reveals the center coordinates h = -D/2 and k = -E/2, and the radius r = √(h² + k² - F).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Converting Between Forms
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Converting between standard and general form is a critical skill in coordinate geometry. To go from standard form (x - h)² + (y - k)² = r² to general form, expand the binomials: x² - 2hx + h² + y² - 2ky + k² = r². Then rearrange to get x² + y² - 2hx - 2ky + (h² + k² - r²) = 0, which gives you D = -2h, E = -2k, and F = h² + k² - r².
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Going the other direction requires completing the square. Starting with x² + y² + Dx + Ey + F = 0, group the x terms and y terms: (x² + Dx) + (y² + Ey) = -F. Complete the square for each group by adding (D/2)² and (E/2)² to both sides. This reveals the center at (-D/2, -E/2) and radius √((D/2)² + (E/2)² - F).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              How to Find the Equation of a Circle
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Method 1: From Center and Radius
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              The simplest method for finding a circle&apos;s equation is when you know the center point (h, k) and the radius r. Simply substitute these values into the standard form equation (x - h)² + (y - k)² = r². For instance, if the center is (4, -3) and radius is 6, the equation becomes (x - 4)² + (y + 3)² = 36.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Method 2: From Three Points
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              When given three points on the circle, you can find the equation by using the general form x² + y² + Dx + Ey + F = 0 and creating a system of three equations. Substitute each point&apos;s coordinates into the general form, creating three equations with three unknowns (D, E, and F). Solve this system using substitution, elimination, or matrices to find the coefficients.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              For example, if the three points are (1, 1), (2, 4), and (5, 3), substitute each into the general form to get three equations. Solving this system yields the values of D, E, and F, which you can then convert to standard form if needed to identify the center and radius clearly.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Method 3: From Diameter Endpoints
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you know the endpoints of a diameter, the center is simply the midpoint of those two points, and the radius is half the distance between them. Use the midpoint formula to find (h, k) = ((x₁+x₂)/2, (y₁+y₂)/2) and the distance formula to find r = ½√((x₂-x₁)² + (y₂-y₁)²). Then plug these into the standard form equation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Parametric Equations of a Circle
            </h2>

            <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 mb-6">
              <p className="text-lg font-semibold text-cyan-900 mb-2">Parametric Form:</p>
              <p className="text-xl font-mono text-cyan-800">x = h + r·cos(θ)</p>
              <p className="text-xl font-mono text-cyan-800">y = k + r·sin(θ)</p>
              <p className="text-sm text-cyan-700 mt-3">
                Where θ is the parameter (usually from 0 to 2π)
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Parametric equations express the circle in terms of a parameter, typically an angle θ. This form is extremely useful in calculus, computer graphics, animation, and physics simulations where you need to trace the path of a point moving around the circle. As θ varies from 0 to 2π, the parametric equations trace out the complete circle.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The parametric form connects directly to trigonometry. The cosine function determines the horizontal displacement from the center, while the sine function determines the vertical displacement. This makes parametric equations ideal for circular motion problems, orbital mechanics, and creating circular paths in computer programs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Graphing Circle Equations
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              To graph a circle equation, first convert it to standard form if it isn&apos;t already. This reveals the center (h, k) and radius r. Plot the center point on the coordinate plane, then use the radius to mark points that are r units away from the center in all directions. The easiest points to plot are r units directly above, below, left, and right of the center.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              For the equation (x - 2)² + (y + 1)² = 16, the center is (2, -1) and radius is 4. From the center, move 4 units in each cardinal direction to get points (6, -1), (-2, -1), (2, 3), and (2, -5). These four points help you sketch an accurate circle. For more precision, you can plot additional points using the parametric form or by choosing x-values and solving for y.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Using Technology to Graph Circles
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Graphing calculators and computer software can plot circles precisely. Most graphing calculators require you to solve the equation for y, giving you two functions: y = k + √(r² - (x-h)²) for the upper semicircle and y = k - √(r² - (x-h)²) for the lower semicircle. Plotting both functions simultaneously creates the complete circle. Online graphing tools like Desmos can handle circle equations directly in standard form.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Applications of Circle Equations
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Engineering and Architecture
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Circle equations are essential in engineering design for circular components like gears, wheels, pipes, and circular structures. Architects use circle equations when designing domes, circular windows, roundabouts, and curved facades. The precise mathematical description allows for accurate computer-aided design (CAD) and ensures components fit together perfectly during construction or manufacturing.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Computer Graphics and Game Development
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              In computer graphics, circle equations are used to render circular shapes, detect collisions between circular objects, and create circular motion paths for game characters or animations. The parametric form is particularly useful for animating objects moving in circular paths, while the standard form is ideal for collision detection algorithms that need to quickly determine if points or other circles intersect.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Physics and Astronomy
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Circle equations model circular orbits in celestial mechanics (when approximating elliptical orbits), analyze rotational motion, and describe wave patterns. In optics, circle equations help design lenses and mirrors. In acoustics, they model sound wave propagation patterns. The mathematical precision of circle equations allows physicists to make accurate predictions about system behavior.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              GPS and Navigation
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              GPS systems use circle equations to determine position through trilateration. Each satellite signal defines a circle (or sphere in 3D) of possible positions. The intersection of multiple circles pinpoints the exact location. Navigation systems use circle equations to calculate shortest paths along circular arcs and to define search radii around points of interest.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Common Mistakes and How to Avoid Them
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Sign Errors in Standard Form
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              One of the most common mistakes is misinterpreting signs in the standard form. Remember that the equation (x - h)² + (y - k)² = r² has subtraction signs. If you see (x + 3)², the center&apos;s x-coordinate is actually -3, not +3. The equation is really (x - (-3))². Always rewrite addition as subtraction of a negative to avoid confusion: (x + 3)² = (x - (-3))².
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Forgetting to Square the Radius
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              The standard form has r² on the right side, not r. If the radius is 5, the right side should be 25, not 5. Conversely, when finding the radius from an equation like (x - 1)² + (y + 2)² = 49, remember to take the square root: r = √49 = 7, not r = 49.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Incomplete Square Errors
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              When completing the square to convert general form to standard form, students often forget to add the completing square constants to both sides of the equation. If you add (D/2)² to complete the square for x, you must add the same value to the other side. Forgetting this step leads to an incorrect radius calculation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Advanced Topics
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Circles in Three Dimensions
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              While we typically work with circles in 2D, circles exist in 3D space as well. A circle in 3D is the intersection of a plane and a sphere, or can be described using vector equations. The parametric form extends naturally to 3D by adding a z-component, though the resulting shape may be a circle lying in a tilted plane rather than parallel to a coordinate plane.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Polar Form of Circle Equations
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              In polar coordinates, a circle centered at the origin has the simple equation r = a (where a is the radius). Circles not centered at the origin have more complex polar equations. Converting between Cartesian and polar forms requires using the relationships x = r·cos(θ) and y = r·sin(θ). Polar form is particularly useful in calculus when computing areas and arc lengths.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Families of Circles
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              A family of circles shares a common property, such as passing through two fixed points or being tangent to two fixed lines. These families can be represented by equations with parameters. For example, all circles passing through points (a, 0) and (-a, 0) form a family that can be expressed with a single equation containing a parameter. Understanding families of circles is important in advanced geometry and differential equations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Practice Problems and Solutions
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="font-semibold text-gray-900 mb-2">Problem 1:</p>
              <p className="text-gray-700 mb-3">Find the equation of a circle with center (3, -4) and radius 5.</p>
              <p className="text-sm text-gray-600 mb-2">Solution:</p>
              <p className="text-gray-700">Using standard form: (x - 3)² + (y - (-4))² = 5²</p>
              <p className="text-gray-700 font-semibold">Answer: (x - 3)² + (y + 4)² = 25</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="font-semibold text-gray-900 mb-2">Problem 2:</p>
              <p className="text-gray-700 mb-3">Convert x² + y² - 6x + 8y - 11 = 0 to standard form.</p>
              <p className="text-sm text-gray-600 mb-2">Solution:</p>
              <p className="text-gray-700">Group x and y terms: (x² - 6x) + (y² + 8y) = 11</p>
              <p className="text-gray-700">Complete the square: (x² - 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16</p>
              <p className="text-gray-700">(x - 3)² + (y + 4)² = 36</p>
              <p className="text-gray-700 font-semibold">Answer: Center (3, -4), radius 6</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-2">Problem 3:</p>
              <p className="text-gray-700 mb-3">Find the equation of a circle passing through points (0, 0), (4, 0), and (0, 3).</p>
              <p className="text-sm text-gray-600 mb-2">Solution:</p>
              <p className="text-gray-700">The center lies on perpendicular bisectors of the segments connecting these points.</p>
              <p className="text-gray-700">Midpoint of (0,0) and (4,0) is (2,0); perpendicular bisector is x = 2</p>
              <p className="text-gray-700">Midpoint of (0,0) and (0,3) is (0,1.5); perpendicular bisector is y = 1.5</p>
              <p className="text-gray-700">Center is at (2, 1.5), radius = √(2² + 1.5²) = 2.5</p>
              <p className="text-gray-700 font-semibold">Answer: (x - 2)² + (y - 1.5)² = 6.25</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-gray-900 mb-2">What&apos;s the difference between a circle equation and an ellipse equation?</p>
                <p className="text-gray-700">A circle equation has equal coefficients for x² and y² terms (both are 1), while an ellipse has different coefficients. In standard form, a circle has one radius value (r), while an ellipse has two different values (semi-major and semi-minor axes).</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-gray-900 mb-2">Can a circle equation have negative radius?</p>
                <p className="text-gray-700">No, the radius must always be positive. If your calculation yields r² &lt; 0, this indicates there is no real circle satisfying the given conditions. This often occurs when the general form coefficients don&apos;t actually represent a valid circle.</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-gray-900 mb-2">How do I find where a line intersects a circle?</p>
                <p className="text-gray-700">Substitute the line equation (usually y = mx + b) into the circle equation, creating a quadratic equation in one variable. Solve this quadratic to find the x-coordinates of intersection points, then substitute back to find y-coordinates. The discriminant tells you how many intersection points exist: two (line crosses circle), one (tangent line), or zero (line misses circle).</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-gray-900 mb-2">What&apos;s the equation of a circle tangent to the x-axis?</p>
                <p className="text-gray-700">If a circle is tangent to the x-axis, the distance from its center to the x-axis equals the radius. This means k = r (if tangent from above) or k = -r (if tangent from below). The equation becomes (x - h)² + (y - r)² = r² or (x - h)² + (y + r)² = r².</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Conclusion
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding the equation of a circle is fundamental to success in mathematics, science, and engineering. Whether you&apos;re working with the standard form (x - h)² + (y - k)² = r², the general form x² + y² + Dx + Ey + F = 0, or parametric and polar forms, each representation offers unique advantages for different applications.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              This calculator simplifies the process of working with circle equations by instantly converting between forms, finding centers and radii, and providing step-by-step solutions. By mastering these concepts and using tools like this calculator, you&apos;ll be well-equipped to tackle any problem involving circles in coordinate geometry.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Whether you&apos;re a student preparing for exams, a professional engineer designing circular components, or a programmer implementing graphics algorithms, the equation of a circle remains a powerful and versatile mathematical tool that connects algebra, geometry, and real-world applications.
            </p>
          </article>
        </div>

        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-6 h-6 text-emerald-600" />
            Related Circle Calculators
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            
              href="https://circumferenceofacircle.com"
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Circumference Calculator</h3>
              <p className="text-sm text-gray-600">Calculate circle circumference using C = 2πr or C = πd</p>
            </a>
            
              href="https://areaofcircle.com"
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Area Calculator</h3>
              <p className="text-sm text-gray-600">Find circle area using A = πr² formula</p>
            </a>
            
              href="https://radiusofacircle.com"
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Radius Calculator</h3>
              <p className="text-sm text-gray-600">Calculate radius from circumference, area, or diameter</p>
            </a>
          </div>
        </div>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Circle Calculator Network</h2>
            <p className="text-gray-400">Professional mathematical tools for education and professional use</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Core Calculators</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://circumferenceofacircle.com" className="hover:text-white transition-colors">Circumference Calculator</a></li>
                <li><a href="https://areaofcircle.com" className="hover:text-white transition-colors">Area Calculator</a></li>
                <li><a href="https://equationofacircle.com" className="hover:text-white font-semibold">Equation (Current)</a></li>
                <li><a href="https://radiusofacircle.com" className="hover:text-white transition-colors">Radius Calculator</a></li>
                <li><a href="https://diameterofacircle.com" className="hover:text-white transition-colors">Diameter Calculator</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Formula Guides</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://circleareaformula.com" className="hover:text-white transition-colors">Area Formula πr²</a></li>
                <li><a href="https://circumferenceofacircleformula.com" className="hover:text-white transition-colors">Circumference Formula 2πr</a></li>
                <li><a href="https://areaofacircleformula.com" className="hover:text-white transition-colors">Circle Area Formula</a></li>
                <li><a href="https://formulaforareaofacircle.com" className="hover:text-white transition-colors">Formula Guide</a></li>
                <li><a href="https://surfaceareaofacircle.com" className="hover:text-white transition-colors">Surface Area Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Step-by-Step Tutorials</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://howtofindcircumference.com" className="hover:text-white transition-colors">How to Find Circumference</a></li>
                <li><a href="https://howtofindareaofacircle.com" className="hover:text-white transition-colors">How to Find Area</a></li>
                <li><a href="https://howtofindtheareaofacircle.com" className="hover:text-white transition-colors">Area Calculation Guide</a></li>
                <li><a href="https://howtofindcircumferenceofacircle.com" className="hover:text-white transition-colors">Circumference Guide</a></li>
                <li><a href="https://howtofindthecircumferenceofacircle.com" className="hover:text-white transition-colors">Complete Circumference Tutorial</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Specialized Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://unitcircleradians.com" className="hover:text-white transition-colors">Unit Circle Radians</a></li>
                <li><a href="https://minecraftcirclechart.com" className="hover:text-white transition-colors">Minecraft Circle Chart</a></li>
                <li><a href="https://circlepng.com" className="hover:text-white transition-colors">Circle Images PNG</a></li>
                <li><a href="https://radiancircle.com" className="hover:text-white transition-colors">Radian Calculator</a></li>
                <li><a href="https://circleequation.com" className="hover:text-white transition-colors">Circle Equation Tools</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            <p>© 2025 Circle Calculator Network. All calculators are free to use for educational and professional purposes.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}