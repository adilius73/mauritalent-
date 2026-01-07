
import React, { useState } from 'react';
import { MapPin, Building2, Clock, Sparkles, ChevronRight, Briefcase, Share2, Copy, Check } from 'lucide-react';
import { JobOffer, Language } from '../types';
import { translations } from '../services/data';

interface JobCardProps {
  job: JobOffer;
  lang: Language;
}

export const JobCard: React.FC<JobCardProps> = ({ job, lang }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const t = (key: string) => translations[key][lang];

  const shareUrl = `https://mauritalent.mr/jobs/${job.id}`; // Simulated URL
  const shareText = `${job.title} - ${job.company} | Mauritalent`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => {
        setIsCopied(false);
        setShowShareMenu(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-card border border-gray-100 p-0 overflow-hidden transition-all duration-300 group relative">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-mauri-green opacity-0 group-hover:opacity-100 transition-opacity rtl:left-auto rtl:right-0"></div>
      
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Icon / Logo Placeholder */}
        <div className="flex-shrink-0">
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ${job.isPublicTender ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'}`}>
                {job.isPublicTender ? <Building2 className="h-8 w-8" /> : <Briefcase className="h-8 w-8" />}
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
                {job.isPublicTender && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {t('tender_badge')}
                    </span>
                )}
                <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium border border-slate-200">
                    {job.type}
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-100">
                     {job.salary || 'Salaire Confidentiel'}
                </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-mauri-green transition-colors mb-2 truncate">
                {job.title}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-y-2 gap-x-6 mb-4">
                <div className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-700">{job.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{job.date}</span>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 rtl:text-right max-w-3xl">
                {job.description}
            </p>
        </div>

        {/* Action Column */}
        <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 rtl:md:border-l-0 rtl:md:border-r rtl:md:pr-6 rtl:md:pl-0 relative">
             {job.aiMatchScore && (
                <div className="mb-4 hidden md:flex flex-col items-end">
                     <div className="radial-progress text-xs font-bold text-indigo-600">
                        <span className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-500 fill-indigo-200" />
                            {job.aiMatchScore}% Match
                        </span>
                     </div>
                </div>
            )}

            <div className="flex items-center gap-2 w-full md:w-auto relative">
                <button 
                  onClick={handleShare}
                  aria-label={t('share_btn')}
                  className={`bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-all ${showShareMenu ? 'bg-gray-200 text-gray-900 ring-2 ring-gray-200' : ''}`}
                >
                    <Share2 className="h-5 w-5" />
                </button>

                {/* Desktop Fallback Menu */}
                {showShareMenu && (
                    <div className="absolute right-0 bottom-full mb-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-bottom-2 p-2 rtl:right-auto rtl:left-0">
                        <div className="px-3 py-2 border-b border-gray-50 mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('share_btn')} via</span>
                        </div>
                        
                        <a 
                           href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                        >
                            <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            {t('share_whatsapp')}
                        </a>
                        
                        <a 
                           href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                        >
                            <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </a>

                         <a 
                           href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors"
                        >
                            <svg className="h-5 w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            {t('share_linkedin')}
                        </a>
                        
                        <a 
                           href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            <svg className="h-4 w-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                            <span className="ml-1">{t('share_x')}</span>
                        </a>

                        <div className="h-px bg-gray-100 my-1"></div>

                        <button 
                          onClick={copyToClipboard}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        >
                            {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
                            {isCopied ? t('link_copied') : t('copy_link')}
                        </button>
                    </div>
                )}

                <button className="flex-1 group/btn md:w-auto bg-gray-900 hover:bg-mauri-green text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-mauri-green/30 flex items-center justify-center gap-2">
                    {t('apply_btn')}
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover/btn:translate-x-1 transition-transform rtl:group-hover/btn:-translate-x-1" />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
