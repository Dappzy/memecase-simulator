import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Case, Skin } from './types';
import { cases } from './data/cases';
import { CaseCard } from './components/CaseCard';
import { CaseOpeningModal } from './components/CaseOpening/CaseOpeningModal';

function App() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showOpeningModal, setShowOpeningModal] = useState(false);
  const [userKeys, setUserKeys] = useState(10); // Start with 10 keys
  const [balance, setBalance] = useState(100); // Start with $100
  const [inventory, setInventory] = useState<Skin[]>([]);
  const [currentPage, setCurrentPage] = useState<'cases' | 'inventory'>('cases');

  const handleCaseClick = (caseItem: Case) => {
    if (userKeys >= caseItem.keys) {
      setSelectedCase(caseItem);
      setShowOpeningModal(true);
    } else {
      alert('Not enough keys! Buy more keys to open this case.');
    }
  };

  const handleCloseModal = () => {
    setShowOpeningModal(false);
    setSelectedCase(null);
  };

  const handleCaseOpened = (skin: Skin) => {
    if (selectedCase) {
      setUserKeys(prev => prev - selectedCase.keys);
      setInventory(prev => [...prev, skin]);
    }
  };

  const handleBuyKey = () => {
    const KEY_PRICE = 2.49;
    if (balance >= KEY_PRICE) {
      setBalance(prev => prev - KEY_PRICE);
      setUserKeys(prev => prev + 1);
    } else {
      alert('Insufficient balance! Add funds to buy more keys.');
    }
  };

  const handleInventoryClick = () => {
    setCurrentPage(prev => prev === 'cases' ? 'inventory' : 'cases');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header 
        userKeys={userKeys}
        balance={balance}
        inventoryCount={inventory.length}
        onBuyKey={handleBuyKey}
        onInventoryClick={handleInventoryClick}
      />
      
      <main className="container mx-auto px-4 py-8 mb-16 mt-24">
        {currentPage === 'cases' ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text pixel-font-title">
              Meme Vaults
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  onClick={() => handleCaseClick(caseItem)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text pixel-font-title">
              Your Meme Collection
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-3 pixel-corners pixel-border"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full aspect-square object-cover pixel-corners mb-2"
                  />
                  <div className="text-sm font-bold mb-1 truncate pixel-font">
                    {item.name}
                  </div>
                  <div className="text-xs text-purple-300 pixel-font">
                    {item.wear}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {showOpeningModal && selectedCase && (
        <CaseOpeningModal
          caseItem={selectedCase}
          onClose={handleCloseModal}
          onComplete={handleCaseOpened}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;