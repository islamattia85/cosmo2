import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Hussein Emara",
    value: 1320,
    change: "+4.2%",
    avatar: "https://via.placeholder.com/80x80.png?text=HE",
    followers: 15000,
    platform: "Instagram",
  },
  {
    id: 2,
    name: "Nehal Assal",
    value: 1185,
    change: "+3.1%",
    avatar: "https://via.placeholder.com/80x80.png?text=NA",
    followers: 18000,
    platform: "TikTok",
  },
];

export default function Home() {
  const [wallet, setWallet] = useState(10000);
  const [investments, setInvestments] = useState([]);
  const [activeTab, setActiveTab] = useState("market");

  const investInUser = (userId) => {
    const user = mockUsers.find((u) => u.id === userId);
    const amount = 500;
    if (wallet >= amount) {
      setWallet(wallet - amount);
      setInvestments([...investments, { user, amount }]);
    } else {
      alert("Not enough points!");
    }
  };

  const renderMarket = () => (
    <section className="space-y-4">
      {mockUsers.map((user) => (
        <div key={user.id} className="border p-4 rounded-lg shadow space-y-2">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="font-semibold text-lg">{user.name}</div>
              <div className="text-sm text-gray-500">
                {user.platform} • {user.followers.toLocaleString()} followers
              </div>
            </div>
          </div>
          <div className="text-sm">
            Value: <span className="font-semibold">{user.value} pts</span> (
            {user.change})
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{
                width: `${
                  user.change.includes("+") ? parseFloat(user.change) * 10 : 0
                }%`,
              }}
            ></div>
          </div>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => investInUser(user.id)}
          >
            Invest 500 pts
          </button>
        </div>
      ))}
    </section>
  );

  const renderPortfolio = () => (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Your Portfolio</h2>
      {investments.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven't made any investments yet.
        </p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {investments.map((inv, index) => (
            <li key={index}>
              <span className="font-medium">{inv.user.name}</span>: {inv.amount}{" "}
              pts
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  const renderLeaderboard = () => (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Leaderboard</h2>
      <ol className="list-decimal list-inside text-sm">
        {mockUsers
          .sort((a, b) => b.value - a.value)
          .map((user) => (
            <li key={user.id}>
              <span className="font-medium">{user.name}</span> – {user.value}{" "}
              pts
            </li>
          ))}
      </ol>
    </section>
  );

  return (
    <div className="p-4 space-y-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold">CosmoStock</h1>
        <p className="text-sm text-gray-500">
          Invest in influence. Grow your portfolio.
        </p>
        <p className="mt-2 text-sm">
          Wallet Balance: <span className="font-semibold">{wallet} pts</span>
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "market" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("market")}
          >
            Market
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "portfolio"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "leaderboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
        </div>
      </header>

      {activeTab === "market" && renderMarket()}
      {activeTab === "portfolio" && renderPortfolio()}
      {activeTab === "leaderboard" && renderLeaderboard()}
    </div>
  );
}
