import React, { useState } from 'react';
import axios from 'axios';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps,Space} from 'antd';
import { USDTColorful} from '@ant-design/web3-icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface VaultFormData {
    imagelink: string;
    vaultName: string;
    vaultSymbol: string;
    vaultType: string;
    whitelistWallets: string;
    managementFee: number;
    strategy: string;
    investmentRatio: string;
    presalePeriod: number;
}

export const VaultCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<VaultFormData>({
    imagelink: '',
    vaultName: '',
    vaultSymbol: '',
    vaultType: 'Public',
    whitelistWallets: '',
    managementFee: 0,
    strategy: '',
    investmentRatio: '',
    presalePeriod: 1,
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
        setLoading(true);
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
            setFormData({
                ...formData,
                imagelink: url,
            });
        });
    }
};

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vault/create', formData);
      console.log(response.data); // 处理响应数据
      // 可能还需要一些成功提交后的操作，比如跳转或显示成功消息
    } catch (error) {
      console.error('提交表单时出错:', error);
      // 处理错误情况
    }
  };



  return (
    <div className='mb-10 mt-10'>
    <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
      <div className="w-full md:w-1/2 px-2 mb-4 pb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">NFT Avatar</label>
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </div>
      <div className="w-full md:w-1/2 px-2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Vault Name</label>
          <input type="text" name="vaultName" value={formData.vaultName} onChange={handleInputChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Vault Symbol</label>
          <input type="text" name="vaultSymbol" value={formData.vaultSymbol} onChange={handleInputChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Vault Type</label>
          <select name="vaultType" value={formData.vaultType} onChange={handleInputChange} className="select select-bordered w-full">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Whitelist Wallet List (if private vault)</label>
          <textarea name="whitelistWallets" value={formData.whitelistWallets} onChange={handleInputChange} className="textarea textarea-bordered w-full" rows={3}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Management Fee (0-5%)
          <USDTColorful />
          </label>
          <input type="range" name="managementFee" value={formData.managementFee} onChange={handleInputChange} className="range range-primary" min="0" max="5" step="0.1" />
          <div className="w-full flex justify-between text-xs text-gray-600">
            <span>0%</span>
            <span>5%</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
          <select name="strategy" value={formData.strategy} onChange={handleInputChange} className="select select-bordered w-full mb-2">
            <option>Add Coin</option>
          </select>
          <input type="text" name="investmentRatio" placeholder="Investment Ratio" value={formData.investmentRatio} onChange={handleInputChange} className="input input-bordered w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pre-sale Period (1-7 days)</label>
          <input type="number" name="presalePeriod" min="1" max="7" value={formData.presalePeriod} onChange={handleInputChange} className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Create Vault</button>
      </div>
    </form>
    </div>
  );
};

export default VaultCreationForm;