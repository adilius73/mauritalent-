
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { translations, mockJobs, siteVitrineData } from '../services/data';
import { Language } from '../types';
import { Search, MapPin, Briefcase, ChevronRight, ArrowRight, Building2, Users, Handshake, Globe } from 'lucide-react';
import { JobCard } from './JobCard';

interface HomeProps {
    lang: Language;
    t: (key: string) => string;
    setCurrentView: (view: string) => void;
    selectedSector: string;
    setSelectedSector: (s: string) => void;
    availableSectors: any[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
    lang, t, setCurrentView, selectedSector, setSelectedSector, availableSectors, searchQuery, setSearchQuery 
}) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Filter Logic for Latest Jobs
    const displayedJobs = mockJobs.slice(0, 3);

    // Site Vitrine Blocks
    const serviceBlocks = siteVitrineData.knowledge_blocks.filter(kb => kb.type === 'service');
    const sectorBlock = siteVitrineData.knowledge_blocks.find(kb => kb.type === 'sectors');
    const talentBlock = siteVitrineData.knowledge_blocks.find(kb => kb.id === 'kb_talents');
    const companyBlock = siteVitrineData.knowledge_blocks.find(kb => kb.id === 'kb_entreprises');

    // Autocomplete Logic
    const allKeywords = useMemo(() => {
        const terms = new Set<string>();
        mockJobs.forEach(job => {
            terms.add(job.title);
            terms.add(job.company);
            job.title.split(' ').forEach(word => {
                if (word.length > 3) terms.add(word);
            });
        });
        return Array.from(terms);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.length > 1) {
            const filtered = allKeywords.filter(term => term.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (term: string) => {
        setSearchQuery(term);
        setShowSuggestions(false);
    };

    const getIconForService = (id: string) => {
        switch(id) {
            case 'kb_services_portage_salarial': return Users;
            case 'kb_services_assistance_technique': return Building2;
            case 'kb_services_partenariats': return Handshake;
            default: return Globe;
        }
    };

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <div className="relative bg-mauri-dark text-white pt-32 pb-32 md:pb-48 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mauri-green/20 to-transparent"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-mauri-green/20 border border-mauri-green/30 text-mauri-green text-sm font-bold mb-6 backdrop-blur-sm tracking-wide shadow-[0_0_15px_rgba(0,169,92,0.3)]">
                        🚀 #1 Plateforme Emploi & Services RH
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">
                        {t('hero_title')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('hero_subtitle')}
                    </p>
                    
                    <div className="flex justify-center gap-4 mb-8 md:hidden">
                        <button onClick={() => setCurrentView('tenders')} className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold">
                            {t('nav_tenders')}
                        </button>
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4 z-20">
                    <div className="max-w-5xl mx-auto bg-white p-3 rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative group" ref={searchContainerRef}>
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-5">
                                <Search className="text-gray-400 h-6 w-6 group-focus-within:text-mauri-green transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => { if(searchQuery.length > 1) setShowSuggestions(true) }}
                                placeholder={t('search_placeholder')}
                                className="block w-full pl-14 rtl:pr-14 py-5 bg-white rounded-2xl text-gray-900 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mauri-green/20 focus:bg-gray-50 transition-all font-medium border-none"
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-2xl mt-2 z-50 overflow-hidden border border-gray-100">
                                    <div className="py-2">
                                        {suggestions.map((suggestion, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => handleSelectSuggestion(suggestion)}
                                                className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium flex items-center gap-3 transition-colors"
                                            >
                                                <div className="bg-gray-100 p-1.5 rounded-lg"><Search className="h-4 w-4 text-gray-500" /></div>
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-px h-12 bg-gray-200 my-auto hidden md:block"></div>
                        <div className="md:w-1/4 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-4">
                                <Briefcase className="text-gray-400 h-6 w-6 group-focus-within:text-mauri-green transition-colors" />
                            </div>
                            <select 
                                className="block w-full pl-12 rtl:pr-12 py-5 bg-white rounded-2xl text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-mauri-green/20 focus:bg-gray-50 cursor-pointer appearance-none font-medium border-none"
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                            >
                                <option value="">{t('filter_sector')}</option>
                                {availableSectors.map((s: any) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none rtl:right-auto rtl:left-0">
                                <ChevronRight className="h-5 w-5 text-gray-400 rotate-90" />
                            </div>
                        </div>
                        <button 
                            className="bg-mauri-yellow hover:bg-yellow-400 text-mauri-dark font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
                            onClick={() => setCurrentView('jobs')}
                        >
                            {t('search_btn')}
                            <ArrowRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* SERVICES VITRINE SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-mauri-green font-bold tracking-wide uppercase text-sm bg-mauri-green/10 px-3 py-1 rounded-full">
                            Expertise MAURITALENT
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-mauri-dark mt-4 mb-4">
                            {t('sv_services_title')}
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            {t('sv_services_subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {serviceBlocks.map(block => {
                            const Icon = getIconForService(block.id);
                            return (
                                <div key={block.id} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 border border-gray-100 group">
                                    <div className="bg-white p-4 rounded-2xl inline-block shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="h-8 w-8 text-mauri-dark" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{block.content.label}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {block.content.short_tagline || block.content.description}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {(block.content.benefits || block.content.core_offers || []).slice(0, 3).map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-mauri-yellow shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={() => setCurrentView('jobs')} className="text-mauri-green font-bold flex items-center gap-2 hover:gap-3 transition-all group-hover:text-mauri-dark">
                                        En savoir plus <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

             {/* AUDIENCES SPLIT SECTION */}
             <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Talents */}
                        <div className="bg-white rounded-3xl p-10 shadow-soft border-l-4 border-mauri-green">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <Users className="h-6 w-6 text-mauri-green" /> {t('sv_audience_talents')}
                            </h3>
                            <p className="text-gray-600 mb-6">{talentBlock?.content.description}</p>
                            <button onClick={() => setCurrentView('jobs')} className="bg-mauri-green text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-mauri-dark transition-all">
                                Trouver une opportunité
                            </button>
                        </div>
                        {/* Enterprises */}
                        <div className="bg-mauri-dark rounded-3xl p-10 shadow-soft text-white relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                             <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
                                <Building2 className="h-6 w-6 text-mauri-yellow" /> {t('sv_audience_companies')}
                            </h3>
                            <p className="text-gray-300 mb-6 relative z-10">{companyBlock?.content.description}</p>
                            <button className="bg-white text-mauri-dark px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-mauri-yellow transition-all relative z-10">
                                {t('btn_contact_us')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTORS GRID */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900">{t('sv_sectors_title')}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {(sectorBlock?.content.sectors || []).map((sector: string, i: number) => (
                            <div key={i} className="bg-gray-50 hover:bg-mauri-light p-6 rounded-xl text-center transition-colors cursor-default border border-gray-100 hover:border-mauri-green/30">
                                <span className="font-bold text-gray-700">{sector}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LATEST JOBS (Existing Module) */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{t('latest_jobs')}</h2>
                            <p className="text-gray-500 mt-2">{t('latest_jobs_subtitle')}</p>
                        </div>
                        <button 
                            onClick={() => setCurrentView('jobs')}
                            className="text-mauri-green font-bold hover:text-mauri-dark flex items-center gap-1 transition-colors"
                        >
                            {t('view_all_jobs')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </button>
                    </div>
                    <div className="grid gap-6">
                        {displayedJobs.map(job => (
                            <JobCard key={job.id} job={job} lang={lang} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
