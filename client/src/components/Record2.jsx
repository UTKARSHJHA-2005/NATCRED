import React, { useEffect } from 'react';
import info1 from '../assets/info (1).png'
import info2 from '../assets/info (2).png'
import info3 from '../assets/info (3).png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const transactionsData = [
  {
    projectName: 'Green Energy Initiative',
    investorName: 'Liam Johnson',
    date: '2023-09-15',
    amount: 1000.00,
  },
  {
    projectName: 'Tech for Schools',
    investorName: 'Olivia Smith',
    date: '2023-09-14',
    amount: 500.00,
  },
  {
    projectName: 'Water Conservation Fund',
    investorName: 'Noah Williams',
    date: '2023-09-13',
    amount: 750.00,
  },
  {
    projectName: 'Healthcare for All',
    investorName: 'Emma Brown',
    date: '2023-09-12',
    amount: -2000.00,
  },
];

const recentProjectsData = [
  {
    initials: 'PC',
    projectName: 'Project Carbon',
    investorName: 'Olive Carton',
    amount: 40000.00,
  },
  {
    initials: 'GS',
    projectName: 'Green Start',
    investorName: 'Jack Jobs',
    amount: 5000.00,
  },
  {
    initials: 'SF',
    projectName: 'Solar Formation',
    investorName: 'Isha Shaan',
    amount: 2500.00,
  },
  {
    initials: 'CW',
    projectName: 'Clear Waste',
    investorName: 'Kim-On-Yung',
    amount: 1000.00,
  },
  {
    initials: 'WF',
    projectName: 'Water for All',
    investorName: 'Sofia Davis',
    amount: 8000.00,
  },
];

const Record2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="p-4 min-h-100vh" style={{ background: '#D1FFBD' }}>
      <div data-aos='fade-down' className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Carbon Credits" value="120" percentage="$190" />
        <StatCard title="Projects Invested" value="45" percentage="$2900" />
        <StatCard title="Products Bought" value="17" percentage="$450" />
        <StatCard title="Projects Succeed" value="19" percentage="$1200" />
      </div>
      <div className="p-6 text-white h-[500px]" style={{ background: '#D1FFBD' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div data-aos='flip-left' className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-black font-bold">Transactions</h2>
              <a href="#" className="text-sm text-green-600 hover:text-green-800">
                View All &rarr;
              </a>
            </div>
            <p className="text-sm text-black mb-4">
              Recent transactions to your projects.
            </p>
            <div className="space-y-4">
              {transactionsData.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-700 py-2 cursor-pointer hover:bg-gray-300 rounded-2xl">
                  <div>
                    <p className="font-semibold text-gray-800">{transaction.projectName}</p>
                    <p className="text-sm text-gray-900">{transaction.investorName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">{transaction.date}</p>
                    <p className={`${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                      {transaction.amount > 0 ? `+ $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-aos='flip-right' className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-black font-bold mb-4">Invested In Projects</h2>
              <a href="#" className="text-sm text-green-600 hover:text-green-800">
                View All &rarr;
              </a>
            </div>
            <div className="space-y-4 cursor-pointer">
              {recentProjectsData.map((project, index) => (
                <div key={index} className="flex items-center justify-between hover:bg-slate-100 rounded-md">
                  <div className="flex items-center ">
                    <div className="bg-green-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center mr-4">
                      {project.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">{project.projectName}</p>
                      <p className="text-sm text-gray-400">{project.investorName}</p>
                    </div>
                  </div>
                  <p className="text-green-400 font-semibold">+ ${project.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg w-99% h-[660px] col-span-10 ">
          <div data-aos='fade-right' className="w-full h-48 rounded-lg">
            <h5 className='text-black text-[20px] font-semibold'>Instrument Detail</h5>
            <img src={info1} alt="Carbon1" className='items-center rounded-lg mt-[20px] shadow-2xl' />
            <h5 className='text-black text-[20px] font-semibold mt-[15px]'>Issuance</h5>
            <img src={info2} alt="Carbon2" className='items-center rounded-lg mt-[20px] shadow-2xl' />
            <h5 className='text-black text-[20px] font-semibold mt-[15px]'>Cooperative Approaches</h5>
            <img src={info3} alt="Carbon3" className='items-center rounded-lg mt-[20px] shadow-2xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, percentage }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
    <div className="flex-grow">
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="text-green-500 font-semibold">{percentage}</div>
  </div>
);

export default Record2;