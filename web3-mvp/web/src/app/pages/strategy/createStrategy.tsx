import React, { useState, useRef, ChangeEvent, useMemo } from 'react';
import { Form, InputNumber, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';

type DepositType = 'USDC' | 'USDT';

interface StrategyItem {
  symbol: string;
  weight: number;
}


interface SubmitFormData {
  vaultSymbol: string | number | readonly string[] | undefined;
  ownerAddr: string;
  description: string;
  name: string;
  managementFee: number;
  performanceThreshold: number;
  photoLink: string;
  totalSupply: number;
  strategy: StrategyItem[];
}

const VaultForm: React.FC = () => {

  const params = useParams();
  const address = useMemo(() => {
    if (!params.address) {
      return;
    }
    try {
      return new PublicKey(params.address);
    } catch (e) {
      console.log(`Invalid public key`, e);
    }
  }, [params]);
  if (!address) {
    return <div>Error loading account</div>;
  }

  const [formData, setFormData] = useState<SubmitFormData>({
    description: '',
    name: '',
    vaultSymbol: '',
    ownerAddr: '',
    managementFee: 0,
    performanceThreshold: 0,
    photoLink: '',
    totalSupply: 0,
    strategy: [],
  });

  const [investmentStrategy, setInvestmentStrategy] = useState('trading'); //当前策略类型
  const [vaultType, setVaultType] = useState('private');
  const [hideStrategy, setHideStrategy] = useState(false);
  const [performanceBenchmark, setPerformanceBenchmark] = useState('');
  const [performanceFee, setPerformanceFee] = useState('');
  const [managementFee, setManagementFee] = useState('');
  const [totalsupply, setTotalSupply] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategy, setStrategy] = useState<StrategyItem[]>([]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // const handleAcceptableDepositChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     acceptableDeposit: event.target.value as DepositType,
  //   });
  // };

  // const handleManagerDepositCurrencyChange = (currency: DepositType) => {
  //   setFormData({
  //     ...formData,
  //     managerDeposit: { ...formData.managerDeposit, currency },
  //   });
  // };

  // const handleManagerDepositAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     managerDeposit: { ...formData.managerDeposit, amount: event.target.value },
  //   });
  // };

  // const handleStrategyChange = (selectedStrategy: string) => {
  //   setStrategy(selectedStrategy);
  // };

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


  const handleToggleHideStrategy = (value: boolean) => {
    setHideStrategy(value);
  };


  const handlePerformInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitData: SubmitFormData = {
      ownerAddr: address.toString(), // This should be set based on user's wallet address
      description: formData.description,
      name: formData.name, // Replace with actual portfolio name
      managementFee: parseFloat(managementFee),
      performanceThreshold: parseFloat(performanceBenchmark),
      photoLink: 'photoLink', // This should be set based on uploaded photo
      totalSupply: parseInt(totalsupply, 10),
      strategy: strategy, // Fix: Wrap the strategy value in an array
      vaultSymbol: undefined
    };

    //open modal for successfull creation
    setIsModalOpen(true);

    const myHeaders = new Headers();
    const TokenCreate = JSON.stringify(submitData);

    console.log("Create Vault", TokenCreate);
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

    <div className="container w-full mx-auto p-10 mt-10 mb-10 shadow-xl rounded-2xl bg-white shadow-purple-200 ">
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
            name="name"
            value={formData.name}
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
            name="description"
            value={formData.description}
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
              <label key={currency} className={`btn btn-sm btn-outline `}>
                <input
                  type="radio"
                  name="acceptableDeposit"
                  value={currency}
                  // checked={formData.acceptableDeposit === currency}
                  // onChange={handleAcceptableDepositChange}
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
                // onClick={() => handleManagerDepositCurrencyChange(currency)}
                // className={`btn btn-sm ${formData.managerDeposit.currency === currency ? 'btn-active' : 'btn-outline'}`}
                className='btn btn-sm btn-outline'
              >
                {currency}
              </button>
            ))}
            <input
              type="text"
              name="managerAmount"
              // value={formData.amount}
              onChange={handleInputChange}
              className="input input-bordered flex-1 input-sm w-24"
              placeholder="Amount"
            />
          </div>
        </div >



        {/* Strategy */}
        < div className=" mb-2 flex items-center" >
          < span className="mt-2 block text-lg font-medium mb-1 mr-2" > Strategy</span >
        </div>
        {/* Strategy Tabs */}

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

        {/* Token Supply Input */}
        <div className="mb-4 flex items-center border border-gray-100 rounded-lg p-4 w-full">
          <div className="tooltip tooltip-left" data-tip="Enter the management fee percentage">
            <span className="indicator-item indicator-start badge badge-neutral cursor-help">?</span>
          </div>
          <label className="block text-lg font-medium ml-3 flex-auto">Total Supply</label>
          <input
            type="text"
            value={totalsupply}
            onChange={handlePerformInputChange(setTotalSupply)}
            className="input input-bordered ml-3"
            placeholder="e.g., 1000"
            style={{ flexShrink: 0 }}
          />
        </div>


        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button type="submit" className="btn btn-lg shadow" onClick={handleSubmit}>Create Vault</button>
        </div>
        {/* Create Success notifictaion */}
        {isModalOpen && (
          <div className="mt-80 fixed inset-20 z-[80] overflow-x-hidden overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white shadow-lg rounded-xl dark:bg-gray-800 p-4 sm:p-10 text-center overflow-hidden relative max-w-lg mx-auto">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    className="flex justify-center items-center text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 p-2 rounded-lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <span className="mb-4 inline-flex justify-center items-center w-12 h-12 rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                  </svg>
                </span>
                <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                  Vault successfully created!
                </h3>
                <p className="text-gray-500">
                  You can check the <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="/vaultdetail">details</a> of your vault.
                </p>
                <div className="mt-6 flex justify-center gap-x-4">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form >

    </div >
  );
};

export default VaultForm;



// strategy component
interface Crypto {
  percentage: number;
  label: string;
  value: string;
}

type TabsComponentProps = {
  strategy: StrategyItem[];
  setStrategy: (strategy: StrategyItem[]) => void;
};

const TabsComponent: React.FC<TabsComponentProps> = ({ strategy, setStrategy }) => {



  // const handleStrategyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setStrategy(event.target.value);
  // };

  const [selectedCryptos, setSelectedCryptos] = useState<Crypto[]>([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [vaultType, setVaultType] = useState('private'); // default value
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


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

  const submitStrategy = () => {
    // 计算选中加密货币的总百分比
    const totalPercentage = selectedCryptos.reduce((acc, curr) => acc + curr.percentage, 0);

    // 检查总百分比是否等于 100
    if (totalPercentage !== 100) {
      // 设置错误信息
      setError('Error: The total percentage must equal 100%.');
      return; // 阻止进一步执行
    }

    // 如果总百分比等于 100，清除之前的错误信息（如果有）
    setError('');

    // 构造新的策略数组
    const newStrategy = selectedCryptos.map(crypto => ({
      symbol: crypto.label,
      weight: crypto.percentage / 100
    }));

    // 更新父组件的策略状态
    setStrategy(newStrategy);

    setSuccessMessage('Strategy updated successfully!');
    
    // 清空错误消息
    setError('');
  };


  return (

    <div role="tablist" className="tabs tabs-bordered mb-4">
      <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Trading" checked />
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


        {error && (
          <div className="alert alert-error mt-4">
            <div className="flex-1">
              <label>{error}</label>
            </div>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <div className="flex justify-center mt-2">
          <button type="button" className="btn btn-info mt-4 items-center" onClick={submitStrategy}>confirm</button>
        </div>


      </div>

      <input type="radio" name="my_tabs_1" role="tab" className="tab tab-disabled" aria-label="LP Farming" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">🏃 Coming soon...</div>

      <input type="radio" name="my_tabs_1" role="tab" className="tab tab-disabled" aria-label="Lending" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">🏃 Coming soon...</div>
    </div >


  );
};

TabsComponent;