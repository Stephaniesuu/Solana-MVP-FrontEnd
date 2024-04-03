import React, { useState, useRef } from 'react';
import { Form, InputNumber, Alert } from 'antd';

type DepositType = 'USDC' | 'USDT';

interface VaultFormData {
  vaultName: string;
  vaultSymbol: string;
  vaultDescription: string;
  acceptableDeposit: DepositType;
  managerDeposit: { currency: DepositType; amount: string };
}

const VaultForm: React.FC = () => {
  const [formData, setFormData] = useState<VaultFormData>({
    vaultName: '',
    vaultSymbol: '',
    vaultDescription: '',
    acceptableDeposit: 'USDC', // 默认选项
    managerDeposit: { currency: 'USDC', amount: '' },
  });
  const [strategy, setStrategy] = useState('trading');
  const [vaultType, setVaultType] = useState('private');
  const [hideStrategy, setHideStrategy] = useState(false);
  const [performanceBenchmark, setPerformanceBenchmark] = useState('');
  const [performanceFee, setPerformanceFee] = useState('');
  const [managementFee, setManagementFee] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleAcceptableDepositChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      acceptableDeposit: event.target.value as DepositType,
    });
  };

  const handleManagerDepositCurrencyChange = (currency: DepositType) => {
    setFormData({
      ...formData,
      managerDeposit: { ...formData.managerDeposit, currency },
    });
  };

  const handleManagerDepositAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      managerDeposit: { ...formData.managerDeposit, amount: event.target.value },
    });
  };

  const handleStrategyChange = (selectedStrategy: string) => {
    setStrategy(selectedStrategy);
  };

  const handleVaultTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVaultType(event.target.value);
  };

  // 这里仅为展示，需要实现具体逻辑
  const handleTokenAllocationChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // Handle token allocation change based on the index
  };

  // 处理开关切换
  const handleToggleHideStrategy = () => {
    setHideStrategy(!hideStrategy);
  };

  // 处理输入变更
  const handlePerformInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "g9JMpg_nO1A0BF7z");
    console.log(myHeaders)
    const TokenCreate = new FormData();
    TokenCreate.append("network", "devnet");
    TokenCreate.append("wallet", '5fZrWinrY1emHLoQ75wUmGjN8WqpqXYTcFX6TVyx1wDD');
    TokenCreate.append("name", formData.vaultName);
    TokenCreate.append("symbol", formData.vaultSymbol);
    TokenCreate.append("description", formData.vaultDescription);
    // TokenCreate.append("file", "geeko.jpeg");
    console.log("mint", TokenCreate);
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: TokenCreate,
      redirect: 'follow' as RequestRedirect | undefined,
    };

    fetch("https://api.shyft.to/sol/v1/token/create_detach", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };


  return (
    <div className="container w-full mx-auto p-10 mt-10 mb-10 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Vault Name */}
        <div className="mb-4 flex items-center">
          <label htmlFor="vaultName" className="block text-lg font-semibold mb-2 min-w-[160px] whitespace-nowrap">Vault Name:</label>
          <input
            type="text"
            id="vaultName"
            name="vaultName"
            value={formData.vaultName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter Vault Name"
          />
        </div>

        {/* Vault Symbol */}
        <div className="mb-4 flex items-center">
          <label htmlFor="vaultSymbol" className="block text-lg font-semibold mb-2 min-w-[160px] whitespace-nowrap">Vault Symbol:</label>
          <input
            type="text"
            id="vaultSymbol"
            name="vaultSymbol"
            value={formData.vaultSymbol}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter Vault Symbol"
          />
        </div>

        {/* Vault Description */}
        <div className="mb-4 flex items-center">
          <label htmlFor="vaultDescription" className="block text-lg font-semibold mb-2 min-w-[160px] whitespace-nowrap">Vault Description:</label>
          <textarea
            id="vaultDescription"
            name="vaultDescription"
            value={formData.vaultDescription}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            placeholder="Describe the Vault"
          ></textarea>
        </div>

        {/* Acceptable Deposit */}
        <div className="mb-4 flex items-center">
          <span className="block text-lg font-semibold mb-2 mr-2">Acceptable Deposit:</span>
          <div className="flex gap-2">
            {(['USDC'] as DepositType[]).map((currency) => (
              <label key={currency} className={`btn ${formData.acceptableDeposit === currency ? 'btn-active' : 'btn-outline'}`}>
                <input
                  type="radio"
                  name="acceptableDeposit"
                  value={currency}
                  checked={formData.acceptableDeposit === currency}
                  onChange={handleAcceptableDepositChange}
                  className="hidden"
                />
                {currency}
              </label>
            ))}
          </div>
        </div>

        {/* Manager Deposit */}
        <div className="mb-4 flex items-center">
          <span className="block text-lg font-semibold mb-2 mr-2">Manager Deposit:</span>
          <div className="flex gap-2 items-center">
            {(['USDC'] as DepositType[]).map((currency) => (
              <button
                key={`manager-${currency}`}
                type="button"
                onClick={() => handleManagerDepositCurrencyChange(currency)}
                className={`btn ${formData.managerDeposit.currency === currency ? 'btn-active' : 'btn-outline'}`}
              >
                {currency}
              </button>
            ))}
            <input
              type="text"
              name="managerAmount"
              value={formData.managerDeposit.amount}
              onChange={handleManagerDepositAmountChange}
              className="input input-bordered flex-1 "
              placeholder="Amount"
            />
          </div>
        </div>

        {/* Strategy */}
        <span className="block text-lg font-semibold mb-4 mr-2">Strategy:</span>
        <TabsComponent strategy={strategy} setStrategy={setStrategy} />


        {/* Hide Strategy Switch */}
        <div className="mb-4 flex items-center justify-between">
          <div className="tooltip tooltip-left" data-tip="Choose whether to hide the strategy details from the vault page">
            <label className="block text-lg font-semibold mb-2 whitespace-nowrap">Hide strategy?</label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-1">no</span>
              <input type="checkbox" checked={hideStrategy} onChange={handleToggleHideStrategy} className="toggle toggle-info" />
              <span className="label-text ml-1">yes</span>
            </label>
          </div>
        </div>

        {/* Performance Benchmark Input */}
        <div className="mb-4 flex items-center justify-between">
          <div className="tooltip tooltip-left" data-tip="Enter the minimum performance target for the strategy">
            <label className="block text-lg font-semibold mb-2 whitespace-nowrap">Performance Benchmark:</label>
          </div>
          <input
            type="text"
            value={performanceBenchmark}
            onChange={handlePerformInputChange(setPerformanceBenchmark)}
            className="input input-bordered"
            placeholder="e.g., >20%"
          />
        </div>

        {/* Performance Fee Input */}
        <div className="mb-4 flex items-center justify-between">
          <div className="tooltip tooltip-left" data-tip="Enter the performance fee percentage">
            <label className="block text-lg font-semibold mb-2 whitespace-nowrap">Performance Fee:</label>
          </div>
          <input
            type="text"
            value={performanceFee}
            onChange={handlePerformInputChange(setPerformanceFee)}
            className="input input-bordered"
            placeholder="e.g., 10-50%"
          />
        </div>

        {/* Management Fee Input */}
        <div className="mb-4 flex items-center justify-between">
          <div className="tooltip tooltip-left" data-tip="Enter the management fee percentage">
            <label className="block text-lg font-semibold mb-2 whitespace-nowrap">Management Fee:</label>
          </div>
          <input
            type="text"
            value={managementFee}
            onChange={handlePerformInputChange(setManagementFee)}
            className="input input-bordered"
            placeholder="e.g., 0-5%"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button type="submit" className="btn btn-lg" onClick={handleSubmit}>Create Vault</button>
        </div>
      </form>
    </div>
  );
};

export default VaultForm;



// strategy component

type TabsComponentProps = {
  strategy: string;
  setStrategy: (strategy: string) => void;
};

const TabsComponent: React.FC<TabsComponentProps> = ({ strategy, setStrategy }) => {
  const handleStrategyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy(event.target.value);
  };


  // cryptoOptions
  interface Crypto {
    percentage: number;
    label: string;
    value: string;
  }
  const [selectedCryptos, setSelectedCryptos] = useState<Crypto[]>([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [vaultType, setVaultType] = useState('private'); // default value

  const cryptoOptions = [
    // solana 生态
    { label: 'SOL', value: 'sol' },
    { label: 'JUP', value: 'jup' },

  ];

  const handleCryptoChange = (e: { target: { value: string; }; }) => {
    const crypto = cryptoOptions.find(option => option.value === e.target.value) as { label: string, value: string };
    if (crypto && !selectedCryptos.find(sc => sc.label === crypto.label)) {
      setSelectedCryptos([...selectedCryptos, { ...crypto, percentage: 0 }]);
    }
  };

  const handlePercentageChange = (value: number, index: number) => {
    const newSelectedCryptos = [...selectedCryptos];
    newSelectedCryptos[index].percentage = value;

    const newTotalPercentage = newSelectedCryptos.reduce((acc, curr) => acc + curr.percentage, 0);
    if (newTotalPercentage <= 100) {
      setSelectedCryptos(newSelectedCryptos);
      setTotalPercentage(newTotalPercentage);
    }
  };

  const handleVaultTypeChange = () => {
    setVaultType((prevType) => (prevType === "private" ? "public" : "private"));
  };

  const handleRemoveCrypto = (indexToRemove: number) => {
    const newSelectedCryptos = selectedCryptos.filter((_, index) => index !== indexToRemove);

    setSelectedCryptos(newSelectedCryptos);

    // update total percentage
    const newTotalPercentage = newSelectedCryptos.reduce((total, { percentage }) => total + percentage, 0);
    setTotalPercentage(newTotalPercentage);
  };

  return (

      <div role="tablist" className="tabs tabs-bordered mb-4">
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Trading" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div className="flex justify-between items-end">
              <label className="label flex-1">
                <span className="label-text"></span>
              </label>
              <div className="mt-2 mb-2 flex items-center justify-between">
                <div className="tooltip tooltip-left" data-tip="Select vault type">
                  <label className="block text-sm font-semibold whitespace-nowrap">Vault Type:</label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text ml-1 mr-1">Private</span>
                    <input
                      type="checkbox"
                      checked={vaultType === "public"}
                      onChange={handleVaultTypeChange}
                      className="toggle toggle-info"
                    />
                    <span className="label-text ml-1">Public</span>
                  </label>
                </div>
              </div>
            </div>
            <select
              className="select select-bordered w-full"
              onChange={handleCryptoChange}
            >
              <option disabled selected>Search token</option>
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
                        {/* 加密货币条目列表 */}
                        {selectedCryptos.map((crypto, index) => (
              <div key={crypto.value} className="flex items-center mb-2 mt-2">
                <div className="flex-none width-8 text-center font-bold">{index + 1}</div>
                <div className="flex-auto mx-2">
                  <span className="label-text">{crypto.label}</span>
                </div>
                <div className="flex-auto mx-2">
                  <InputNumber
                    min={0}
                    max={100}
                    value={crypto.percentage ?? 0}
                    onChange={(value) => handlePercentageChange(value ?? 0, index)}
                    formatter={value => `${value}%`}
                    parser={value => parseFloat(value?.replace('%', '') ?? '')}
                  />
                </div>
                <button
                  className="btn btn-circle btn-xs"
                  onClick={() => handleRemoveCrypto(index)}
                >
                  x
                </button>
              </div>
            ))}
            {/* 总百分比超过100%的错误信息 */}
            {totalPercentage > 100 && (
              <div className="alert alert-error mt-4">
                <div className="flex-1">
                  <label>Error: The total percentage exceeds 100%</label>
                </div>
              </div>
            )}

        </div>

          

        <input type="radio" name="my_tabs_1" role="tab" className="tab tab-disabled" aria-label="LP Farming" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">🏃 Coming soon...</div>

        <input type="radio" name="my_tabs_1" role="tab" className="tab tab-disabled" aria-label="Lending" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">🏃 Coming soon...</div>
      </div >


  );
};


