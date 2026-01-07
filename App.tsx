
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { JobCard } from './components/JobCard';
import { StatsDashboard } from './components/StatsDashboard';
import { CVAssistant } from './components/CVAssistant';
import { TenderModule } from './components/TenderModule';
import { AnnouncerDashboard } from './components/AnnouncerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { translations, mockJobs } from './services/data';
import { Language, UserRole } from './types';
import { MapPin, Briefcase, User, Briefcase as BriefcaseIcon } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [role, setRole] = useState<UserRole>('candidate');
  const [currentView, setCurrentView] = useState('home');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle RTL direction change
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Specific routing logic for dashboard link based on role
  const handleSetView = (view: string) => {
    if (view === 'dashboard') {
        if (role === 'public_admin') {
            setCurrentView('announcer');
        } else if (role === 'super_admin') {
            setCurrentView('admin');
        } else {
            setCurrentView(view);
        }
    } else {
      setCurrentView(view);
    }
  };

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('jobs');
  };

  const t = (key: string) => translations[key][lang];

  // Filter Jobs Logic
  const displayedJobs = mockJobs.filter(job => {
    // Filter by Sector
    if (selectedSector && job.sector !== selectedSector) return false;
    
    // Filter by Job Type
    if (selectedJobTypes.length > 0) {
      if (!selectedJobTypes.includes(job.type)) return false;
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesDesc) return false;
    }

    if (job.status && job.status !== 'active' && currentView !== 'admin') return false;
    return true;
  });

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const availableSectors = [
    { id: 'mining', label: t('sector_mining') },
    { id: 'tech', label: t('sector_tech') },
    { id: 'public', label: t('sector_public') },
    { id: 'services', label: t('sector_services') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        lang={lang} 
        setLang={setLang} 
        role={role} 
        setRole={setRole}
        setView={(view) => {
            if (view === 'admin' && role !== 'super_admin') {
                alert("Accès réservé aux Super Admins.");
                return;
            }
            if (view === 'tenders') setCurrentView('tenders');
            else handleSetView(view);
        }}
        onSearch={handleGlobalSearch}
      />
      
      <main className="flex-grow pt-20">
        {currentView === 'home' && (
           <Home 
             lang={lang}
             t={t}
             setCurrentView={setCurrentView}
             selectedSector={selectedSector}
             setSelectedSector={setSelectedSector}
             availableSectors={availableSectors}
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
           />
        )}

        {currentView === 'jobs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">{t('jobs_main_title')}</h1>
                <p className="text-gray-500 mt-2 text-lg">{t('jobs_subtitle')}</p>
                {searchQuery && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Résultats pour :</span>
                        <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2">
                            "{searchQuery}"
                            <button onClick={() => setSearchQuery('')} className="hover:text-red-500"><span className="sr-only">Effacer</span>&times;</button>
                        </span>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="hidden lg:block space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                   <h3 className="font-bold mb-4 text-gray-900 flex items-center gap-2">
                       <BriefcaseIcon className="h-4 w-4 text-mauri-green" />
                       {t('filters_title')}
                   </h3>
                   <div className="space-y-3">
                      {['CDI', 'CDD', "Appel d'offres", 'Freelance', 'Stage'].map(type => (
                          <label key={type} className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer">
                             <input 
                                type="checkbox" 
                                className="rounded-md text-mauri-green focus:ring-mauri-green border-gray-300 w-4 h-4 cursor-pointer"
                                checked={selectedJobTypes.includes(type)}
                                onChange={() => toggleJobType(type)}
                             />
                             <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                 {t(`filter_${type === "Appel d'offres" ? 'tender' : type.toLowerCase()}`) || type}
                             </span>
                          </label>
                      ))}
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                   <h3 className="font-bold mb-4 text-gray-900 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-mauri-green" />
                        {t('filter_sector')}
                   </h3>
                   <div className="space-y-2">
                      <label className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedSector === '' ? 'bg-mauri-green/10 text-mauri-green' : 'hover:bg-gray-50'}`}>
                         <span className="text-sm font-medium">{t('sector_all')}</span>
                         <input type="radio" name="sector" className="hidden" checked={selectedSector === ''} onChange={() => setSelectedSector('')} />
                         {selectedSector === '' && <div className="w-2 h-2 rounded-full bg-mauri-green"></div>}
                      </label>
                      {availableSectors.map((s: any) => (
                        <label key={s.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedSector === s.id ? 'bg-mauri-green/10 text-mauri-green' : 'hover:bg-gray-50'}`}>
                           <span className="text-sm font-medium">{s.label}</span>
                           <input type="radio" name="sector" className="hidden" checked={selectedSector === s.id} onChange={() => setSelectedSector(s.id)} />
                           {selectedSector === s.id && <div className="w-2 h-2 rounded-full bg-mauri-green"></div>}
                        </label>
                      ))}
                   </div>
                </div>
              </div>

              {/* Job List */}
              <div className="lg:col-span-3 space-y-6">
                 {displayedJobs.length > 0 ? (
                   displayedJobs.map(job => (
                    <JobCard key={job.id} job={job} lang={lang} />
                  ))
                 ) : (
                   <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">{t('no_jobs_found')}</p>
                      <button onClick={() => { setSelectedSector(''); setSelectedJobTypes([]); setSearchQuery(''); }} className="mt-4 text-mauri-green hover:underline text-sm font-bold">
                        {t('view_all_jobs')}
                      </button>
                   </div>
                 )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'tenders' && (
            <TenderModule lang={lang} role={role} setRole={setRole} />
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-lg flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold">{t('space_title')} {role === 'recruiter' ? t('role_recruiter') : t('role_admin')}</h2>
                    <p className="text-blue-100 text-sm mt-1">
                      {t('dashboard_banner')} <strong>{role === 'recruiter' ? t('role_recruiter') : t('role_admin')}</strong>.
                    </p>
                </div>
              </div>
            <StatsDashboard lang={lang} />
          </div>
        )}

        {currentView === 'announcer' && <AnnouncerDashboard lang={lang} />}
        {currentView === 'admin' && <AdminPanel lang={lang} />}
        {currentView === 'assistant' && <CVAssistant lang={lang} />}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
