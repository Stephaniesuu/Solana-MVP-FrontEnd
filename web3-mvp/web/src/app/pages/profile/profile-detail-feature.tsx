import React, { FC, useMemo, useState } from 'react';
import { ExplorerLink } from '../../components/cluster/cluster-ui';
import { PublicKey } from '@solana/web3.js';
import { useParams, Link } from 'react-router-dom';
import { AppHero, ellipsify } from '../../components/ui/ui-layout';
import {
    AccountBalance,
    AccountButtons,
    AccountTokens,
    AccountTransactions,
} from '../account/account-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';



import { signInWithTwitter } from '../../services/auth';



interface VaultItem {
    name: string;
    totalInvestment: number;
    targetReturn: number;
    actualReturn: number;
}

export default function ProfilePage() {
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
    const profile = {
        name: 'Bilie',
        twitterLinked: false,
        walletAddress: '0x123...abc',
        vaultItems: [
            { name: 'Vault A', totalInvestment: 15000, targetReturn: '5%', actualReturn: '4.5%' },
            { name: 'Vault B', totalInvestment: 25000, targetReturn: '7%', actualReturn: '6.8%' },
            { name: 'Vault C', totalInvestment: 5000, targetReturn: '8%', actualReturn: '7.9%' },
            { name: 'Vault D', totalInvestment: 12000, targetReturn: '6%', actualReturn: '5.5%' },
            { name: 'Vault E', totalInvestment: 30000, targetReturn: '9%', actualReturn: '8.7%' },
        ],
    };

    const [isTwitterLinked, setIsTwitterLinked] = useState(profile.twitterLinked);

    const handleTwitterLink = async () => {

        try {
            const twitterResponse = await signInWithTwitter();
            console.log('twitterResponse', twitterResponse.success)
            if (twitterResponse.success) {
                setIsTwitterLinked(true);
                console.log(isTwitterLinked)
            } else {
                console.error('Failed to link Twitter account');
            }
        } catch (error) {
            console.error('Error linking Twitter account:', error);
        }
    };

    return (
        <div className="flex justify-center p-10">
            <div className="min-w-1/2 w-full bg-white shadow-md rounded-3xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
                    <div className="mb-6 md:mb-0">
                        {isTwitterLinked ? (
                            <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
                                Hi, {profile.name}
                            </h1>
                        ) : (
                            <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
                                Please link your twitter...
                            </h1>
                        )
                        }
                        {isTwitterLinked ? (
                            <div className="flex items-center gap-4">
                                <p className="text-base font-medium text-green-600 mb-0">✅ Twitter: Linked</p>
                                <Link to="/createVault" className="btn btn-outline btn-info">
                                    Create Vault
                                </Link>
                            </div>
                        ) : (
                            <button onClick={handleTwitterLink} className="btn btn-outline btn-default hover:underline text-base mb-8">
                                <FontAwesomeIcon icon={faTwitter} />
                                Link
                            </button>
                        )}
                        <div className="flex items-center mb-4 mt-8">
                            <p className="text-gray-700 text-base mr-4">💰 Wallet Address:</p>
                            <ExplorerLink
                                path={`account/${address}`}
                                label={ellipsify(address.toString())}
                            />
                        </div>
                    </div>
                    <div className="w-32 h-48 overflow-hidden">
                        <img className="object-cover w-full h-full rounded-3xl" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" />
                    </div>
                </div>

                <div className="divider"></div>
                <div className="flex flex-col md:flex-row items-start md:items-center p-10 shadow-md sga rounded-3xl">
                    <div className="overflow-x-auto">
                        <h1 className=' text-center justify-center mb-3'>Protofilio</h1>
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name of Vault
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Investment (USD)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Target return
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actual return
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {profile.vaultItems.map((vault, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {vault.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ${vault.totalInvestment.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {vault.targetReturn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {vault.actualReturn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="btn btn-outline btn-info btn-xs">
                                                Redeem
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

