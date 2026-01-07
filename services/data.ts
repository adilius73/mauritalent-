
import { JobOffer, KpiData, Translations, Resume, Tender, User, SystemLog, SiteVitrineData } from '../types';

// --- SITE VITRINE DATA (JSON Source) ---
export const siteVitrineData: SiteVitrineData = {
  "project_id": "mauritalent",
  "version": "1.0.0",
  "knowledge_blocks": [
    {
      "id": "kb_services_portage_salarial",
      "type": "service",
      "title": "Portage salarial",
      "content": {
        "label": "Portage salarial",
        "short_tagline": "Un portage salarial sur mesure, pour une collaboration sans contraintes.",
        "target_audience": ["Entreprises", "Indépendants", "Experts", "Consultants"],
        "value_proposition": "MAURITALENT prend en charge l’intégralité de la gestion administrative et sociale.",
        "benefits": [
          "Liberté de choisir les talents",
          "Externalisation complète des obligations légales",
          "Réduction des risques sociaux"
        ],
        "cta": [
          { "id": "cta_contact_portage", "label": "Contactez-nous", "intent": "contact_portage_salarial" }
        ]
      }
    },
    {
      "id": "kb_services_assistance_technique",
      "type": "service",
      "title": "Assistance Technique",
      "content": {
        "label": "Assistance Technique",
        "description": "Identification et gestion locale d’experts expatriés ou nationaux pour des projets en Mauritanie.",
        "core_offers": [
          "Recherche de profils expatriés/nationaux",
          "Mise à disposition missions courtes/longues",
          "Contractualisation locale et paie"
        ]
      }
    },
    {
      "id": "kb_services_partenariats",
      "type": "service",
      "title": "Partenariats",
      "content": {
        "label": "Partenariats & Représentation",
        "description": "Accompagnement de partenaires étrangers souhaitant se développer en Mauritanie.",
        "core_offers": [
          "Représentation commerciale",
          "Études de marché ciblées",
          "Appui au développement d'activités"
        ]
      }
    },
    {
      "id": "kb_secteurs_activite",
      "type": "sectors",
      "title": "Secteurs Stratégiques",
      "content": {
        "description": "Nous intervenons sur les secteurs clés de l'économie mauritanienne.",
        "sectors": ["Hydraulique", "Agriculture", "Infrastructures", "Mines", "Pétrole et Gaz"]
      }
    },
    {
      "id": "kb_talents",
      "type": "audience",
      "title": "Espace Talents",
      "content": {
        "description": "Boostez votre carrière avec les meilleures opportunités en Mauritanie.",
        "possible_features": [
          "Création de profil candidat",
          "Dépôt et mise à jour de CV",
          "Accès aux offres exclusives"
        ]
      }
    },
    {
      "id": "kb_entreprises",
      "type": "audience",
      "title": "Espace Entreprises",
      "content": {
        "description": "Simplifiez vos recrutements et votre gestion RH.",
        "possible_features": [
          "Recrutement de profils qualifiés",
          "Portage salarial sécurisé",
          "Assistance technique sur projets"
        ]
      }
    }
  ]
};

export const translations: Translations = {
  nav_home: { fr: "Accueil", ar: "الرئيسية", en: "Home" },
  nav_jobs: { fr: "Offres d'emploi", ar: "فرص العمل", en: "Jobs" },
  nav_tenders: { fr: "Appels d'offres", ar: "المناقصات", en: "Tenders" },
  nav_dashboard: { fr: "Tableau de bord", ar: "لوحة القيادة", en: "Dashboard" },
  nav_assistant: { fr: "Assistant RH", ar: "المساعد الذكي", en: "HR Assistant" },
  nav_admin: { fr: "Administration", ar: "إدارة النظام", en: "Admin Panel" },
  nav_login: { fr: "Connexion", ar: "تسجيل الدخول", en: "Login" },
  hero_title: { fr: "Trouvez votre avenir en Mauritanie", ar: "ابحث عن مستقبلك في موريتانيا", en: "Find your future in Mauritania" },
  hero_subtitle: { fr: "La plateforme de référence pour l'emploi et les marchés publics.", ar: "المنصة المرجعية للوظائف والمشتركات العامة.", en: "The reference platform for employment and public procurement." },
  search_placeholder: { fr: "Titre de poste, mot-clé ou entreprise...", ar: "المسمى الوظيفي، الكلمة الرئيسية أو الشركة...", en: "Job title, keyword or company..." },
  search_btn: { fr: "Rechercher", ar: "بحث", en: "Search" },
  filter_location: { fr: "Lieu", ar: "موقع", en: "Location" },
  filter_sector: { fr: "Secteur", ar: "قطاع", en: "Sector" },
  latest_jobs: { fr: "Dernières opportunités", ar: "أحدث الفرص", en: "Latest Opportunities" },
  latest_jobs_subtitle: { fr: "Explorez les meilleures opportunités du moment.", ar: "استكشف أفضل الفرص المتاحة حاليًا.", en: "Explore the best opportunities of the moment." },
  tender_badge: { fr: "Marché Public", ar: "مناقصة عامة", en: "Public Tender" },
  apply_btn: { fr: "Postuler", ar: "قدم الآن", en: "Apply Now" },
  match_score: { fr: "Compatibilité IA", ar: "توافق الذكاء الاصطناعي", en: "AI Match" },
  dashboard_title: { fr: "Tableau de bord RH - Vue Exécutive", ar: "لوحة القيادة للموارد البشرية - عرض تنفيذي", en: "HR Dashboard - Executive View" },
  dashboard_subtitle: { fr: "Vue d'ensemble des performances et indicateurs clés.", ar: "نظرة عامة على الأداء والمؤشرات الرئيسية.", en: "Overview of performance and key indicators." },
  stat_applications: { fr: "Candidatures", ar: "التطبيقات", en: "Applications" },
  stat_offers: { fr: "Offres Actives", ar: "عروض نشطة", en: "Active Offers" },
  stat_rate: { fr: "Taux de réponse", ar: "معدل الاستجابة", en: "Response Rate" },
  footer_rights: { fr: "© 2024 Mauritalent. Tous droits réservés.", ar: "© 2024 Mauritalent. كل الحقوق محفوظة.", en: "© 2024 Mauritalent. All rights reserved." },
  role_switch: {fr: "Changer de rôle (Demo)", ar: "تغيير الدور (تجريبي)", en: "Switch Role (Demo)"},
  view_all: { fr: "Voir tout", ar: "عرض الكل", en: "View all" },
  view_details: { fr: "Voir détails", ar: "عرض التفاصيل", en: "View details" },
  view_all_jobs: { fr: "Voir toutes les offres", ar: "عرض جميع العروض", en: "View all offers" },
  employers_title: { fr: "Employeurs", ar: "أصحاب العمل", en: "Employers" },
  promo_text: {
    fr: "Connecté directement avec la plateforme ROKHSA pour simplifier vos démarches administratives et permis de travail.",
    ar: "متصل مباشرة بمنصة رخصة لتبسيط إجراءاتك الإدارية وتصاريح العمل.",
    en: "Connected directly with the ROKHSA platform to simplify your administrative procedures and work permits."
  },
  learn_more: { fr: "En savoir plus", ar: "اقرأ المزيد", en: "Learn more" },
  filters_title: { fr: "Filtres", ar: "المرشحات", en: "Filters" },
  filter_cdi: { fr: "CDI", ar: "عقد دائم", en: "Permanent (CDI)" },
  filter_cdd: { fr: "CDD", ar: "عقد محدد المدة", en: "Fixed Term (CDD)" },
  filter_tender: { fr: "Appel d'offres", ar: "مناقصة", en: "Tender" },
  filter_internship: { fr: "Stage", ar: "تدريب", en: "Internship" },
  filter_freelance: { fr: "Freelance", ar: "عمل حر", en: "Freelance" },
  dashboard_banner: {
    fr: "Vous êtes connecté en tant que",
    ar: "لقد سجلت الدخول بصفتك",
    en: "You are logged in as"
  },
  space_title: { fr: "Espace", ar: "فضاء", en: "Space" },
  dashboard_sector_title: { fr: "Offres par Secteur", ar: "عروض حسب القطاع", en: "Offers by Sector" },
  dashboard_region_title: { fr: "Candidatures par Région", ar: "الطلبات حسب المنطقة", en: "Applications by Region" },
  dashboard_stats_vs: { fr: "+12% vs mois dernier", ar: "+12% مقابل الشهر الماضي", en: "+12% vs last month" },
  role_candidate: { fr: "Candidat", ar: "مرشح", en: "Candidate" },
  role_recruiter: { fr: "Recruteur", ar: "موظف", en: "Recruiter" },
  role_admin: { fr: "Admin Public", ar: "مشرف عام", en: "Public Admin" },
  role_super_admin: { fr: "Super Admin", ar: "مدير النظام", en: "Super Admin" },
  footer_about: { fr: "À propos", ar: "حول", en: "About" },
  footer_contact: { fr: "Contact", ar: "اتصال", en: "Contact" },
  footer_privacy: { fr: "Confidentialité", ar: "الخصوصية", en: "Privacy" },
  footer_rokhsa: { fr: "Intégration ROKHSA", ar: "تكامل رخصة", en: "ROKHSA Integration" },
  
  // Jobs view
  jobs_main_title: { fr: "Offres d'emploi & Appels d'offres", ar: "فرص العمل والمناقصات", en: "Jobs & Tenders" },
  jobs_subtitle: { fr: "Trouvez l'offre qui correspond à vos ambitions.", ar: "اعثر على العرض الذي يناسب طموحاتك.", en: "Find the offer that matches your ambitions." },
  no_jobs_found: { fr: "Aucune offre trouvée pour ce secteur.", ar: "لم يتم العثور على عروض لهذا القطاع.", en: "No offers found for this sector." },

  // Stats view
  time_month: { fr: "Ce mois", ar: "هذا الشهر", en: "This month" },
  time_quarter: { fr: "Ce trimestre", ar: "هذا الربع", en: "This quarter" },
  time_year: { fr: "Cette année", ar: "هذه السنة", en: "This year" },

  // Sector translations
  sector_all: { fr: "Tous les secteurs", ar: "جميع القطاعات", en: "All Sectors" },
  sector_mining: { fr: "Mines & Industrie", ar: "التعدين والصناعة", en: "Mining & Industry" },
  sector_tech: { fr: "Technologie / IT", ar: "التكنولوجيا", en: "Technology / IT" },
  sector_public: { fr: "Secteur Public", ar: "القطاع العام", en: "Public Sector" },
  sector_services: { fr: "Services & Administration", ar: "الخدمات والإدارة", en: "Services & Admin" },

  // Assistant CV & Letter Translations
  assistant_title: { fr: "Assistant CV & Lettre", ar: "مساعد السيرة الذاتية والرسالة", en: "CV & Cover Letter Assistant" },
  cv_subtitle: { fr: "Créez des documents professionnels optimisés par l'IA.", ar: "أنشئ مستندات احترافية محسنة بالذكاء الاصطناعي.", en: "Create professional documents optimized by AI." },
  tab_cv: { fr: "Générateur de CV", ar: "منشئ السيرة الذاتية", en: "Resume Builder" },
  tab_letter: { fr: "Lettre de Motivation IA", ar: "رسالة تحفيزية بالذكاء الاصطناعي", en: "AI Cover Letter" },
  cv_personal_info: { fr: "Informations Personnelles", ar: "معلومات شخصية", en: "Personal Info" },
  cv_experience: { fr: "Expérience Professionnelle", ar: "الخبرة المهنية", en: "Work Experience" },
  cv_education: { fr: "Formation", ar: "التعليم", en: "Education" },
  cv_skills: { fr: "Compétences", ar: "المهارات", en: "Skills" },
  label_fullname: { fr: "Nom complet", ar: "الاسم الكامل", en: "Full Name" },
  label_email: { fr: "Email", ar: "البريد الإلكتروني", en: "Email" },
  label_phone: { fr: "Téléphone", ar: "هاتف", en: "Phone" },
  label_location: { fr: "Ville/Lieu", ar: "المدينة / الموقع", en: "City/Location" },
  label_summary: { fr: "Résumé Profil", ar: "ملخص الملف الشخصي", en: "Profile Summary" },
  btn_add_exp: { fr: "Ajouter Expérience", ar: "إضافة خبرة", en: "Add Experience" },
  btn_add_edu: { fr: "Ajouter Formation", ar: "إضافة تعليم", en: "Add Education" },
  btn_download_pdf: { fr: "Télécharger PDF", ar: "تحميل PDF", en: "Download PDF" },
  letter_instruction: { fr: "Collez la description du poste ici. L'IA analysera les mots-clés et générera une lettre adaptée à votre profil.", ar: "الصق وصف الوظيفة هنا. سيقوم الذكاء الاصطناعي بتحليل الكلمات الرئيسية وإنشاء رسالة تناسب ملفك الشخصي.", en: "Paste the job description here. AI will analyze keywords and generate a letter tailored to your profile." },
  btn_generate_ai: { fr: "Générer avec l'IA", ar: "إنشاء باستخدام الذكاء الاصطناعي", en: "Generate with AI" },
  btn_generating: { fr: "Analyse et rédaction en cours...", ar: "جاري التحليل والكتابة...", en: "Analyzing and writing..." },
  placeholder_job_desc: { fr: "Ex: Recherche Ingénieur Minier avec 5 ans d'expérience...", ar: "مثال: مطلوب مهندس تعدين خبرة 5 سنوات...", en: "Ex: Looking for Senior Mining Engineer with 5 years exp..." },
  preview_title: { fr: "Aperçu du Document", ar: "معاينة المستند", en: "Document Preview" },

  // CV placeholders - Specific
  label_company: { fr: "Entreprise", ar: "الشركة", en: "Company" },
  label_job_title: { fr: "Titre du poste", ar: "المسمى الوظيفي", en: "Job Title" },
  label_start_date: { fr: "Date de début", ar: "تاريخ البدء", en: "Start Date" },
  label_end_date: { fr: "Date de fin", ar: "تاريخ الانتهاء", en: "End Date" },
  label_description: { fr: "Description des tâches", ar: "وصف المهام", en: "Job Description" },
  label_degree: { fr: "Diplôme obtenu", ar: "الشهادة المحصل عليها", en: "Degree Obtained" },
  label_school: { fr: "École / Université", ar: "المدرسة / الجامعة", en: "School / University" },
  label_year: { fr: "Année", ar: "السنة", en: "Year" },
  label_skills_list: { fr: "Liste des compétences", ar: "قائمة المهارات", en: "List of Skills" },
  
  placeholder_company: { fr: "Nom de l'entreprise", ar: "اسم الشركة", en: "Company Name" },
  placeholder_job: { fr: "Titre du poste", ar: "المسمى الوظيفي", en: "Job Title" },
  placeholder_date_start: { fr: "Date de début", ar: "تاريخ البدء", en: "Start Date" },
  placeholder_date_end: { fr: "Date de fin", ar: "تاريخ الانتهاء", en: "End Date" },
  placeholder_description: { fr: "Décrivez vos réalisations et responsabilités...", ar: "صف إنجازاتك ومسؤولياتك...", en: "Describe your achievements and responsibilities..." },
  placeholder_degree: { fr: "Intitulé du diplôme", ar: "اسم الشهادة", en: "Degree Title" },
  placeholder_school: { fr: "Nom de l'établissement", ar: "اسم المؤسسة", en: "Institution Name" },
  placeholder_year: { fr: "Année d'obtention", ar: "سنة التخرج", en: "Graduation Year" },
  placeholder_skills: { fr: "Gestion de projet, Leadership, Microsoft Office...", ar: "إدارة المشاريع، القيادة، مايكروسوفت أوفيس...", en: "Project Management, Leadership, Microsoft Office..." },
  
  tip_comma: { fr: "Séparez par des virgules", ar: "افصل بفاصلات", en: "Separate by commas" },
  tip_summary: { fr: "Soyez concis et percutant", ar: "كن موجزًا ومؤثرًا", en: "Be concise and impactful" },
  tip_experience: { fr: "Astuce : Mentionnez vos années d'expérience et vos 2 compétences principales pour capter l'attention du recruteur.", ar: "نصيحة: اذكر سنوات خبرتك وأهم مهارتين لجذب انتباه صاحب العمل.", en: "Tip: Mention your years of experience and top 2 skills to catch the recruiter's attention." },
  tip_job_desc: { fr: "Utilisez des verbes d'action et chiffrez vos résultats (ex: +20% de ventes).", ar: "استخدم أفعال العمل وقم بقياس النتائج (مثال: +20% مبيعات).", en: "Use action verbs and quantify results (e.g. +20% sales)." },
  
  how_it_works_title: { fr: "Comment ça marche ?", ar: "كيف يعمل؟", en: "How it works?" },
  how_it_works_desc: { fr: "Collez l'offre d'emploi ci-dessous. Notre IA analysera les mots-clés et rédigera une lettre de motivation sur-mesure basée sur votre profil actuel.", ar: "الصق عرض العمل أدناه. سيقوم الذكاء الاصطناعي بتحليل الكلمات الرئيسية وكتابة رسالة تحفيزية مخصصة بناءً على ملفك الشخصي الحالي.", en: "Paste the job offer below. Our AI will analyze keywords and draft a custom cover letter based on your current profile." },
  result_title: { fr: "Résultat (Éditable)", ar: "النتيجة (قابلة للتعديل)", en: "Result (Editable)" },
  success_generated: { fr: "Généré avec succès", ar: "تم الإنشاء بنجاح", en: "Generated successfully" },
  preview_placeholder: { fr: "Le contenu généré apparaîtra ici...", ar: "سيظهر المحتوى المنشأ هنا...", en: "Generated content will appear here..." },
  placeholder_paste_job: { fr: "Collez le texte de l'annonce ici...", ar: "الصق نص الإعلان هنا...", en: "Paste the ad text here..." },
  
  placeholder_name: { fr: "Ex: Mohamed Ould...", ar: "مثال: محمد ولد...", en: "Ex: Mohamed Ould..." },
  placeholder_email: { fr: "exemple@email.com", ar: "example@email.com", en: "example@email.com" },
  placeholder_phone: { fr: "+222...", ar: "+222...", en: "+222..." },
  placeholder_location: { fr: "Ville, Pays", ar: "المدينة، البلد", en: "City, Country" },
  placeholder_summary: { fr: "Professionnel motivé avec X années d'expérience...", ar: "محترف متحمس لديه X سنوات من الخبرة...", en: "Motivated professional with X years of experience..." },

  // Custom Fields Translations
  btn_add_custom_field: { fr: "Ajouter détail", ar: "إضافة تفاصيل", en: "Add detail" },
  label_field_name: { fr: "Titre (ex: Réalisation)", ar: "العنوان (مثال: إنجاز)", en: "Title (e.g. Achievement)" },
  label_field_value: { fr: "Détail", ar: "التفاصيل", en: "Detail" },
  
  // Tender Module Translations
  tender_search_title: { fr: "Recherche d'Appels d'Offres & AMI", ar: "البحث عن المناقصات وطلبات إبداء الاهتمام", en: "Search for Tenders & EOIs" },
  tender_search_subtitle: { fr: "Accédez aux marchés publics en Mauritanie.", ar: "الوصول إلى الأسواق العامة في موريتانيا.", en: "Access public procurement in Mauritania." },
  status_open: { fr: "Ouvert", ar: "مفتوح", en: "Open" },
  status_closed: { fr: "Clôturé", ar: "مغلق", en: "Closed" },
  status_evaluation: { fr: "Évaluation", ar: "تقييم", en: "Evaluation" },
  status_awarded: { fr: "Attribué", ar: "ممنوح", en: "Awarded" },
  tab_details: { fr: "Détails", ar: "تفاصيل", en: "Details" },
  tab_documents: { fr: "Documents", ar: "وثائق", en: "Documents" },
  tab_qa: { fr: "Questions / Réponses", ar: "أسئلة / أجوبة", en: "Q&A" },
  tab_submission: { fr: "Soumission", ar: "تقديم", en: "Submission" },
  download_dao: { fr: "Télécharger le DAO", ar: "تحميل ملف المناقصة", en: "Download Tender Doc" },
  login_required: { fr: "Connexion requise", ar: "تسجيل الدخول مطلوب", en: "Login Required" },
  login_msg: { fr: "Vous devez être connecté pour accéder à cette section.", ar: "يجب عليك تسجيل الدخول للوصول إلى هذا القسم.", en: "You must be logged in to access this section." },
  qa_ask_btn: { fr: "Poser une question", ar: "طرح سؤال", en: "Ask a Question" },
  submit_btn: { fr: "Déposer mon offre", ar: "تقديم عرضي", en: "Submit my Offer" },
  submission_success: { fr: "Offre déposée avec succès !", ar: "تم تقديم العرض بنجاح!", en: "Offer submitted successfully!" },
  submission_ref: { fr: "Référence de dépôt", ar: "مرجع الإيداع", en: "Submission Reference" },
  tender_wizard_step1: { fr: "Éligibilité & Documents", ar: "الأهلية والوثائق", en: "Eligibility & Docs" },
  tender_wizard_step2: { fr: "Téléversement Sécurisé", ar: "تحميل آمن", en: "Secure Upload" },
  tender_wizard_step3: { fr: "Confirmation", ar: "تأكيد", en: "Confirmation" },
  tender_file_label: { fr: "Fichier de l'offre (ZIP/PDF)", ar: "ملف العرض (ZIP/PDF)", en: "Offer File (ZIP/PDF)" },
  tender_enc_notice: { fr: "Vos fichiers sont chiffrés de bout en bout.", ar: "ملفاتك مشفرة من البداية إلى النهاية.", en: "Your files are end-to-end encrypted." },
  
  announcer_dashboard_title: { fr: "Espace Annonceur", ar: "فضاء المعلن", en: "Announcer Space" },
  btn_create_tender: { fr: "Créer une procédure", ar: "إنشاء إجراء", en: "Create Procedure" },
  table_id: { fr: "Réf.", ar: "المرجع", en: "Ref." },
  table_title: { fr: "Intitulé", ar: "العنوان", en: "Title" },
  table_status: { fr: "Statut", ar: "الحالة", en: "Status" },
  table_deadline: { fr: "Date limite", ar: "الموعد النهائي", en: "Deadline" },
  table_actions: { fr: "Actions", ar: "إجراءات", en: "Actions" },
  pending_evals: { fr: "Évaluations en attente", ar: "التقييمات المعلقة", en: "Pending Evaluations" },
  active_tenders: { fr: "Procédures Actives", ar: "الإجراءات النشطة", en: "Active Procedures" },

  // Dashboard Filtering/Sorting
  filter_all_statuses: { fr: "Tous les statuts", ar: "جميع الحالات", en: "All Statuses" },
  sort_label: { fr: "Trier par", ar: "فرز حسب", en: "Sort by" },
  sort_newest: { fr: "Plus récent", ar: "الأحدث", en: "Newest" },
  sort_oldest: { fr: "Plus ancien", ar: "الأقدم", en: "Oldest" },
  
  // Sharing functionality
  share_btn: { fr: "Partager", ar: "مشاركة", en: "Share" },
  copy_link: { fr: "Copier le lien", ar: "نسخ الرابط", en: "Copy Link" },
  link_copied: { fr: "Lien copié !", ar: "تم نسخ الرابط!", en: "Link Copied!" },
  share_whatsapp: { fr: "WhatsApp", ar: "واتساب", en: "WhatsApp" },
  share_linkedin: { fr: "LinkedIn", ar: "لينكد إن", en: "LinkedIn" },
  share_x: { fr: "X (Twitter)", ar: "إكس (تويتر)", en: "X (Twitter)" },

  // Pagination
  pagination_prev: { fr: "Précédent", ar: "سابق", en: "Previous" },
  pagination_next: { fr: "Suivant", ar: "التالي", en: "Next" },

  // ADMIN PANEL
  admin_dashboard: { fr: "Vue d'ensemble", ar: "نظرة عامة", en: "Overview" },
  admin_users: { fr: "Utilisateurs", ar: "المستخدمين", en: "Users" },
  admin_moderation: { fr: "Modération", ar: "الاعتدال", en: "Moderation" },
  admin_logs: { fr: "Logs Système", ar: "سجلات النظام", en: "System Logs" },
  admin_settings: { fr: "Paramètres", ar: "الإعدادات", en: "Settings" },
  user_status_active: { fr: "Actif", ar: "نشط", en: "Active" },
  user_status_pending: { fr: "En attente", ar: "قيد الانتظار", en: "Pending" },
  user_status_banned: { fr: "Banni", ar: "محظور", en: "Banned" },
  action_verify: { fr: "Vérifier", ar: "تحقق", en: "Verify" },
  action_ban: { fr: "Bannir", ar: "حظر", en: "Ban" },
  log_success: { fr: "Succès", ar: "نجاح", en: "Success" },
  log_warning: { fr: "Avertissement", ar: "تحذير", en: "Warning" },
  log_error: { fr: "Erreur", ar: "خطأ", en: "Error" },
  total_users: { fr: "Utilisateurs Totaux", ar: "إجمالي المستخدمين", en: "Total Users" },
  pending_validations: { fr: "Validations en attente", ar: "في انتظار التحقق", en: "Pending Validations" },
  system_health: { fr: "Santé du Système", ar: "صحة النظام", en: "System Health" },

  // Site Vitrine UI Labels
  sv_services_title: { fr: "Nos Services Experts", ar: "خدماتنا المتميزة", en: "Our Expert Services" },
  sv_services_subtitle: { fr: "Solutions RH complètes pour le développement en Mauritanie", ar: "حلول موارد بشرية شاملة للتنمية في موريتانيا", en: "Complete HR solutions for development in Mauritania" },
  sv_sectors_title: { fr: "Secteurs Stratégiques", ar: "القطاعات الاستراتيجية", en: "Strategic Sectors" },
  sv_audience_talents: { fr: "Pour les Talents", ar: "للمواهب", en: "For Talents" },
  sv_audience_companies: { fr: "Pour les Entreprises", ar: "للشركات", en: "For Companies" },
  btn_contact_us: { fr: "Nous contacter", ar: "اتصل بنا", en: "Contact Us" },
};

export const defaultResume: Resume = {
  fullName: "Mohamed Ould Ahmed",
  email: "mohamed.ahmed@example.mr",
  phone: "+222 46 00 00 00",
  location: "Nouakchott, Mauritanie",
  summary: "Professionnel motivé avec 5 ans d'expérience dans la gestion de projets en Mauritanie. Passionné par le développement local et les nouvelles technologies.",
  skills: "Gestion de projet, Microsoft Office, Arabe (Natif), Français (Courant), Anglais (Intermédiaire), Communication",
  experiences: [
    {
      id: '1',
      title: 'Assistant Administratif',
      company: 'Société Mauritanienne de Services',
      startDate: '2021',
      endDate: 'Présent',
      description: 'Gestion des dossiers clients, coordination des réunions et support logistique.',
      customFields: [
        { id: '101', label: 'Réalisation clé', value: 'Réduction des coûts administratifs de 15%' },
        { id: '102', label: 'Projet', value: 'Numérisation des archives de 2020 à 2023' }
      ]
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Licence en Gestion',
      school: 'Université de Nouakchott',
      year: '2020'
    }
  ]
};

export const mockJobs: JobOffer[] = [
  {
    id: '1',
    title: 'Ingénieur Minier Senior',
    company: 'SNIM (Société Nationale Industrielle et Minière)',
    location: 'Zouerate',
    type: 'CDI',
    sector: 'mining',
    date: '2024-05-10',
    salary: 'Non divulgué',
    isPublicTender: false,
    aiMatchScore: 92,
    description: "Supervision des opérations d'extraction...",
    status: 'active'
  },
  {
    id: '2',
    title: 'Développeur Full Stack React/Node',
    company: 'Nouakchott Tech Solutions',
    location: 'Nouakchott',
    type: 'CDI',
    sector: 'tech',
    date: '2024-05-12',
    salary: '40,000 MRU',
    isPublicTender: false,
    aiMatchScore: 85,
    description: "Développement de solutions web innovantes...",
    status: 'active'
  },
  {
    id: '3',
    title: 'Fourniture de matériel informatique',
    company: 'Ministère de la Transition Numérique',
    location: 'Nouakchott',
    type: 'Appel d\'offres',
    sector: 'public',
    date: '2024-05-15',
    isPublicTender: true,
    aiMatchScore: 40,
    description: "Appel d'offres national pour l'équipement des écoles...",
    status: 'active'
  },
  {
    id: '4',
    title: 'Responsable RH',
    company: 'Port Autonome de Nouadhibou',
    location: 'Nouadhibou',
    type: 'CDD',
    sector: 'services',
    date: '2024-05-08',
    salary: '35,000 MRU',
    isPublicTender: false,
    aiMatchScore: 78,
    description: "Gestion du personnel et des recrutements...",
    status: 'active'
  },
  {
    id: '5',
    title: 'Construction Route Régionale',
    company: 'Ministère de l\'Équipement et des Transports',
    location: 'Rosso',
    type: 'Appel d\'offres',
    sector: 'public',
    date: '2024-05-18',
    isPublicTender: true,
    description: "Projet de réhabilitation de la voirie urbaine...",
    status: 'pending' // Pending moderation
  }
];

export const kpiSectorData: KpiData[] = [
  { name: 'Mines', value: 45 },
  { name: 'Pêche', value: 30 },
  { name: 'Services', value: 55 },
  { name: 'Public', value: 20 },
  { name: 'Tech', value: 15 },
];

export const kpiRegionData: KpiData[] = [
  { name: 'Nouakchott', value: 120 },
  { name: 'Nouadhibou', value: 45 },
  { name: 'Zouerate', value: 30 },
  { name: 'Rosso', value: 15 },
  { name: 'Kiffa', value: 10 },
];

export const mockTenders: Tender[] = [
  {
    id: 'T-2024-001',
    title: 'Construction d\'un centre de santé à Kiffa',
    reference: 'AO-24-055-MS',
    type: 'AO',
    category: 'Travaux',
    announcer: 'Ministère de la Santé',
    status: 'open',
    publishDate: '2024-05-01',
    deadline: '2024-06-15',
    budget: '15,000,000 MRU',
    location: 'Kiffa',
    description: 'Travaux de génie civil pour la construction d\'un centre de santé de type B, incluant les lots techniques et les aménagements extérieurs. Le marché est ouvert aux entreprises nationales et internationales.',
    documents: [
      { id: 'd1', name: 'DAO Complet.pdf', type: 'dao', url: '#', version: 1, date: '2024-05-01' },
      { id: 'd2', name: 'Plans Architecturaux.zip', type: 'annex', url: '#', version: 1, date: '2024-05-01' }
    ],
    clarifications: [
      { id: 'q1', question: 'Le délai d\'exécution est-il négociable ?', answer: 'Non, le délai est ferme de 12 mois.', date: '2024-05-10', isPublic: true }
    ]
  },
  {
    id: 'T-2024-002',
    title: 'Recrutement d\'un consultant individuel pour étude d\'impact',
    reference: 'AMI-24-012-ME',
    type: 'AMI',
    category: 'Consultants',
    announcer: 'Ministère de l\'Environnement',
    status: 'evaluation',
    publishDate: '2024-04-15',
    deadline: '2024-05-05',
    budget: 'Consultant Senior',
    location: 'Nouakchott',
    description: 'Services de consultant pour réaliser l\'étude d\'impact environnemental du projet X. Le consultant doit avoir au moins 10 ans d\'expérience dans la zone Sahel.',
    documents: [
       { id: 'd3', name: 'Termes de Référence (TDR).pdf', type: 'dao', url: '#', version: 1, date: '2024-04-15' },
    ],
    clarifications: []
  },
   {
    id: 'T-2024-003',
    title: 'Acquisition de véhicules tout-terrain',
    reference: 'AO-24-088-MINT',
    type: 'AO',
    category: 'Fournitures',
    announcer: 'Ministère de l\'Intérieur',
    status: 'open',
    publishDate: '2024-05-10',
    deadline: '2024-06-20',
    budget: 'Confidential',
    location: 'Nouakchott',
    description: 'Fourniture de 50 véhicules 4x4 pour les services régionaux. Spécifications techniques détaillées dans le cahier des charges.',
    documents: [
       { id: 'd4', name: 'Cahier des Charges.pdf', type: 'dao', url: '#', version: 1, date: '2024-05-10' },
    ],
    clarifications: []
  }
];

// Admin Mock Data
export const mockUsers: User[] = [
  { id: 'u1', name: 'Ahmed Ould Sidi', email: 'ahmed@snim.mr', role: 'recruiter', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-05-20' },
  { id: 'u2', name: 'Fatimetou Mint Ali', email: 'fati@gmail.com', role: 'candidate', status: 'active', joinDate: '2024-02-15', lastLogin: '2024-05-21' },
  { id: 'u3', name: 'Ministère Santé', email: 'contact@sante.gov.mr', role: 'public_admin', status: 'active', joinDate: '2023-11-05', lastLogin: '2024-05-18' },
  { id: 'u4', name: 'StartUp RIM', email: 'hr@startuprim.com', role: 'recruiter', status: 'pending', joinDate: '2024-05-20', lastLogin: '2024-05-20' },
  { id: 'u5', name: 'Brahim Fall', email: 'brahim.f@yahoo.fr', role: 'candidate', status: 'banned', joinDate: '2024-03-01', lastLogin: '2024-04-10' },
];

export const mockSystemLogs: SystemLog[] = [
  { id: 'l1', action: 'Tender Published', user: 'Ministère Santé', role: 'public_admin', timestamp: '2024-05-20 10:30', details: 'AO-24-055-MS opened', status: 'success' },
  { id: 'l2', action: 'Login Failed', user: 'Unknown IP', role: 'guest', timestamp: '2024-05-20 11:15', details: 'Multiple failed attempts from IP 192.168.x.x', status: 'warning' },
  { id: 'l3', action: 'User Banned', user: 'Super Admin', role: 'super_admin', timestamp: '2024-05-19 14:00', details: 'Banned user u5 for spam', status: 'success' },
  { id: 'l4', action: 'Application Error', user: 'System', role: 'system', timestamp: '2024-05-18 09:22', details: 'Timeout in CV generation service', status: 'error' },
];
