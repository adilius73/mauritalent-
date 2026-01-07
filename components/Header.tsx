
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Globe, User, Briefcase, ChevronDown, Sparkles, LogOut, Building2, ShieldCheck, Search, X } from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../services/data';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  role: UserRole;
  setRole: (r: UserRole) => void;
  setView: (v: string) => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, role, setRole, setView, onSearch }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const t = (key: string) => translations[key][lang];

  const getLangLabel = (l: Language) => {
    if (l === 'fr') return 'FR';
    if (l === 'ar') return 'عربي';
    return 'EN';
  };

  const handleLangClick = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
    setIsProfileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsLangMenuOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
        setSearchValue('');
    }
    setIsLangMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
        onSearch(searchValue);
        setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
             <img src="/logo.png" alt="Mauritalent" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-50 p-1.5 rounded-full rtl:space-x-reverse border border-gray-100">
            <button onClick={() => setView('home')} className="text-gray-600 hover:text-mauri-dark hover:bg-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md">
              {t('nav_home')}
            </button>
            <button onClick={() => setView('jobs')} className="text-gray-600 hover:text-mauri-dark hover:bg-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md">
              {t('nav_jobs')}
            </button>
            <button onClick={() => setView('tenders')} className="text-gray-600 hover:text-mauri-dark hover:bg-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2">
              <Building2 className="h-4 w-4 text-mauri-yellow" />
              {t('nav_tenders')}
            </button>
            {role !== 'candidate' && role !== 'super_admin' && (
              <button onClick={() => setView('dashboard')} className="text-gray-600 hover:text-mauri-dark hover:bg-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md">
                {t('nav_dashboard')}
              </button>
            )}
             {role === 'super_admin' && (
              <button onClick={() => setView('admin')} className="text-white bg-mauri-dark hover:bg-mauri-dark/90 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-mauri-dark/20 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                {t('nav_admin')}
              </button>
            )}
             <div className="w-px h-6 bg-gray-300 mx-2"></div>
             <button onClick={() => setView('assistant')} className="text-mauri-dark bg-mauri-light/50 hover:bg-mauri-light px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all border border-mauri-light">
               <Sparkles className="h-4 w-4 text-mauri-yellow" />
               {t('nav_assistant')}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            
            {/* Global Search */}
            <div className="relative flex items-center">
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSearchOpen ? 'w-48 opacity-100 mr-2 rtl:ml-2 rtl:mr-0' : 'w-0 opacity-0'}`}>
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-mauri-green/50 focus:ring-2 focus:ring-mauri-green/20 bg-gray-50"
                        />
                        {searchValue && (
                            <button 
                                type="button" 
                                onClick={() => setSearchValue('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 rtl:right-auto rtl:left-2"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </form>
                </div>
                <button 
                    onClick={toggleSearch}
                    className={`p-2.5 rounded-xl transition-all ${isSearchOpen ? 'bg-mauri-light text-mauri-dark' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <Search className="h-5 w-5" />
                </button>
            </div>

            {/* Language Switcher */}
            <div className="relative hidden sm:block">
              <button 
                onClick={handleLangClick}
                className="flex items-center text-gray-700 hover:text-mauri-dark bg-white border border-gray-200 hover:border-mauri-dark/30 px-3 py-2 rounded-xl text-sm font-medium transition-all shadow-sm"
              >
                <Globe className="h-4 w-4 mr-2 rtl:ml-2 text-gray-500" />
                <span>{getLangLabel(lang)}</span>
                <ChevronDown className={`h-3 w-3 ml-1 rtl:mr-1 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-card py-2 border border-gray-100 rtl:right-auto rtl:left-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {['fr', 'ar', 'en'].map((l) => (
                         <button 
                            key={l}
                            onClick={() => { setLang(l as Language); setIsLangMenuOpen(false); }}
                            className={`flex items-center w-full text-left rtl:text-right px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === l ? 'text-mauri-dark font-bold bg-mauri-light' : 'text-gray-700'}`}
                        >
                            <span className="w-6">{l === 'fr' ? '🇫🇷' : l === 'ar' ? '🇲🇷' : '🇬🇧'}</span>
                            {l === 'fr' ? 'Français' : l === 'ar' ? 'العربية' : 'English'}
                        </button>
                    ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
                <button 
                onClick={handleProfileClick}
                className="flex items-center space-x-2 bg-mauri-yellow text-white pl-2 pr-4 py-2 rounded-full hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20 font-bold"
                >
                    <div className="bg-white/20 p-1 rounded-full">
                        <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm hidden sm:block max-w-[100px] truncate">
                        {role === 'candidate' ? 'Candidat' : role === 'super_admin' ? 'Super Admin' : role}
                    </span>
                </button>
                
                {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card py-2 border border-gray-100 rtl:right-auto rtl:left-0 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 mb-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('role_switch')}</p>
                    </div>
                    <button 
                    onClick={() => { setRole('candidate'); setIsProfileMenuOpen(false); }} 
                    className={`flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 ${role === 'candidate' ? 'text-mauri-dark font-semibold' : 'text-gray-600'}`}
                    >
                    <span className={`w-2 h-2 rounded-full mr-2 rtl:ml-2 ${role === 'candidate' ? 'bg-mauri-dark' : 'bg-gray-300'}`}></span>
                    {t('role_candidate')}
                    </button>
                    <button 
                    onClick={() => { setRole('recruiter'); setIsProfileMenuOpen(false); }} 
                    className={`flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 ${role === 'recruiter' ? 'text-mauri-dark font-semibold' : 'text-gray-600'}`}
                    >
                     <span className={`w-2 h-2 rounded-full mr-2 rtl:ml-2 ${role === 'recruiter' ? 'bg-mauri-dark' : 'bg-gray-300'}`}></span>
                    {t('role_recruiter')}
                    </button>
                    <button 
                    onClick={() => { setRole('public_admin'); setIsProfileMenuOpen(false); }} 
                    className={`flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 ${role === 'public_admin' ? 'text-mauri-dark font-semibold' : 'text-gray-600'}`}
                    >
                     <span className={`w-2 h-2 rounded-full mr-2 rtl:ml-2 ${role === 'public_admin' ? 'bg-mauri-dark' : 'bg-gray-300'}`}></span>
                    {t('role_admin')}
                    </button>
                    <button 
                    onClick={() => { setRole('super_admin'); setIsProfileMenuOpen(false); }} 
                    className={`flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 ${role === 'super_admin' ? 'text-mauri-dark font-semibold' : 'text-gray-600'}`}
                    >
                     <span className={`w-2 h-2 rounded-full mr-2 rtl:ml-2 ${role === 'super_admin' ? 'bg-mauri-dark' : 'bg-gray-300'}`}></span>
                    Super Admin
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                            <LogOut className="h-4 w-4 mr-2 rtl:ml-2" />
                            Déconnexion
                        </button>
                    </div>
                </div>
                )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
