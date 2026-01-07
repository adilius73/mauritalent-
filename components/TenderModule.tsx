

import React, { useState } from 'react';
import { Search, Filter, FileText, Download, HelpCircle, Upload, CheckCircle, Lock, Calendar, MapPin, Building2, ChevronRight, Briefcase, ChevronLeft } from 'lucide-react';
import { Language, Tender, TenderSubmission, UserRole } from '../types';
import { translations, mockTenders } from '../services/data';

interface TenderModuleProps {
  lang: Language;
  role: UserRole;
  setRole: (r: UserRole) => void;
}

export const TenderModule: React.FC<TenderModuleProps> = ({ lang, role }) => {
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'qa' | 'submission'>('details');
  const [submissionStep, setSubmissionStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const t = (key: string) => translations[key][lang];

  // Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setIsSubmitted(true);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'open': return 'bg-emerald-100 text-emerald-800';
        case 'closed': return 'bg-red-100 text-red-800';
        case 'evaluation': return 'bg-amber-100 text-amber-800';
        case 'awarded': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
      switch(status) {
          case 'open': return t('status_open');
          case 'closed': return t('status_closed');
          case 'evaluation': return t('status_evaluation');
          case 'awarded': return t('status_awarded');
          default: return status;
      }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = mockTenders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockTenders.length / itemsPerPage);

  const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // -- Render Views --

  // 1. LIST VIEW
  const renderListView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('tender_search_title')}</h1>
            <p className="text-gray-500 mt-2">{t('tender_search_subtitle')}</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 rtl:right-4 rtl:left-auto" />
                <input 
                    type="text" 
                    placeholder={t('search_placeholder')}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mauri-green/20 rtl:pr-12 rtl:pl-4"
                />
            </div>
            <div className="flex gap-2">
                 <select className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-mauri-green">
                    <option value="">{t('sector_all')}</option>
                    <option value="works">Travaux</option>
                    <option value="supplies">Fournitures</option>
                    <option value="services">Services</option>
                 </select>
                 <button className="bg-mauri-green text-white px-6 py-3 rounded-xl font-bold hover:bg-mauri-dark transition-colors">
                     {t('search_btn')}
                 </button>
            </div>
        </div>

        {/* Results */}
        <div className="grid gap-4">
            {currentTenders.map(tender => (
                <div 
                    key={tender.id} 
                    onClick={() => setSelectedTender(tender)}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-card cursor-pointer transition-all group relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-mauri-green opacity-0 group-hover:opacity-100 transition-opacity rtl:right-0 rtl:left-auto"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${getStatusColor(tender.status)}`}>
                                    {getStatusLabel(tender.status)}
                                </span>
                                <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                    {tender.reference}
                                </span>
                                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                    {tender.type}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-mauri-green transition-colors mb-2">
                                {tender.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Building2 className="h-4 w-4" /> {tender.announcer}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {tender.location}
                                </span>
                                <span className="flex items-center gap-1 text-red-600 font-medium">
                                    <Calendar className="h-4 w-4" /> {t('table_deadline')}: {tender.deadline}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-gray-300 group-hover:text-mauri-green transition-colors rtl:rotate-180" />
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                    {t('pagination_prev')}
                </button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                currentPage === number
                                    ? 'bg-mauri-green text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {t('pagination_next')}
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
            </div>
        )}
    </div>
  );

  // 2. DETAIL VIEW
  const renderDetailView = () => {
    if (!selectedTender) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button 
                onClick={() => setSelectedTender(null)}
                className="flex items-center text-gray-500 hover:text-mauri-green mb-6 transition-colors"
            >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                {t('view_all')}
            </button>

            {/* Header */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedTender.status)}`}>
                            {getStatusLabel(selectedTender.status)}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-600">
                            {selectedTender.type}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{selectedTender.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                        <div>
                            <p className="text-gray-500">{t('table_id')}</p>
                            <p className="font-semibold text-gray-900">{selectedTender.reference}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">{t('filter_sector')}</p>
                            <p className="font-semibold text-gray-900">{selectedTender.category}</p>
                        </div>
                         <div>
                            <p className="text-gray-500">{t('table_deadline')}</p>
                            <p className="font-semibold text-red-600">{selectedTender.deadline}</p>
                        </div>
                         <div>
                            <p className="text-gray-500">Budget</p>
                            <p className="font-semibold text-gray-900">{selectedTender.budget}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                {(['details', 'documents', 'qa', 'submission'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-mauri-green text-mauri-green' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        {tab === 'details' && t('tab_details')}
                        {tab === 'documents' && t('tab_documents')}
                        {tab === 'qa' && t('tab_qa')}
                        {tab === 'submission' && t('tab_submission')}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 rounded-3xl shadow-soft min-h-[400px]">
                {activeTab === 'details' && (
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('tab_details')}</h3>
                        <p>{selectedTender.description}</p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Informations Administratives</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>Autorité contractante : {selectedTender.announcer}</li>
                                    <li>Date de publication : {selectedTender.publishDate}</li>
                                    <li>Lieu d'exécution : {selectedTender.location}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-4">
                         <h3 className="text-xl font-bold text-gray-900 mb-4">{t('tab_documents')}</h3>
                         {selectedTender.documents.map(doc => (
                             <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                 <div className="flex items-center gap-4">
                                     <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                                         <FileText className="h-6 w-6" />
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-gray-900">{doc.name}</h4>
                                         <p className="text-sm text-gray-500 uppercase">{doc.type} • Version {doc.version} • {doc.date}</p>
                                     </div>
                                 </div>
                                 <button className="flex items-center gap-2 text-mauri-green font-bold hover:underline">
                                     <Download className="h-4 w-4" />
                                     <span className="hidden sm:inline">{t('download_dao')}</span>
                                 </button>
                             </div>
                         ))}
                    </div>
                )}

                {activeTab === 'qa' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{t('tab_qa')}</h3>
                            <button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                {t('qa_ask_btn')}
                            </button>
                        </div>
                        {selectedTender.clarifications.length > 0 ? (
                            selectedTender.clarifications.map(qa => (
                                <div key={qa.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3 mb-3">
                                        <HelpCircle className="h-5 w-5 text-mauri-green mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">{qa.question}</p>
                                            <span className="text-xs text-gray-500">{qa.date}</span>
                                        </div>
                                    </div>
                                    <div className="pl-8 border-l-2 border-mauri-green/20 ml-2.5">
                                        <p className="text-gray-700">{qa.answer}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10">Aucune question pour le moment.</div>
                        )}
                    </div>
                )}

                {activeTab === 'submission' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('tab_submission')}</h3>
                        
                        {role === 'guest' ? (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h4 className="text-lg font-bold text-gray-900">{t('login_required')}</h4>
                                <p className="text-gray-500 mb-6">{t('login_msg')}</p>
                            </div>
                        ) : isSubmitted ? (
                            <div className="text-center py-16 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in zoom-in duration-300">
                                <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-6">
                                    <CheckCircle className="h-16 w-16 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('submission_success')}</h2>
                                <p className="text-gray-600 mb-6">Votre dossier a été chiffré et transmis en toute sécurité.</p>
                                <div className="bg-white inline-block px-6 py-3 rounded-xl border border-gray-200 shadow-sm">
                                    <span className="text-sm text-gray-500 block">{t('submission_ref')}</span>
                                    <span className="text-lg font-mono font-bold text-gray-900">SUB-2024-8892X</span>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-2xl mx-auto">
                                {/* Wizard Steps */}
                                <div className="flex items-center justify-between mb-8 relative">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10"></div>
                                    {[1, 2, 3].map(step => (
                                        <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${submissionStep >= step ? 'bg-mauri-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            {step}
                                        </div>
                                    ))}
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                                        <Lock className="h-5 w-5 text-blue-600" />
                                        <p className="text-sm text-blue-800 font-medium">{t('tender_enc_notice')}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-sm font-bold text-gray-700">{t('tender_file_label')}</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3 group-hover:text-mauri-green" />
                                            <p className="text-gray-600 font-medium">Glissez votre fichier ici ou cliquez pour parcourir</p>
                                            <p className="text-xs text-gray-400 mt-1">Max 50MB. Formats: .zip, .pdf</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button 
                                            type="submit"
                                            onClick={() => setSubmissionStep(3)}
                                            className="bg-mauri-green hover:bg-mauri-dark text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                                        >
                                            {t('submit_btn')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
  };

  return selectedTender ? renderDetailView() : renderListView();
};
