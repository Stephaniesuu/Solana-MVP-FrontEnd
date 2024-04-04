import React from 'react';

interface User {
  name: string;
  publicVault: number;
  memeShares: number;
  aum: number; // Assets Under Management
}

const VaultDetail: React.FC = () => {
  const user: User = {
    name: 'MEME',
    publicVault: 0,
    memeShares: 0,
    aum: 2.7,
  };

  return (
    <div className="p-4 mt-10">
      <div className="bg-white p-4 rounded shadow ">
        <h2 className="text-xl font-bold mb-2 text-black">Meme Maxi (MEME)</h2>
        <p>Jason Chow | Twitter: @Jason</p>
        <p className="text-gray-600">Vault Description: All invested on Meme</p>
        <div className="mt-4">
          <span className=" border-2 border-black px-3 py-1 mr-4 rounded-lg">
            Public Vault
          </span>
          <span className=" border-2 border-black px-3 py-1 mr-4 rounded-lg">
            MEME: ${user.memeShares}
          </span>
          <span className=" border-2 border-black px-3 py-1 rounded-lg">
            AUM: ${user.aum} Million
          </span>
        </div>

        <div className="mt-5 rounded-md p-2 border-black border-2">
          <div className="mr-4 flex space-x-10">
            <div>Holdings:</div>
            <div className="font-bold">0 MEME</div>
          </div>
          <div className="mt-4 flex">
            <div className="flex-grow space-y-3">
              <div className="flex justify-between bg-zinc-200 rounded-md px-2 py-2">
                <span>Buy with</span>
                <span>500 USDT</span>
              </div>
              {/* <div className="h-1 bg-gray-300 rounded-full">
              <div className="h-full bg-green-500 rounded-full w-1/2"></div>
            </div> */}
              <div className="flex justify-between bg-zinc-200 rounded-md px-2 py-2">
                <span>Received</span>
                <span>277.77777778 MEME</span>
              </div>
            </div>
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Invest
            </button>
            <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Redeem
            </button>
          </div>
        </div>

        <div className="mt-4">{/* Line chart */}</div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div>
            <div className=" border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Management Fee: 3%
            </div>
          </div>
          <div>
            <div className="border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Performance Fee: 10%
            </div>
          </div>
          <div>
            <div className="border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Actual APY: 11 %
            </div>
          </div>
          <div>
            <div className="border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Target APY: 20 %
            </div>
          </div>
          <div>
            <div className="border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Manager Deposit: 10 K
            </div>
          </div>
          <div>
            <div className="border-2 border-black px-3 py-1 rounded-lg text-gray-600">
              Your P&L /
            </div>
          </div>
        </div>

        {/* <div className="mt-4">
          <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Manager Deposit: 10 K
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Your P&L /
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VaultDetail;
