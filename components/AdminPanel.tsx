import React, { useState } from 'react';
import { Users, Shield, Activity, Settings, Search, MoreVertical, CheckCircle, XCircle, AlertTriangle, FileText, Check, X, Bell } from 'lucide-react';
import { Language, User, SystemLog, JobOffer } from '../types';
import { translations, mockUsers, mockSystemLogs, mockJobs } from '../services/data';

interface AdminPanelProps {
  lang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'moderation' | 'logs' | 'settings'>('dashboard');
  const t = (key: string) => translations[key][lang];

  // Quick Stats
  const stats = [
    { title: t('total_users'), value: mockUsers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: t('pending_validations'), value: mockUsers.filter(u => u.status === 'pending').length + mockJobs.filter(j => j.status === 'pending').length, icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: t('system_health'), value: '99.9%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
             <Activity className="h-5 w-5 text-mauri-green" /> Activité Récente
           </h3>
           <div className="space-y-4">
             {mockSystemLogs.slice(0, 3).map(log => (
               <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                 <div className={`mt-1 h-2 w-2 rounded-full ${log.status === 'error' ? 'bg-red-500' : log.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                 <div>
                   <p className="text-sm font-medium text-gray-800">{log.action}</p>
                   <p className="text-xs text-gray-500">{log.user} • {log.timestamp}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
             <Shield className="h-5 w-5 text-amber-500" /> Actions Requises
           </h3>
           <div className="space-y-3">
              {mockUsers.filter(u => u.status === 'pending').map(user => (
                  <div key={user.id} className="flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-amber-700" />
                          <div>
                             <p className="text-sm font-bold text-amber-900">{user.name}</p>
                             <p className="text-xs text-amber-700">Nouveau compte {user.role}</p>
                          </div>
                      </div>
                      <button className="px-3 py-1 bg-white text-amber-700 text-xs font-bold rounded border border-amber-200 hover:bg-amber-100">
                          {t('action_verify')}
                      </button>
                  </div>
              ))}
              {mockUsers.filter(u => u.status === 'pending').length === 0 && (
                  <p className="text-sm text-gray-500 italic">Aucune action requise pour le moment.</p>
              )}
           </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-900">{t('admin_users')}</h3>
        <div className="relative">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 rtl:right-3 rtl:left-auto" />
             <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-mauri-green rtl:pr-9 rtl:pl-4" />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
                <th className="px-6 py-3">Utilisateur</th>
                <th className="px-6 py-3">Rôle</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Date Jointe</th>
                <th className="px-6 py-3 text-right">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {mockUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                            {user.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1 ${
                            user.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            user.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {user.status === 'active' ? <CheckCircle className="h-3 w-3" /> : 
                             user.status === 'pending' ? <AlertTriangle className="h-3 w-3" /> : 
                             <XCircle className="h-3 w-3" />}
                            {user.status === 'active' ? t('user_status_active') : 
                             user.status === 'pending' ? t('user_status_pending') : 
                             t('user_status_banned')}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {user.joinDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-900 p-1">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderModeration = () => (
      <div className="space-y-6 animate-in fade-in duration-300">
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
               <Shield className="h-5 w-5 text-blue-600 shrink-0" />
               <div>
                   <h4 className="font-bold text-blue-900 text-sm">Politique de Modération</h4>
                   <p className="text-sm text-blue-700 mt-1">
                       Toutes les offres d'emploi publiques et les appels d'offres doivent être validés par un administrateur avant d'être visibles sur la plateforme.
                   </p>
               </div>
           </div>

           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Offres en attente de validation</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {mockJobs.filter(j => j.status === 'pending').length > 0 ? (
                        mockJobs.filter(j => j.status === 'pending').map(job => (
                            <div key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase">{job.type}</span>
                                        <span className="text-xs text-gray-400">{job.date}</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900">{job.title}</h4>
                                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                        <FileText className="h-3 w-3" /> {job.company} • {job.location}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors">
                                        <X className="h-4 w-4" /> Rejeter
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-sm hover:bg-emerald-100 transition-colors">
                                        <Check className="h-4 w-4" /> Valider
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500 italic">
                            Aucune offre en attente de validation.
                        </div>
                    )}
                </div>
           </div>
      </div>
  );

  const renderLogs = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
       <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">{t('admin_logs')}</h3>
            <button className="text-xs text-mauri-green font-bold hover:underline">Exporter CSV</button>
       </div>
       <table className="w-full text-left">
           <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
               <tr>
                   <th className="px-6 py-3">Horodatage</th>
                   <th className="px-6 py-3">Action</th>
                   <th className="px-6 py-3">Utilisateur</th>
                   <th className="px-6 py-3">Détails</th>
                   <th className="px-6 py-3">Statut</th>
               </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
               {mockSystemLogs.map(log => (
                   <tr key={log.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 text-xs font-mono text-gray-500">{log.timestamp}</td>
                       <td className="px-6 py-4 font-medium text-gray-900">{log.action}</td>
                       <td className="px-6 py-4 text-sm text-gray-600">
                           {log.user} <span className="text-xs text-gray-400">({log.role})</span>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                       <td className="px-6 py-4">
                           <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                               log.status === 'success' ? 'bg-green-100 text-green-700' :
                               log.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                               'bg-red-100 text-red-700'
                           }`}>
                               {log.status === 'success' ? t('log_success') : 
                                log.status === 'warning' ? t('log_warning') : 
                                t('log_error')}
                           </span>
                       </td>
                   </tr>
               ))}
           </tbody>
       </table>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
       {/* Sidebar */}
       <aside className="w-full lg:w-64 bg-mauri-dark text-white flex-shrink-0">
           <div className="p-6">
                <div className="bg-white p-2 rounded-lg inline-block mb-3">
                     <img src="/logo.png" alt="Mauritalent" className="h-8 w-auto" />
                </div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Admin Panel
                </h2>
                <p className="text-xs text-blue-200 mt-1">Super Admin Access</p>
           </div>
           <nav className="px-4 space-y-2">
               {[
                   { id: 'dashboard', label: t('admin_dashboard'), icon: Activity },
                   { id: 'users', label: t('admin_users'), icon: Users },
                   { id: 'moderation', label: t('admin_moderation'), icon: Shield },
                   { id: 'logs', label: t('admin_logs'), icon: FileText },
                   { id: 'settings', label: t('admin_settings'), icon: Settings },
               ].map(item => (
                   <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                            activeTab === item.id 
                            ? 'bg-mauri-yellow text-mauri-dark shadow-lg' 
                            : 'text-blue-100 hover:bg-white/10 hover:text-white'
                        }`}
                   >
                       <item.icon className="h-5 w-5" />
                       {item.label}
                   </button>
               ))}
           </nav>
           
           <div className="p-6 mt-10">
               <div className="bg-blue-900/50 rounded-xl p-4 border border-blue-800">
                   <h4 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                       <Bell className="h-4 w-4 text-mauri-yellow" /> Alertes Système
                   </h4>
                   <p className="text-xs text-blue-200">
                       3 tentatives de connexion suspectes détectées aujourd'hui.
                   </p>
               </div>
           </div>
       </aside>

       {/* Main Content */}
       <div className="flex-1 p-8 overflow-y-auto max-h-screen">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {activeTab === 'dashboard' && t('admin_dashboard')}
                        {activeTab === 'users' && t('admin_users')}
                        {activeTab === 'moderation' && t('admin_moderation')}
                        {activeTab === 'logs' && t('admin_logs')}
                        {activeTab === 'settings' && t('admin_settings')}
                    </h1>
                    <p className="text-sm text-gray-500">Gérez la plateforme Mauritalent en toute sécurité.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                        v2.4.0 (Stable)
                    </span>
                </div>
            </header>

            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'moderation' && renderModeration()}
            {activeTab === 'logs' && renderLogs()}
            {activeTab === 'settings' && (
                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
                    <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">Paramètres Globaux</h3>
                    <p className="text-gray-500">Configuration des catégories, emails automatiques et API clés.</p>
                </div>
            )}
       </div>
    </div>
  );
};