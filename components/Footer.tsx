import React from 'react';
import { Language } from '../types';
import { translations } from '../services/data';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = (key: string) => translations[key][lang];
  return (
    <footer className="bg-mauri-dark text-white border-t border-mauri-dark/10 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 md:mb-0 bg-white p-2 rounded-xl">
             <img src="/logo.png" alt="Mauritalent" className="h-10 w-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 rtl:space-x-reverse text-sm text-blue-100">
             <a href="#" className="hover:text-mauri-yellow transition-colors">{t('footer_about')}</a>
             <a href="#" className="hover:text-mauri-yellow transition-colors">{t('footer_contact')}</a>
             <a href="#" className="hover:text-mauri-yellow transition-colors">{t('footer_privacy')}</a>
             <a href="#" className="hover:text-mauri-yellow transition-colors">{t('footer_rokhsa')}</a>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-blue-200/60">
          {t('footer_rights')}
        </div>
      </div>
    </footer>
  );
};