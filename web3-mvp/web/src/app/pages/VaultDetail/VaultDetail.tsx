import React, { useState } from 'react';

interface User {
  name: string;
  publicVault: number;
  memeShares: number;
  aum: number; // Assets Under Management
}

interface Token {
  symbol: string;
  amount: number;
}

const VaultDetail: React.FC = () => {
  const [token1, setToken1] = useState<Token>({ symbol: 'USDT', amount: 0 });
  const [token2, setToken2] = useState<Token>({ symbol: 'MEME', amount: 0 });

  const handleSwap = () => {
    setToken1(token2);
    setToken2(token1);
  };

  const user: User = {
    name: 'MEME',
    publicVault: 0,
    memeShares: 0,
    aum: 2.7,
  };

  return (
    <div className="p-4 mt-10">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex space-x-4">
          <div className="w-2/5 flex flex-col">
            <h2 className="text-xl font-bold mb-2 text-black">
              Meme Maxi (MEME)
            </h2>
            <p>Jason Chow | Twitter: @Jason</p>
            <p className="font-bold text-black text-lg mt-2">
              Vault Description:
            </p>
            <span> All invested on Meme</span>
            <div className="flex-1 mt-3 flex justify-center items-center bg-slate-300 rounded-2xl">
              <span className=" text-gray-700 font-semibold text-lg">
                Strategy Hidden
              </span>
            </div>
          </div>

          <div className="w-3/5">
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

            <div className="mt-5 rounded-md p-4 border-black border-2">
              <div className="mr-4 flex justify-between border-b-2 border-black pb-1">
                <div>Holdings:</div>
                <div className="font-bold">0 MEME</div>
              </div>
              <div className="mt-4 flex-col">
                <div className="flex-col items-center justify-center mb-4">
                  <div className="flex items-center">
                    <div>
                      <span>Buy with: </span>
                    </div>
                    <div className="flex-grow flex space-x-2 ml-4">
                      <input
                        type="number"
                        value={token1.amount}
                        onChange={(e) =>
                          setToken1({
                            ...token1,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded-md p-2 flex-grow text-right"
                        placeholder="0.0"
                      />
                      <span className=" bg-slate-300 rounded-lg py-3 px-2">
                        {token1.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSwap}
                      className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-200 my-2"
                    >
                      ⇅
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <span>Received: </span>
                    </div>
                    <div className="flex-grow flex space-x-2 ml-4">
                      <input
                        type="number"
                        value={token2.amount}
                        onChange={(e) =>
                          setToken2({
                            ...token2,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded-md p-2 flex-grow text-right"
                        placeholder="0.0"
                      />
                      <span className=" bg-slate-300 rounded-lg py-3 px-2">
                        {token2.symbol}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex-grow">
                    Invest
                  </button>
                  <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow">
                    Redeem
                  </button>
                </div>
              </div>
            </div>
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