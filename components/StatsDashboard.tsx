import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { kpiRegionData, kpiSectorData, translations } from '../services/data';
import { Language } from '../types';
import { Users, FileText, TrendingUp, AlertCircle, PieChart as PieIcon, BarChart3 } from 'lucide-react';

interface StatsDashboardProps {
  lang: Language;
}

const COLORS = ['#00A95C', '#FFD700', '#D01C1F', '#0088FE', '#FF8042'];

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ lang }) => {
  const t = (key: string) => translations[key][lang];

  const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string, icon: any, color: string, trend?: string }) => (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 relative overflow-hidden group hover:shadow-card transition-all">
      <div className={`absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity ${color.replace('bg-', 'text-')}`}>
         <Icon className="h-24 w-24" />
      </div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
            <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1 rtl:ml-1" />
                {trend}
            </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">{t('dashboard_title')}</h2>
            <p className="text-gray-500 mt-1">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex gap-2">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-mauri-green focus:border-mauri-green shadow-sm outline-none">
                <option>{t('time_month')}</option>
                <option>{t('time_quarter')}</option>
                <option>{t('time_year')}</option>
            </select>
        </div>
      </div>
      
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title={t('stat_applications')} 
          value="1,234" 
          icon={Users} 
          color="bg-mauri-green"
          trend="+12.5%"
        />
        <StatCard 
          title={t('stat_offers')} 
          value="85" 
          icon={FileText} 
          color="bg-blue-500"
          trend="+5.2%"
        />
        <StatCard 
          title={t('stat_rate')} 
          value="92%" 
          icon={AlertCircle} 
          color="bg-mauri-yellow"
          trend="-1.4%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Applications by Sector */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PieIcon className="h-5 w-5 text-gray-400" />
                {t('dashboard_sector_title')}
            </h3>
          </div>
          <div className="h-[350px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kpiSectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {kpiSectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                />
                <Legend iconType="circle" verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications by Region */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                {t('dashboard_region_title')}
            </h3>
          </div>
          <div className="h-[350px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={kpiRegionData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis type="category" dataKey="name" width={100} axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#00A95C" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
