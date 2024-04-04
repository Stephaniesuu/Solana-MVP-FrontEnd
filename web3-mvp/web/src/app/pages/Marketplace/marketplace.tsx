import { Grid } from 'antd';
// @ts-ignore
import { TopVaults } from './data';
// @ts-ignore
import { Vaults } from './data';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Marketplace() {
  const [currentPage, setCurrentPage] = useState(1);

  const vaultsPerPage = 8;
  const indexOfLastVault = currentPage * vaultsPerPage;
  const indexOfFirstVault = indexOfLastVault - vaultsPerPage;
  const currentVaults = Vaults.slice(indexOfFirstVault, indexOfLastVault);

  // 翻页函数
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="my-10 mx-64">
      <h1 className="text-3xl font-bold mb-4 text-left text-black min-w-full">
        Top Vaults
      </h1>
      <div className="grid grid-cols-4 gap-12 mb-12">
        {TopVaults.map((strategy: any) => (
          <Link to="/vaultdetail" key={strategy.id}>
            <div className="border rounded-2xl bg-zinc-300 p-2">
            <img
              src={strategy.NFTAvatar}
              alt="Cover Image"
              className="rounded-xl"
            />
            <div className="font-bold text-xl">{strategy.VaultName}</div>
            <div className="flex justify-between">
              <div>{strategy.creator}</div>
              <div>{strategy.CreationTime}</div>
            </div>
          </div>
          </Link>
         
        ))}
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          type="button"
          className="px-4 py-2 inline-flex justify-center rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Filter
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Search Bar"
          className="px-4 py-2 rounded-xl border border-gray-400"
        />
      </div>

      <div className="grid grid-cols-4 gap-10 gap-y-8">
        {Array.from({
          length: Math.min(vaultsPerPage, currentVaults.length),
        }).map((_, index) => (
          <Link to="/vaultdetail" key={currentVaults[index].id}>
            <div
              className="border rounded-2xl bg-zinc-300 p-2"
            >
              <img
                src={currentVaults[index].NFTAvatar}
                alt="Cover Image"
                className="rounded-xl "
              />
              <div className="font-bold text-xl">
                {currentVaults[index].VaultName}
              </div>
              <div className="flex justify-between">
                <div>{currentVaults[index].creator}</div>
                <div>{currentVaults[index].CreationTime}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* paginate */}
      <div className="flex justify-center items-center mt-4 pt-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) paginate(currentPage - 1);
          }}
          className="px-4 py-2 border border-gray-300 text-gray-500 hover:bg-gray-100 rounded-l"
        >
          &lt;
        </a>

        {Array.from(
          { length: Math.ceil(Vaults.length / vaultsPerPage) },
          (_, i) => i + 1
        ).map((number) => (
          <a
            href="#"
            key={number}
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }}
            className={`px-4 py-2 border-t border-b font-medium ${
              number === currentPage
                ? ' text-white bg-black '
                : 'text-gray-500 hover:bg-gray-50'
            } ${number === 1 ? '' : 'border-l'}`}
          >
            {number}
          </a>
        ))}

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            paginate(currentPage + 1);
          }}
          className="px-4 py-2 border border-gray-300 text-gray-500 rounded-r-md hover:bg-gray-100"
        >
          &gt;
        </a>
      </div>

    </div>
  );
}
