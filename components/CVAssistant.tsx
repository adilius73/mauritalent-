
import React, { useState, useRef } from 'react';
import { Download, Sparkles, FileText, User, Plus, Trash2, Printer, ChevronRight, Wand2, Mail, Phone, MapPin, Calendar, Building, GraduationCap, Info, HelpCircle, ListPlus, X, Briefcase } from 'lucide-react';
import { Language, Resume, Experience, Education, CustomField } from '../types';
import { translations, defaultResume } from '../services/data';

interface CVAssistantProps {
  lang: Language;
}

// Extracted Components to prevent re-renders
const InputWithIcon = ({ 
    icon: Icon, 
    label, 
    value, 
    onChange, 
    placeholder,
    helperText
  }: { 
    icon?: any, 
    label: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string,
    helperText?: string
  }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700 tracking-tight ml-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 rtl:left-auto rtl:right-0 rtl:pr-4 rtl:pl-0">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-mauri-green transition-colors duration-200" />
          </div>
        )}
        <input 
          value={value} 
          onChange={onChange} 
          className={`block w-full ${Icon ? 'pl-12 rtl:pr-12 rtl:pl-4' : 'px-4'} pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-mauri-green/10 focus:border-mauri-green transition-all duration-200 ease-in-out shadow-sm hover:border-gray-300 text-base`} 
          placeholder={placeholder} 
        />
      </div>
      {helperText && <p className="text-xs text-gray-500 ml-1">{helperText}</p>}
    </div>
  );

  const TextAreaField = ({
    label,
    value,
    onChange,
    placeholder,
    height = "h-32",
    tip,
    icon: Icon
  }: {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
    height?: string,
    tip?: string,
    icon?: any
  }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <label className="block text-sm font-semibold text-slate-700 tracking-tight ml-1 flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-gray-500" />}
            {label}
        </label>
        {tip && (
            <div className="text-xs text-mauri-green font-medium flex items-center gap-1 bg-mauri-light/50 px-2 py-0.5 rounded-full mb-1">
                <Sparkles className="h-3 w-3" /> {tip}
            </div>
        )}
      </div>
      <textarea 
        value={value} 
        onChange={onChange} 
        className={`block w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-mauri-green/10 focus:border-mauri-green transition-all duration-200 ease-in-out shadow-sm hover:border-gray-300 text-base resize-none ${height}`} 
        placeholder={placeholder}
      />
    </div>
  );

export const CVAssistant: React.FC<CVAssistantProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'cv' | 'letter'>('cv');
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => translations[key][lang];

  // Resume handlers
  const updateInfo = (field: keyof Resume, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      customFields: []
    };
    setResume(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Custom Fields Handlers
  const addCustomField = (expId: string) => {
    const newField: CustomField = { id: Date.now().toString(), label: '', value: '' };
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, customFields: [...(exp.customFields || []), newField] };
        }
        return exp;
      })
    }));
  };

  const updateCustomField = (expId: string, fieldId: string, key: keyof CustomField, value: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            customFields: exp.customFields?.map(cf => cf.id === fieldId ? { ...cf, [key]: value } : cf)
          };
        }
        return exp;
      })
    }));
  };

  const removeCustomField = (expId: string, fieldId: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            customFields: exp.customFields?.filter(cf => cf.id !== fieldId)
          };
        }
        return exp;
      })
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: ''
    };
    setResume(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Simulated AI Generation
  const handleGenerateLetter = () => {
    if (!jobDescription) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const today = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US');
      let letter = "";
      
      if (lang === 'ar') {
        letter = `نواكشوط في ${today}

إلى السيد مدير الموارد البشرية،

يسرني أن أتقدم بطلبي هذا لشغل الوظيفة التي أعلنتم عنها. بعد اطلاعي على متطلبات الوظيفة، أجد في نفسي الكفاءة والحماس للانضمام إلى فريقكم الموقر.

بناءً على خبرتي كـ ${resume.experiences[0]?.title || 'مهني'} في ${resume.experiences[0]?.company || 'المجال السابق'}، قمت بتطوير مهارات قوية في ${resume.skills.split(',')[0] || 'مجالي'}. أنا واثق أن خلفيتي في ${resume.education[0]?.degree || 'دراستي'} ستكون إضافة قيمة لمؤسستكم.

لقد لفت انتباهي في إعلانكم التركيز على الابتكار والتطوير، وهو ما يتماشى تماماً مع طموحاتي المهنية. أنا متحمس لفرصة المساهمة في نجاح شركتكم.

أتطلع لمناقشة مؤهلاتي معكم في مقابلة قريبة.

وتفضلوا بقبول فائق الاحترام والتقدير،

${resume.fullName}
${resume.phone}
${resume.email}`;
      } else {
        letter = `Nouakchott, le ${today}

A l'attention du Responsable du Recrutement,

Objet : Candidature pour le poste

Madame, Monsieur,

C'est avec un grand intérêt que j'ai pris connaissance de votre offre d'emploi. Votre entreprise est reconnue pour son excellence en Mauritanie, et je serais honoré de pouvoir contribuer à vos projets futurs.

Fort de mon expérience en tant que ${resume.experiences[0]?.title || 'professionnel'} chez ${resume.experiences[0]?.company || 'mon employeur précédent'}, j'ai acquis une solide expertise qui correspond aux exigences de ce poste. Ma formation en ${resume.education[0]?.degree || 'gestion'} m'a permis de développer une rigueur et une capacité d'analyse que je souhaite mettre à votre service.

J'ai noté dans votre annonce l'importance que vous accordez à la compétence et à l'esprit d'équipe. Ce sont des valeurs que je partage et que j'applique au quotidien. Mes compétences en ${resume.skills.split(',')[0] || 'gestion'} me permettront d'être opérationnel rapidement.

Je me tiens à votre entière disposition pour un entretien afin de vous exposer plus en détail mes motivations.

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${resume.fullName}
${resume.phone}
${resume.email}`;
      }

      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6 no-print flex-shrink-0">
        <div>
             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-mauri-green" />
                {t('assistant_title')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{t('cv_subtitle')}</p>
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('cv')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${activeTab === 'cv' ? 'bg-white text-mauri-dark shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50 shadow-none'}`}
          >
            {t('tab_cv')}
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${activeTab === 'letter' ? 'bg-white text-mauri-dark shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50 shadow-none'}`}
          >
            {t('tab_letter')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 flex-grow overflow-hidden border-t border-gray-200 pt-6">
        
        {/* LEFT COLUMN: EDITOR */}
        <div className="overflow-y-auto pr-2 pb-20 no-print custom-scrollbar">
          
          {/* CV EDITOR */}
          {activeTab === 'cv' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
              
              {/* Personal Info */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <User className="h-5 w-5 text-mauri-green" /> {t('cv_personal_info')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                      <InputWithIcon 
                        icon={User}
                        label={t('label_fullname')} 
                        value={resume.fullName} 
                        onChange={(e) => updateInfo('fullName', e.target.value)} 
                        placeholder={t('placeholder_name')} 
                      />
                  </div>
                  <div>
                      <InputWithIcon 
                        icon={Mail}
                        label={t('label_email')} 
                        value={resume.email} 
                        onChange={(e) => updateInfo('email', e.target.value)} 
                        placeholder={t('placeholder_email')}
                      />
                  </div>
                  <div>
                      <InputWithIcon 
                        icon={Phone}
                        label={t('label_phone')} 
                        value={resume.phone} 
                        onChange={(e) => updateInfo('phone', e.target.value)} 
                        placeholder={t('placeholder_phone')}
                      />
                  </div>
                   <div className="md:col-span-2">
                      <InputWithIcon 
                        icon={MapPin}
                        label={t('label_location')} 
                        value={resume.location} 
                        onChange={(e) => updateInfo('location', e.target.value)} 
                        placeholder={t('placeholder_location')} 
                      />
                  </div>
                  <div className="col-span-2">
                      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-3 text-sm text-blue-800 mb-4">
                        <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                        <p>{t('tip_experience')}</p>
                      </div>
                      <TextAreaField
                        label={t('label_summary')}
                        value={resume.summary}
                        onChange={(e) => updateInfo('summary', e.target.value)}
                        placeholder={t('placeholder_summary')}
                        tip={t('tip_summary')}
                        icon={FileText}
                      />
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                     <Briefcase className="h-5 w-5 text-mauri-green" /> {t('cv_experience')}
                   </h3>
                   <button onClick={addExperience} className="text-sm bg-mauri-light text-mauri-dark px-4 py-2 rounded-lg font-bold flex items-center hover:bg-mauri-green hover:text-white transition-colors border border-mauri-green/10 hover:border-transparent shadow-sm">
                     <Plus className="h-4 w-4 mr-1" /> {t('btn_add_exp')}
                   </button>
                </div>
                <div className="space-y-6">
                    {resume.experiences.map((exp) => (
                    <div key={exp.id} className="bg-gray-50/80 p-6 rounded-xl border border-gray-200 relative group transition-all hover:shadow-md hover:border-mauri-green/30 hover:bg-white">
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 rtl:right-auto rtl:left-4">
                        <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div className="col-span-2 md:col-span-1">
                                <InputWithIcon 
                                    icon={Building}
                                    label={t('label_company')}
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                    placeholder={t('placeholder_company')}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <InputWithIcon 
                                    icon={Briefcase}
                                    label={t('label_job_title')}
                                    value={exp.title}
                                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                    placeholder={t('placeholder_job')}
                                />
                            </div>
                            <div>
                                <InputWithIcon 
                                    icon={Calendar}
                                    label={t('label_start_date')}
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    placeholder={t('placeholder_date_start')}
                                />
                            </div>
                            <div>
                                <InputWithIcon 
                                    icon={Calendar}
                                    label={t('label_end_date')}
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    placeholder={t('placeholder_date_end')}
                                />
                            </div>
                        </div>
                        <TextAreaField 
                            label={t('label_description')}
                            value={exp.description} 
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder={t('placeholder_description')}
                            tip={t('tip_job_desc')}
                            icon={FileText}
                        />

                        {/* Custom Fields Section */}
                        <div className="mt-5 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <ListPlus className="h-4 w-4 text-mauri-green" />
                              {t('label_field_value')}
                            </h4>
                            <button 
                              onClick={() => addCustomField(exp.id)}
                              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 border border-indigo-200"
                            >
                              <Plus className="h-3 w-3" />
                              {t('btn_add_custom_field')}
                            </button>
                          </div>
                          <div className="space-y-3">
                            {exp.customFields && exp.customFields.map((field) => (
                              <div key={field.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
                                <div className="w-1/3">
                                  <input 
                                    value={field.label}
                                    onChange={(e) => updateCustomField(exp.id, field.id, 'label', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mauri-green/20 focus:border-mauri-green placeholder-gray-400"
                                    placeholder={t('label_field_name')}
                                  />
                                </div>
                                <div className="flex-1">
                                  <input 
                                    value={field.value}
                                    onChange={(e) => updateCustomField(exp.id, field.id, 'value', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mauri-green/20 focus:border-mauri-green placeholder-gray-400"
                                    placeholder={t('label_field_value')}
                                  />
                                </div>
                                <button 
                                  onClick={() => removeCustomField(exp.id, field.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors mt-2"
                                  title="Supprimer"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                    </div>
                    ))}
                </div>
              </section>

              {/* Education & Skills */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                     <GraduationCap className="h-5 w-5 text-mauri-green" /> {t('cv_education')}
                   </h3>
                   <button onClick={addEducation} className="text-sm bg-mauri-light text-mauri-dark px-4 py-2 rounded-lg font-bold flex items-center hover:bg-mauri-green hover:text-white transition-colors border border-mauri-green/10 hover:border-transparent shadow-sm">
                     <Plus className="h-4 w-4 mr-1" /> {t('btn_add_edu')}
                   </button>
                </div>
                <div className="space-y-4">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="bg-gray-50/80 p-5 rounded-xl border border-gray-200 relative group hover:bg-white hover:border-mauri-green/30 transition-all">
                      <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 rtl:right-auto rtl:left-4">
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-3">
                              <InputWithIcon 
                                icon={GraduationCap}
                                label={t('label_degree')}
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder={t('placeholder_degree')}
                              />
                          </div>
                          <div className="md:col-span-2">
                              <InputWithIcon 
                                icon={Building}
                                label={t('label_school')}
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                placeholder={t('placeholder_school')}
                              />
                          </div>
                          <div>
                              <InputWithIcon 
                                icon={Calendar}
                                label={t('label_year')}
                                value={edu.year}
                                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                placeholder={t('placeholder_year')}
                              />
                          </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                     <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                        <Sparkles className="h-5 w-5 text-mauri-green" /> {t('cv_skills')}
                    </h3>
                    <TextAreaField
                        label={t('label_skills_list')}
                        value={resume.skills}
                        onChange={(e) => updateInfo('skills', e.target.value)}
                        placeholder={t('placeholder_skills')}
                        tip={t('tip_comma')}
                        height="h-24"
                    />
                </div>
              </section>

            </div>
          )}

          {/* LETTER GENERATOR */}
          {activeTab === 'letter' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 h-full animate-in slide-in-from-left-4 duration-300">
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 flex gap-4">
                     <div className="bg-white p-2 rounded-lg h-fit shadow-sm">
                       <Wand2 className="h-6 w-6 text-indigo-600" />
                     </div>
                     <div>
                       <h4 className="font-bold text-indigo-900 mb-1">{t('how_it_works_title')}</h4>
                       <p className="text-sm text-indigo-700 leading-relaxed">
                          {t('how_it_works_desc')}
                       </p>
                     </div>
                </div>
                <div>
                  <TextAreaField
                    label={t('placeholder_job_desc')}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder={t('placeholder_paste_job')}
                    height="h-48"
                  />
                </div>
                
                <button 
                  onClick={handleGenerateLetter}
                  disabled={isGenerating || !jobDescription}
                  className="w-full bg-gradient-to-r from-mauri-dark to-mauri-green text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      {t('btn_generating')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {t('btn_generate_ai')}
                    </>
                  )}
                </button>

                {generatedLetter && (
                   <div className="mt-8 pt-8 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{t('result_title')}</h3>
                        <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {t('success_generated')}
                        </span>
                      </div>
                      <textarea 
                        className="w-full border border-gray-300 rounded-xl p-6 h-[500px] font-serif text-gray-900 text-lg leading-relaxed focus:ring-2 focus:ring-mauri-green focus:border-transparent outline-none bg-yellow-50/20 shadow-inner"
                        value={generatedLetter}
                        onChange={(e) => setGeneratedLetter(e.target.value)}
                      />
                   </div>
                )}
             </div>
          )}
        </div>

        {/* RIGHT COLUMN: PREVIEW (Workspace Feel) */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center relative hidden lg:flex">
            {/* Toolbar */}
            <div className="w-full bg-slate-900/90 backdrop-blur p-4 flex justify-between items-center border-b border-slate-700/50 no-print z-10">
               <span className="text-slate-300 font-medium text-sm flex items-center gap-2">
                   <FileText className="h-4 w-4" />
                   {t('preview_title')}
               </span>
               <button onClick={handlePrint} className="bg-mauri-green hover:bg-green-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95">
                  <Printer className="h-4 w-4" />
                  {t('btn_download_pdf')}
               </button>
            </div>
            
            {/* Scrollable Paper Area */}
            <div className="w-full h-full overflow-y-auto p-8 flex justify-center bg-slate-800 custom-scrollbar">
                {/* A4 Paper Container */}
                <div 
                ref={printRef}
                className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] text-gray-800 print-container transform origin-top transition-transform duration-300"
                style={{ fontFamily: 'Georgia, serif' }}
                >
                {activeTab === 'cv' ? (
                    // RESUME TEMPLATE
                    <div className="space-y-6">
                    <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">{resume.fullName}</h1>
                            <p className="text-lg text-gray-600 italic font-serif">{resume.summary.split('.')[0]}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 space-y-1 font-sans">
                            <p>{resume.location}</p>
                            <p>{resume.phone}</p>
                            <p className="text-mauri-green font-medium">{resume.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="col-span-2 space-y-8">
                             <div>
                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 mb-4 text-mauri-dark pb-1">{t('cv_experience')}</h2>
                                <div className="space-y-6">
                                    {resume.experiences.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Briefcase className="h-4 w-4 text-gray-600" />
                                            <h3 className="font-bold text-gray-900 text-lg font-sans">{exp.title}</h3>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2 font-sans">
                                            <span className="font-semibold text-gray-700">{exp.company}</span>
                                            <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        {/* Improved Description Rendering for ATS */}
                                        <p className="text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-wrap text-left">{exp.description}</p>
                                        
                                        {/* Render Custom Fields as Semantic List for ATS */}
                                        {exp.customFields && exp.customFields.length > 0 && (
                                          <ul className="mt-2 space-y-1 font-sans list-disc list-inside text-sm text-gray-700">
                                            {exp.customFields.map(field => (
                                              <li key={field.id}>
                                                <span className="font-semibold">{field.label}:</span> {field.value}
                                              </li>
                                            ))}
                                          </ul>
                                        )}

                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Content */}
                        <div className="col-span-1 space-y-8">
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 mb-4 text-mauri-dark pb-1">{t('cv_education')}</h2>
                                <div className="space-y-4">
                                    {resume.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900 font-sans">{edu.degree}</h3>
                                        <div className="text-sm text-gray-600 font-sans mt-1">{edu.school}</div>
                                        <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                                    </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 mb-4 text-mauri-dark pb-1">{t('cv_skills')}</h2>
                                <ul className="flex flex-wrap gap-2 font-sans list-none p-0 m-0">
                                    {resume.skills.split(',').map((skill, i) => (
                                    <li key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                        {skill.trim()}
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-mauri-dark mb-2 pb-1">{t('label_summary')}</h2>
                        <p className="text-sm leading-relaxed text-gray-700 font-sans whitespace-pre-wrap text-left">{resume.summary}</p>
                    </div>

                    </div>
                ) : (
                    // LETTER TEMPLATE
                    <div className="space-y-8 whitespace-pre-wrap leading-relaxed text-base text-gray-800 max-w-[65ch] mx-auto">
                    {generatedLetter || (
                        <div className="text-center text-gray-300 py-32 flex flex-col items-center border-2 border-dashed border-gray-100 rounded-xl">
                        <Wand2 className="h-12 w-12 mb-4 text-gray-200" />
                        <p className="font-sans text-sm text-gray-400">{t('preview_placeholder')}</p>
                        </div>
                    )}
                    </div>
                )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
