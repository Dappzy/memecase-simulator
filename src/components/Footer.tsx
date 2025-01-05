import React from 'react';
import { FaTelegram, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-sm text-white py-3 px-4 border-t border-purple-700/50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm pixel-font">Made with 💜 by</span>
          <span className="text-purple-400 font-bold pixel-font">dappzy</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://t.me/ethkillerwhale"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-purple-300 hover:text-purple-400 transition-colors"
          >
            <FaTelegram className="w-4 h-4" />
            <span className="text-sm pixel-font">@ethkillerwhale</span>
          </a>
          
          <a
            href="https://github.com/dappzy/memecase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-purple-300 hover:text-purple-400 transition-colors"
          >
            <FaGithub className="w-4 h-4" />
            <span className="text-sm pixel-font">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
