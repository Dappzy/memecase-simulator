import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CaseCard } from './components/CaseCard';
import { CaseOpeningModal } from './components/CaseOpening/CaseOpeningModal';
import { Case, Skin } from './types';
import { cases, populateCases } from './data/cases';
import { fetchRandomMemes } from './utils/meme-utils';

function App() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [inventory, setInventory] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(100); // Start with $100
  const [keys, setKeys] = useState(5); // Start with 5 keys
  const [currentPage, setCurrentPage] = useState<'cases' | 'inventory'>('cases');

  useEffect(() => {
    populateCases().then(() => setIsLoading(false));
  }, []);

  const handleOpenCase = async (caseId: string) => {
    const caseToOpen = cases.find(c => c.id === caseId);
    if (!caseToOpen) return;

    if (keys < caseToOpen.keys) {
      alert(`You need ${caseToOpen.keys} key${caseToOpen.keys > 1 ? 's' : ''} to open this vault!`);
      return;
    }
    
    setKeys(prev => prev - caseToOpen.keys); // Use the required number of keys
    caseToOpen.skins = await fetchRandomMemes(10);
    setSelectedCase(caseToOpen);
  };

  const handleCaseOpened = (skin: Skin) => {
    setInventory(prev => [...prev, skin]);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  const buyKey = () => {
    if (balance >= 2.49) {
      setBalance(prev => prev - 2.49);
      setKeys(prev => prev + 1);
    } else {
      alert('Insufficient balance!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading Meme Vaults...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="fixed top-0 left-0 right-0 bg-purple-900/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentPage('cases')}
                className={`px-4 py-2 pixel-corners pixel-border ${currentPage === 'cases' ? 'bg-purple-700' : 'hover:bg-purple-800'} pixel-font-clean`}
              >
                Cases
              </button>
              <button 
                onClick={() => setCurrentPage('inventory')}
                className={`px-4 py-2 pixel-corners pixel-border ${currentPage === 'inventory' ? 'bg-purple-700' : 'hover:bg-purple-800'} pixel-font-clean`}
              >
                Inventory ({inventory.length})
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-purple-800 px-4 py-2 pixel-corners pixel-border">
                <span className="pixel-font">Keys: {keys}</span>
                <button 
                  onClick={buyKey}
                  className="ml-2 bg-purple-600 px-2 py-1 pixel-corners hover:bg-purple-700 pixel-font-clean"
                >
                  Buy ($2.49)
                </button>
              </div>
              <div className="bg-purple-800 px-4 py-2 pixel-corners pixel-border pixel-font">
                Balance: ${balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {currentPage === 'cases' ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text pixel-font-title">
              Meme Vaults
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map(caseItem => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  onClick={() => handleOpenCase(caseItem.id)}
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

      {selectedCase && (
        <CaseOpeningModal
          caseItem={selectedCase}
          onClose={closeModal}
          onComplete={handleCaseOpened}
        />
      )}
    </div>
  );
}

export default App;