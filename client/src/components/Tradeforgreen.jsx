import React from 'react';

export default function Tradeforgreen() {
  return (
    <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/carbon2.png')" }}>
      <div className="absolute inset-0 bg-black opacity-20"></div> 
      <div className="relative container mx-auto px-6">
        <div className="text-center rounded-lg text-white py-16 bg-black opacity-45">
          <h2 className="text-4xl font-bold mb-4">Trade for a Greener Tomorrow</h2>
          <ul className="text-lg space-y-2">
            <li>- Encourages sustainable practices and reduces carbon footprint</li>
            <li>- Provides financial incentives for companies and individuals to invest in renewable energy</li>
            <li>- Facilitates global cooperation and collaboration on climate change mitigation</li>
            <li>- Offers a flexible and market-based approach to reducing emissions</li>
            <li>- Enhances corporate social responsibility and brand reputation</li>
            <li>- Creates a new revenue stream for carbon reduction projects</li>
            <li>- Helps countries and companies meet their emission reduction targets</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
