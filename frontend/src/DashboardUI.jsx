import { useState } from 'react';
import {
    Wallet,
    Copy,
    CheckCircle,
    ArrowUpRight,
    ShieldCheck,
    RefreshCw,
    ExternalLink,
    AlertTriangle,
    Coins,
    Layers,
    ArrowRightLeft,
    X,
    Cpu
} from 'lucide-react';

export default function DashboardUI({
    walletAddress,
    tokenName,
    symbol,
    balance,
    allowance,
    receiver,
    setReceiver,
    amount,
    setAmount,
    connectWallet,
    transferTokens,
    approveTokens,
    checkAllowance,
    revokeAllowance,
    transferFromTokens,
    transferFromStatus,
}) {
    const fullWalletAddress = walletAddress;

    const [copied, setCopied] = useState(false);
    const [txStatus, setTxStatus] = useState('idle');

    const [, setAllowanceData] = useState({
        spender: '',
        amount: ''
    });

    const [toast, setToast] = useState(null);

    const handleCopy = () => {
        if (!fullWalletAddress) return;
        navigator.clipboard.writeText(fullWalletAddress);
        setCopied(true);
        showToast('success', 'Address copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const showToast = (type, message, hash = null) => {
        setToast({ type, message, hash });
        setTimeout(() => setToast(null), 5000);
    };

    const clearAllowanceForm = () => {
        setAllowanceData({
            spender: "",
            amount: ""
        });
    };

    const handleRealTransfer = async (e) => {
        e.preventDefault();
        try {
            setTxStatus("pending");
            await transferTokens();
            setTxStatus("success");
            showToast(
                "success",
                "Transfer Successful"
            );
            setReceiver("");
            setAmount("");
            setTimeout(() => {
                setTxStatus("idle");
            }, 3000);
        } catch {
            setTxStatus("error");
            showToast(
                "error",
                "Transfer Failed"
            );
            setTimeout(() => {
                setTxStatus("idle");
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-teal-500/30 selection:text-teal-200">

            {/* Premium Background Layer: Grid and Node Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

            {/* Navbar / Header */}
            <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center text-teal-400 shadow-inner">
                        <Coins className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                            {tokenName || "KrishnaToken"} <span className="text-xs font-normal text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">ERC-20</span>
                        </h1>
                        <p className="text-xs text-slate-400 font-medium">Dashboard Interface</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        Sepolia Testnet
                    </span>

                    <button
                        onClick={connectWallet}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition ${walletAddress
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-teal-500/20 text-teal-400 border-teal-500/20 hover:bg-teal-500/30"
                            }`}
                    >
                        {walletAddress ? "Connected" : "Connect Wallet"}
                    </button>

                    <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-300">
                        <Wallet className="h-4 w-4 text-slate-400" />
                        <span>
                            {walletAddress
                                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                : "Not Connected"}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Container */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex flex-col justify-center">

                {/* Comprehensive Asset Portfolio Summary Card */}
                <div className="w-full bg-gradient-to-r from-slate-950/80 via-slate-900/90 to-slate-950/80 border border-slate-800/70 rounded-2xl p-6 mb-8 shadow-inner relative overflow-hidden">
                    <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
                        <Cpu className="w-32 h-32 text-teal-400" />
                    </div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4 flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5" /> Production Asset Portfolio
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
                        <div className="border-r border-slate-800/50 last:border-0 pr-4">
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Token Name</p>
                            <p className="text-sm font-bold text-white mt-1 truncate">{tokenName || "KrishnaToken"}</p>
                        </div>
                        <div className="border-r border-slate-800/50 last:border-0 pr-4">
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Symbol</p>
                            <p className="text-sm font-bold text-teal-400 mt-1">{symbol || "KRT"}</p>
                        </div>
                        <div className="border-r border-slate-800/50 last:border-0 pr-4">
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Liquidity Balance</p>
                            <p className="text-sm font-mono font-bold text-white mt-1 truncate">{balance || "0"}</p>
                        </div>
                        <div className="border-r border-slate-800/50 last:border-0 pr-4">
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Active Allowance</p>
                            <p className="text-sm font-mono font-bold text-amber-400 mt-1 truncate">{allowance || "0"}</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Connected Entity</p>
                            <p className="text-xs font-mono text-slate-300 mt-1.5 bg-slate-900/60 border border-slate-800/60 px-2 py-0.5 rounded inline-block max-w-full truncate">
                                {walletAddress ? walletAddress : "0x000...0000"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Glassmorphic Central Card Wrapper */}
                <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/40">

                    {/* Top Row: Asset Overview & Wallet Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        {/* Account Card */}
                        <div className="bg-slate-950/60 border border-slate-800/50 rounded-2xl p-5 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Connected Account</p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-base font-mono text-slate-200 truncate">
                                        {walletAddress
                                            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                            : "Not Connected"}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        disabled={!walletAddress}
                                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition duration-150 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        {copied ? <CheckCircle className="h-3.5 w-3.5 text-teal-400" /> : <Copy className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center text-xs text-slate-400">
                                <span>Status</span>
                                <span className={`${walletAddress ? 'text-teal-400' : 'text-rose-400'} font-medium flex items-center gap-1`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${walletAddress ? 'bg-teal-400' : 'bg-rose-400'}`}></div>
                                    {walletAddress ? "Connected" : "Disconnected"}
                                </span>
                            </div>
                        </div>

                        {/* Token Balance Card */}
                        <div className="bg-gradient-to-br from-slate-950/80 to-slate-900/60 border border-slate-800/50 rounded-2xl p-5 md:col-span-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Your Balance</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-3xl font-bold text-white tracking-tight">{balance || "0"}</span>
                                    <span className="text-sm font-semibold text-teal-400 tracking-wide">{symbol || "KRT"}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{tokenName || "KrishnaToken"} Official Supply Asset</p>
                            </div>
                            <div className="bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-xl flex items-center space-x-3 min-w-[180px]">
                                <div className="p-2 rounded-lg bg-teal-950/50 border border-teal-900/50 text-teal-400">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-slate-500 uppercase">Token Spec</p>
                                    <p className="text-sm font-semibold text-slate-300">Token: {symbol || "KRT"}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Interactive Actions Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Section 1: Core Transfer */}
                        <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-white uppercase mb-4 flex items-center gap-2">
                                    <ArrowUpRight className="h-4 w-4 text-slate-400" /> Direct Transfer
                                </h3>
                                <form onSubmit={handleRealTransfer} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Recipient Address</label>
                                        <input
                                            type="text"
                                            placeholder="0x..."
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition duration-150"
                                            value={receiver}
                                            onChange={(e) => setReceiver(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Amount ({symbol || "KRT"})</label>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition duration-150"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={txStatus === 'pending'}
                                        className="w-full mt-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-slate-200 hover:text-white border border-slate-700/60 font-medium py-2.5 px-4 rounded-xl text-sm transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] hover:shadow-teal-950/10 active:scale-100 disabled:opacity-50"
                                    >
                                        {txStatus === 'pending' ? (
                                            <>
                                                <RefreshCw className="h-4 w-4 animate-spin text-teal-400" />
                                                Processing Tx...
                                            </>
                                        ) : 'Execute Transfer'}
                                    </button>
                                </form>
                            </div>

                            {/* Tx Feedback Module */}
                            {txStatus !== 'idle' && (
                                <div className={`mt-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 transition duration-200 ${txStatus === 'pending' ? 'bg-slate-900/50 border-slate-800 text-slate-400' :
                                    txStatus === 'success' ? 'bg-teal-950/20 border-teal-900/40 text-teal-300' :
                                        'bg-rose-950/20 border-rose-900/40 text-rose-300'
                                    }`}>
                                    {txStatus === 'pending' && <RefreshCw className="h-4 w-4 animate-spin mt-0.5" />}
                                    {txStatus === 'success' && <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5" />}
                                    <div>
                                        <p className="font-medium capitalize">{txStatus} state</p>
                                        <p className="text-slate-500 text-[11px] mt-0.5">
                                            {txStatus === 'pending' && 'Awaiting blockchain ledger confirmation...'}
                                            {txStatus === 'success' && 'Transaction mined successfully.'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section 2: Allowance & Approvals */}
                        <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-white uppercase mb-1 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-slate-400" /> Allowance Manager
                                </h3>
                                <p className="text-xs text-slate-500 mb-4">
                                    Hardcoded spender and amount configured for demo environment.
                                </p>

                                {/* Allowance Dashboard Sub-card */}
                                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3.5 mb-4 flex justify-between items-center">
                                    <div>
                                        <span className="text-[11px] font-medium text-slate-500 uppercase block">Current Allowance</span>
                                        <span className="text-base font-mono font-semibold text-slate-300">{allowance} {symbol || "KRT"}</span>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await revokeAllowance();
                                                clearAllowanceForm();
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }}
                                        className="text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-900/30 px-2.5 py-1 rounded-lg transition duration-150"
                                    >
                                        Revoke
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Demo Spender Address</label>
                                        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-300">
                                            0x002E0...DAd6A
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Hardcoded Approval Amount</label>
                                        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-300">
                                            50 KRT
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <button
                                            type="button"
                                            onClick={checkAllowance}
                                            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-medium py-2 rounded-xl transition duration-150 text-center"
                                        >
                                            Check Limit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    await approveTokens();
                                                    clearAllowanceForm();
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}
                                            className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-slate-200 border border-slate-700/60 text-xs font-medium py-2 rounded-xl transition duration-150 text-center shadow-md hover:scale-[1.01]"
                                        >
                                            Approve 50 KRT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Third-Party Delegated Transfer */}
                        <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide text-white uppercase mb-4 flex items-center gap-2">
                                    <ArrowRightLeft className="h-4 w-4 text-slate-400" /> Delegated Transfer
                                </h3>

                                <div className="space-y-4 py-4">
                                    <div className="space-y-4 text-sm bg-slate-900/40 border border-slate-800/50 rounded-xl p-3.5">
                                        <div>
                                            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Owner</p>
                                            <p className="font-mono text-teal-400 text-sm mt-0.5">0x2CA11...66399</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Receiver</p>
                                            <p className="font-mono text-teal-400 text-sm mt-0.5">0xce722...b603B</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={transferFromTokens}
                                        className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-slate-200 border border-slate-700/60 font-medium py-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                                    >
                                        Execute transferFrom
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex items-center gap-1.5">
                                <AlertTriangle className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                                <span>
                                    {transferFromStatus}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Modern Fixed Fintech Footer */}
            <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10">
                <p>ERC-20 Token Dashboard built with React, Ethers.js and Solidity.</p>
                <div className="flex space-x-4">
                    <a href="#etherscan" className="hover:text-slate-300 transition flex items-center gap-1">Etherscan <ExternalLink className="h-3 w-3" /></a>
                    <a href="#github" className="hover:text-slate-300 transition flex items-center gap-1">Core Repository <ExternalLink className="h-3 w-3" /></a>
                </div>
            </footer>

            {/* Toast Notification Engine */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-start gap-3 max-w-sm ${toast.type === 'success'
                        ? 'bg-slate-950/90 border-teal-500/30 text-slate-200'
                        : 'bg-slate-950/90 border-rose-500/30 text-slate-200'
                        }`}>
                        <div className="mt-0.5">
                            {toast.type === 'success' ? (
                                <CheckCircle className="h-5 w-5 text-teal-400" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-rose-400" />
                            )}
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                                {toast.type === 'success' ? 'System Notification' : 'Transaction Alert'}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
                            {toast.hash && (
                                <div className="mt-2 pt-1.5 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                                    <span>Hash: {toast.hash}</span>
                                    <a href="#tx" className="text-teal-500 hover:underline flex items-center gap-0.5">View <ExternalLink className="h-2.5 w-2.5" /></a>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setToast(null)} className="text-slate-600 hover:text-slate-400 transition">
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}