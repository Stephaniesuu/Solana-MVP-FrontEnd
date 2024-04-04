import React, { useState, useRef, ChangeEvent } from 'react';
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
  const [filePreview, setFilePreview] = useState<string | null>(null);



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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 确保安全访问 files 数组
    const file = event.target.files && event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  // 这里仅为展示，需要实现具体逻辑
  const handleTokenAllocationChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // Handle token allocation change based on the index
  };


  const handleToggleHideStrategy = (value: boolean) => {
    setHideStrategy(value);
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
    <div className="container w-full mx-auto p-10 mt-10 mb-10 shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit}>
        {/* Vault image */}
        <div className="col-span-full mb-4">
          <label htmlFor="cover-photo" className="block text-lg font-medium leading-6 ">
            Vault photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {filePreview && (
                <img src={filePreview} alt="File preview" className="mt-4 max-h-40 w-auto items-center" />
              )}
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Vault Name */}
        < div className="mb-4 flex items-center" >
          <label htmlFor="vaultName" className="mr-6 block text-lg font-medium mb-2 min-w-[160px] whitespace-nowrap">Vault Name</label>
          <input
            type="text"
            id="vaultName"
            name="vaultName"
            value={formData.vaultName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter Vault Name"
          />
        </div >

        {/* Vault Symbol */}
        < div className="mb-4 flex items-center" >
          <label htmlFor="vaultSymbol" className="mr-6 block text-lg font-medium mb-2 min-w-[160px] whitespace-nowrap">Vault Symbol</label>
          <input
            type="text"
            id="vaultSymbol"
            name="vaultSymbol"
            value={formData.vaultSymbol}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Enter Vault Symbol"
          />
        </div >

        {/* Vault Description */}
        < div className="mb-4 flex items-center" >
          <label htmlFor="vaultDescription" className="block text-lg font-medium mb-2 min-w-[160px] whitespace-nowrap mr-6">Vault Description</label>
          <textarea
            id="vaultDescription"
            name="vaultDescription"
            value={formData.vaultDescription}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            placeholder="Describe the Vault"
          ></textarea>
        </div >

        {/* Acceptable Deposit */}
        < div className="indicator mb-4 flex items-center w-full" >
          <span className="block text-lg font-medium mr-5">Acceptable Deposit</span>
          <div className="flex gap-2">
            {(['USDC'] as DepositType[]).map((currency) => (
              <label key={currency} className={`btn btn-sm ${formData.acceptableDeposit === currency ? 'btn-active' : 'btn-outline'}`}>
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
        </div >

        {/* Manager Deposit */}
        < div className=" mb-4 flex items-center w-full" >
          <span className="block text-lg font-medium mr-9">Manager Deposit</span>
          <div className="flex gap-2 items-center">
            {(['USDC'] as DepositType[]).map((currency) => (
              <button
                key={`manager-${currency}`}
                type="button"
                onClick={() => handleManagerDepositCurrencyChange(currency)}
                className={`btn btn-sm ${formData.managerDeposit.currency === currency ? 'btn-active' : 'btn-outline'}`}
              >
                {currency}
              </button>
            ))}
            <input
              type="text"
              name="managerAmount"
              value={formData.managerDeposit.amount}
              onChange={handleManagerDepositAmountChange}
              className="input input-bordered flex-1 input-sm w-24"
              placeholder="Amount"
            />
          </div>
        </div >


        {/* Strategy */}
        < div className=" mb-2 flex items-center" >

          < span className="block text-lg font-medium mb-1 mr-2" > Strategy</span >
        </div>
        <TabsComponent strategy={strategy} setStrategy={setStrategy} />


        {/* Hide Strategy Switch */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center border border-gray-100 rounded-lg p-4 w-full">
            <div className="tooltip tooltip-left" data-tip="Choose whether to hide the strategy details from the vault page">
              <span className="indicator-item indicator-start badge badge-neutral cursor-help">?</span>
            </div>
            <label className="block text-lg font-medium ml-3 flex-auto">Hide strategy</label>
            <div className="form-control flex justify-end items-center">
              <label className="label cursor-pointer flex items-center mr-2">
                <input type="radio" name="hideStrategy" checked={!hideStrategy} onChange={() => handleToggleHideStrategy(false)} className="radio radio-primary" />
                <span className="label-text ml-2">No</span>
              </label>
              <label className="label cursor-pointer flex items-center">
                <input type="radio" name="hideStrategy" checked={hideStrategy} onChange={() => handleToggleHideStrategy(true)} className="radio radio-primary" />
                <span className="label-text ml-2">Yes</span>
              </label>
            </div>
          </div>
        </div>



        {/* Performance Benchmark Input */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-100 rounded-lg p-4 w-full">
            <div className="tooltip tooltip-left" data-tip="Enter the minimum performance target for the strategy">
              <span className="indicator-item indicator-start badge badge-neutral cursor-help">?</span>
            </div>
            <label className="block text-lg font-medium ml-3 flex-auto mr-10">Performance Benchmark</label>
            <input
              type="text"
              value={performanceBenchmark}
              onChange={(e) => handlePerformInputChange(setPerformanceBenchmark)(e)}
              className="input input-bordered ml-3"
              placeholder="e.g., >20%"
              style={{ flexShrink: 0 }} // 防止输入框被压缩
            />
          </div>
        </div>


        {/* Performance Fee Input */}
        <div className="mb-4 flex items-center border border-gray-100 rounded-lg p-4 w-full">
          <div className="tooltip tooltip-left" data-tip="Enter the performance fee percentage">
            <span className="indicator-item indicator-start badge badge-neutral cursor-help">?</span>
          </div>
          <label className="block text-lg font-medium ml-3 flex-auto">Performance Fee</label>
          <input
            type="text"
            value={performanceFee}
            onChange={handlePerformInputChange(setPerformanceFee)}
            className="input input-bordered ml-3"
            placeholder="e.g., 10-50%"
            style={{ flexShrink: 0 }}
          />
        </div>

        {/* Management Fee Input */}
        <div className="mb-4 flex items-center border border-gray-100 rounded-lg p-4 w-full">
          <div className="tooltip tooltip-left" data-tip="Enter the management fee percentage">
            <span className="indicator-item indicator-start badge badge-neutral cursor-help">?</span>
          </div>
          <label className="block text-lg font-medium ml-3 flex-auto">Management Fee</label>
          <input
            type="text"
            value={managementFee}
            onChange={handlePerformInputChange(setManagementFee)}
            className="input input-bordered ml-3"
            placeholder="e.g., 0-5%"
            style={{ flexShrink: 0 }}
          />
        </div>


        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button type="submit" className="btn btn-lg shadow" onClick={handleSubmit}>Create Vault</button>
        </div>
      </form >
    </div >
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
    { label: 'WETH', value: 'weth' }

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
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Trading" checked/>
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div className="flex justify-between items-end">
          <label className="label flex-1">
            <span className="label-text"></span>
          </label>
          <div className="mt-2 mb-2 flex justify-between items-center">
            <div className="tooltip tooltip-left" data-tip="Select vault type">
              <label className="text-md font-medium mr-2">Vault Type:</label>
            </div>
            <div className="flex items-center">
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="vaultType"
                  className="radio radio-primary text-primary mr-2"
                  checked={vaultType === "private"}
                  onChange={() => setVaultType("private")}
                />
                <span className="label-text">Private</span>
              </label>
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="vaultType"
                  className="radio radio-primary text-primary mr-2"
                  checked={vaultType === "public"}
                  onChange={() => setVaultType("public")}
                />
                <span className="label-text">Public</span>
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
            <div className="flex-none w-8 text-center font-bold">{index + 1}</div>
            <div className="flex-auto mx-2 w-60">
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
                className="w-full"
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


