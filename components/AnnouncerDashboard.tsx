
import React, { useState } from 'react';
import { Plus, BarChart3, Clock, CheckCircle, FileText, MoreVertical, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { Language } from '../types';
import { translations, mockTenders } from '../services/data';

interface AnnouncerDashboardProps {
  lang: Language;
}

export const AnnouncerDashboard: React.FC<AnnouncerDashboardProps> = ({ lang }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const t = (key: string) => translations[key][lang];

  // Filter and Sort Logic
  const filteredAndSortedTenders = mockTenders
    .filter(tender => {
      if (filterStatus === 'all') return true;
      return tender.status === filterStatus;
    })
    .sort((a, b) => {
      // Sort by publishDate
      if (sortOrder === 'asc') {
        return a.publishDate.localeCompare(b.publishDate);
      } else {
        return b.publishDate.localeCompare(a.publishDate);
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('announcer_dashboard_title')}</h1>
          <p className="text-gray-500 mt-1">Ministère de la Santé • Admin Principal</p>
        </div>
        <button className="bg-mauri-green hover:bg-mauri-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          {t('btn_create_tender')}
        </button>
      </div>

      {/* Appels d'Offres Summary Section */}
      <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-mauri-green" />
            {t('nav_tenders')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Tenders */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between group hover:border-mauri-green/30 transition-colors hover:shadow-card">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('active_tenders')}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                        <FileText className="h-8 w-8" />
                    </div>
                </div>
                <button className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-2 group-hover:translate-x-1 duration-200">
                    {t('view_details')} <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:rotate-180" />
                </button>
            </div>
            
            {/* Pending Evaluations */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between group hover:border-amber-400/30 transition-colors hover:shadow-card">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('pending_evals')}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">3</h3>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
                        <Clock className="h-8 w-8" />
                    </div>
                </div>
                <button className="flex items-center text-sm font-bold text-amber-600 hover:text-amber-800 transition-colors mt-2 group-hover:translate-x-1 duration-200">
                    {t('view_details')} <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:rotate-180" />
                </button>
            </div>

            {/* Awarded */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between group hover:border-emerald-400/30 transition-colors hover:shadow-card">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('status_awarded')}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">45</h3>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                </div>
                <button className="flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors mt-2 group-hover:translate-x-1 duration-200">
                    {t('view_details')} <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:rotate-180" />
                </button>
            </div>
        </div>
      </section>

      {/* Tender Management List */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
             <h3 className="text-lg font-bold text-gray-900">{t('nav_tenders')} - Récents</h3>
             
             {/* Filters & Sorting Controls */}
             <div className="flex flex-wrap items-center gap-3">
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:right-0 rtl:left-auto rtl:pr-3">
                        <Filter className="h-4 w-4 text-gray-400" />
                    </div>
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mauri-green/20 text-gray-700 font-medium rtl:pr-9 rtl:pl-8"
                    >
                        <option value="all">{t('filter_all_statuses')}</option>
                        <option value="open">{t('status_open')}</option>
                        <option value="closed">{t('status_closed')}</option>
                        <option value="evaluation">{t('status_evaluation')}</option>
                        <option value="awarded">{t('status_awarded')}</option>
                    </select>
                 </div>

                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:right-0 rtl:left-auto rtl:pr-3">
                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                    <select 
                         value={sortOrder}
                         onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                         className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mauri-green/20 text-gray-700 font-medium rtl:pr-9 rtl:pl-8"
                    >
                        <option value="desc">{t('sort_newest')}</option>
                        <option value="asc">{t('sort_oldest')}</option>
                    </select>
                 </div>
             </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm">{t('table_id')}</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm">{t('table_title')}</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm">{t('table_status')}</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm">{t('table_deadline')}</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right">{t('table_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedTenders.length > 0 ? (
                filteredAndSortedTenders.map((tender) => (
                  <tr key={tender.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{tender.reference}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{tender.title}</div>
                      <div className="text-xs text-gray-500">{tender.category} • {tender.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${tender.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                          {tender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {tender.deadline}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-lg">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Aucun résultat ne correspond à vos filtres.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
