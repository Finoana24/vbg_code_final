// ====================================
// SYSTÈME DE SIGNALEMENT - JAVASCRIPT
// ====================================

// ==========================================
// VARIABLES GLOBALES ET GESTION D'ÉTAT
// ==========================================

// État global du formulaire (équivalent useState React)
let currentStep = 1;
let selectedType = '';
let isSubmitted = false;
let uploadedFiles = [];
let currentLanguage = 'fr';

// Données du formulaire
let formData = {
    type: '',
    matricule: '',
    anonymous: false,
    typeAuteur: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    natureIncident: '',
    dateIncident: '',
    lieuIncident: '',
    description: '',
    personnesImpliquees: '',
    temoins: '',
    files: []
};

// ==========================================
// SYSTÈME DE TRADUCTION (i18n)
// ==========================================

const translations = {
    fr: {
        // Header
        home: "Accueil",
        systemTitle: "Système de Signalement",
        systemSubtitle: "Plateforme sécurisée de signalement d'incidents",
        confidential: "Confidentiel",
        
        // Progress Steps
        step1Title: "Type de signaleur",
        step2Title: "Vos informations", 
        step3Title: "L'incident",
        step4Title: "Preuves",
        step5Title: "Récapitulatif",
        
        // Type Selection
        typeSelectionTitle: "Type de signaleur",
        typeSelectionSubtitle: "Sélectionnez votre situation pour adapter le formulaire à vos besoins",
        victimeTitle: "Je suis la victime",
        victimeDesc: "Vous signalez un incident dont vous êtes directement victime",
        temoinTitle: "Je suis témoin", 
        temoinDesc: "Vous avez été témoin d'un incident et souhaitez le signaler",
        auteurTitle: "Signalement tiers",
        auteurDesc: "Parent, voisin, autorité, professionnel de santé, etc.",
        
        // Signaleur Form
        signaleurFormTitle: "Informations du signaleur",
        matriculeLabel: "Matricule attribué :",
        matriculeDesc: "Ce matricule vous permettra de suivre votre signalement en toute confidentialité",
        anonymousText: "Je souhaite rester anonyme",
        anonymousDesc: "Si vous choisissez l'anonymat, vos informations personnelles ne seront pas conservées",
        typeAuteurLabel: "Type de signaleur",
        typeAuteurPlaceholder: "Sélectionnez votre qualité",
        nomLabel: "Nom",
        prenomLabel: "Prénom", 
        telephoneLabel: "Téléphone",
        emailLabel: "Email",
        adresseLabel: "Adresse",
        
        // Incident Form
        incidentFormTitle: "Informations sur l'incident",
        natureLabel: "Nature de l'incident",
        naturePlaceholder: "Sélectionnez la nature de l'incident",
        dateLabel: "Date de l'incident",
        lieuLabel: "Lieu de l'incident",
        descriptionLabel: "Description détaillée de l'incident",
        descriptionHelp: "Soyez aussi précis que possible : qui, quoi, où, quand, comment",
        personnesLabel: "Personnes impliquées",
        temoinsLabel: "Témoins éventuels",
        futureDateError: "La date de l'incident ne peut pas être dans le futur",
        
        // Preuves Form
        preuvesFormTitle: "Preuves et documents",
        preuvesFormSubtitle: "Téléchargez tous les documents, photos, vidéos ou fichiers audio qui peuvent appuyer votre signalement",
        uploadClickText: "Cliquez pour télécharger",
        uploadDragText: "ou glissez-déposez",
        uploadTypes: "Images, vidéos, documents PDF, audio (MAX 10MB par fichier)",
        filesUploadedTitle: "Fichiers téléchargés",
        adviceTitle: "Conseils pour les preuves",
        
        // Récapitulatif
        recapTitle: "Récapitulatif de votre signalement",
        recapSubtitle: "Vérifiez les informations avant la soumission finale",
        beforeSubmitTitle: "Avant de soumettre",
        
        // Success Page
        successTitle: "Signalement soumis avec succès",
        successMessage: "Votre signalement a été enregistré et sera traité dans les plus brefs délais.",
        trackingLabel: "Votre numéro de suivi :",
        trackingDesc: "Conservez ce numéro pour suivre l'évolution de votre signalement",
        successDetailsTitle: "Détails de votre signalement",
        successInfo1: "• Un accusé de réception sera envoyé si vous avez fourni une adresse email",
        successInfo2: "• Les informations seront traitées de manière confidentielle", 
        successInfo3: "• En cas d'urgence, contactez immédiatement les autorités compétentes",
        newReportText: "Nouveau signalement",
        printText: "Imprimer le récépissé",
        
        // Navigation
        prevText: "Précédent",
        nextText: "Suivant", 
        submitText: "Soumettre le signalement",
        stepIndicator: "Étape {current} sur {total}",
        
        // Summary labels
        summaryType: "Type de signaleur",
        summaryMatricule: "Matricule",
        summaryName: "Nom complet",
        summaryPhone: "Téléphone", 
        summaryEmail: "Email",
        summaryAddress: "Adresse",
        summaryNature: "Nature de l'incident",
        summaryDate: "Date de l'incident",
        summaryLocation: "Lieu de l'incident",
        summaryDescription: "Description",
        summaryPersons: "Personnes impliquées",
        summaryWitnesses: "Témoins",
        summaryFiles: "Documents joints",
        
        // Confirmation
        confirmLeave: "Êtes-vous sûr de vouloir quitter ? Vos données non sauvegardées seront perdues."
    },
    
    en: {
        // Header
        home: "Home",
        systemTitle: "Reporting System", 
        systemSubtitle: "Secure incident reporting platform",
        confidential: "Confidential",
        
        // Progress Steps
        step1Title: "Reporter type",
        step2Title: "Your information",
        step3Title: "The incident", 
        step4Title: "Evidence",
        step5Title: "Summary",
        
        // Type Selection
        typeSelectionTitle: "Reporter type",
        typeSelectionSubtitle: "Select your situation to adapt the form to your needs",
        victimeTitle: "I am the victim",
        victimeDesc: "You are reporting an incident of which you are directly a victim",
        temoinTitle: "I am a witness",
        temoinDesc: "You witnessed an incident and want to report it",
        auteurTitle: "Third-party reporting", 
        auteurDesc: "Parent, neighbor, authority, healthcare professional, etc.",
        
        // Signaleur Form
        signaleurFormTitle: "Reporter information",
        matriculeLabel: "Assigned ID:",
        matriculeDesc: "This ID will allow you to track your report confidentially",
        anonymousText: "I want to remain anonymous",
        anonymousDesc: "If you choose anonymity, your personal information will not be kept",
        typeAuteurLabel: "Reporter type",
        typeAuteurPlaceholder: "Select your capacity",
        nomLabel: "Last name",
        prenomLabel: "First name",
        telephoneLabel: "Phone",
        emailLabel: "Email", 
        adresseLabel: "Address",
        
        // Incident Form
        incidentFormTitle: "Incident information",
        natureLabel: "Nature of incident",
        naturePlaceholder: "Select the nature of the incident",
        dateLabel: "Date of incident",
        lieuLabel: "Location of incident",
        descriptionLabel: "Detailed description of incident",
        descriptionHelp: "Be as specific as possible: who, what, where, when, how",
        personnesLabel: "People involved",
        temoinsLabel: "Possible witnesses",
        futureDateError: "The incident date cannot be in the future",
        
        // Preuves Form
        preuvesFormTitle: "Evidence and documents",
        preuvesFormSubtitle: "Upload all documents, photos, videos or audio files that can support your report",
        uploadClickText: "Click to upload",
        uploadDragText: "or drag and drop",
        uploadTypes: "Images, videos, PDF documents, audio (MAX 10MB per file)",
        filesUploadedTitle: "Uploaded files",
        adviceTitle: "Evidence tips",
        
        // Récapitulatif
        recapTitle: "Summary of your report",
        recapSubtitle: "Check the information before final submission",
        beforeSubmitTitle: "Before submitting",
        
        // Success Page
        successTitle: "Report submitted successfully",
        successMessage: "Your report has been recorded and will be processed as soon as possible.",
        trackingLabel: "Your tracking number:",
        trackingDesc: "Keep this number to track the progress of your report",
        successDetailsTitle: "Details of your report",
        successInfo1: "• An acknowledgment will be sent if you provided an email address",
        successInfo2: "• Information will be processed confidentially",
        successInfo3: "• In case of emergency, contact the competent authorities immediately",
        newReportText: "New report",
        printText: "Print receipt",
        
        // Navigation
        prevText: "Previous",
        nextText: "Next",
        submitText: "Submit report", 
        stepIndicator: "Step {current} of {total}",
        
        // Summary labels
        summaryType: "Reporter type",
        summaryMatricule: "ID number",
        summaryName: "Full name",
        summaryPhone: "Phone",
        summaryEmail: "Email",
        summaryAddress: "Address", 
        summaryNature: "Nature of incident",
        summaryDate: "Date of incident",
        summaryLocation: "Location of incident",
        summaryDescription: "Description",
        summaryPersons: "People involved",
        summaryWitnesses: "Witnesses",
        summaryFiles: "Attached documents",
        
        // Confirmation
        confirmLeave: "Are you sure you want to leave? Your unsaved data will be lost."
    },
    
    es: {
        // Header
        home: "Inicio",
        systemTitle: "Sistema de Reporte",
        systemSubtitle: "Plataforma segura de reporte de incidentes", 
        confidential: "Confidencial",
        
        // Progress Steps
        step1Title: "Tipo de reportero",
        step2Title: "Su información",
        step3Title: "El incidente",
        step4Title: "Evidencia",
        step5Title: "Resumen",
        
        // Type Selection
        typeSelectionTitle: "Tipo de reportero",
        typeSelectionSubtitle: "Seleccione su situación para adaptar el formulario a sus necesidades",
        victimeTitle: "Soy la víctima",
        victimeDesc: "Está reportando un incidente del cual es directamente víctima",
        temoinTitle: "Soy testigo",
        temoinDesc: "Fue testigo de un incidente y quiere reportarlo",
        auteurTitle: "Reporte de terceros",
        auteurDesc: "Padre, vecino, autoridad, profesional de la salud, etc.",
        
        // Signaleur Form
        signaleurFormTitle: "Información del reportero",
        matriculeLabel: "ID asignado:",
        matriculeDesc: "Este ID le permitirá rastrear su reporte confidencialmente",
        anonymousText: "Quiero permanecer anónimo",
        anonymousDesc: "Si elige el anonimato, su información personal no se conservará",
        typeAuteurLabel: "Tipo de reportero",
        typeAuteurPlaceholder: "Seleccione su capacidad",
        nomLabel: "Apellido",
        prenomLabel: "Nombre",
        telephoneLabel: "Teléfono",
        emailLabel: "Email",
        adresseLabel: "Dirección",
        
        // Incident Form
        incidentFormTitle: "Información del incidente",
        natureLabel: "Naturaleza del incidente",
        naturePlaceholder: "Seleccione la naturaleza del incidente",
        dateLabel: "Fecha del incidente",
        lieuLabel: "Lugar del incidente",
        descriptionLabel: "Descripción detallada del incidente",
        descriptionHelp: "Sea lo más específico posible: quién, qué, dónde, cuándo, cómo",
        personnesLabel: "Personas involucradas",
        temoinsLabel: "Posibles testigos",
        futureDateError: "La fecha del incidente no puede estar en el futuro",
        
        // Preuves Form
        preuvesFormTitle: "Evidencia y documentos",
        preuvesFormSubtitle: "Suba todos los documentos, fotos, videos o archivos de audio que puedan respaldar su reporte",
        uploadClickText: "Haga clic para subir",
        uploadDragText: "o arrastre y suelte",
        uploadTypes: "Imágenes, videos, documentos PDF, audio (MÁX 10MB por archivo)",
        filesUploadedTitle: "Archivos subidos",
        adviceTitle: "Consejos para evidencia",
        
        // Récapitulatif
        recapTitle: "Resumen de su reporte",
        recapSubtitle: "Verifique la información antes del envío final",
        beforeSubmitTitle: "Antes de enviar",
        
        // Success Page
        successTitle: "Reporte enviado exitosamente",
        successMessage: "Su reporte ha sido registrado y será procesado lo antes posible.",
        trackingLabel: "Su número de seguimiento:",
        trackingDesc: "Conserve este número para rastrear el progreso de su reporte",
        successDetailsTitle: "Detalles de su reporte",
        successInfo1: "• Se enviará un acuse de recibo si proporcionó una dirección de email",
        successInfo2: "• La información será procesada confidencialmente",
        successInfo3: "• En caso de emergencia, contacte inmediatamente a las autoridades competentes",
        newReportText: "Nuevo reporte",
        printText: "Imprimir recibo",
        
        // Navigation
        prevText: "Anterior",
        nextText: "Siguiente",
        submitText: "Enviar reporte",
        stepIndicator: "Paso {current} de {total}",
        
        // Summary labels
        summaryType: "Tipo de reportero",
        summaryMatricule: "Número de ID",
        summaryName: "Nombre completo",
        summaryPhone: "Teléfono",
        summaryEmail: "Email",
        summaryAddress: "Dirección",
        summaryNature: "Naturaleza del incidente",
        summaryDate: "Fecha del incidente",
        summaryLocation: "Lugar del incidente",
        summaryDescription: "Descripción",
        summaryPersons: "Personas involucradas",
        summaryWitnesses: "Testigos",
        summaryFiles: "Documentos adjuntos",
        
        // Confirmation
        confirmLeave: "¿Está seguro de que quiere salir? Sus datos no guardados se perderán."
    },
    
    ar: {
        // Header
        home: "الرئيسية",
        systemTitle: "نظام الإبلاغ",
        systemSubtitle: "منصة آمنة للإبلاغ عن الحوادث",
        confidential: "سري",
        
        // Progress Steps
        step1Title: "نوع المبلغ",
        step2Title: "معلوماتك",
        step3Title: "الحادثة",
        step4Title: "الأدلة",
        step5Title: "الملخص",
        
        // Type Selection
        typeSelectionTitle: "نوع المبلغ",
        typeSelectionSubtitle: "اختر وضعك لتكييف النموذج مع احتياجاتك",
        victimeTitle: "أنا الضحية",
        victimeDesc: "أنت تبلغ عن حادثة كنت ضحية مباشرة لها",
        temoinTitle: "أنا شاهد",
        temoinDesc: "كنت شاهداً على حادثة وتريد الإبلاغ عنها",
        auteurTitle: "إبلاغ طرف ثالث",
        auteurDesc: "والد، جار، سلطة، مهني صحي، إلخ",
        
        // Signaleur Form
        signaleurFormTitle: "معلومات المبلغ",
        matriculeLabel: "الرقم المخصص:",
        matriculeDesc: "سيسمح لك هذا الرقم بتتبع بلاغك بسرية",
        anonymousText: "أريد البقاء مجهول الهوية",
        anonymousDesc: "إذا اخترت عدم الكشف عن الهوية، فلن يتم الاحتفاظ بمعلوماتك الشخصية",
        typeAuteurLabel: "نوع المبلغ",
        typeAuteurPlaceholder: "اختر صفتك",
        nomLabel: "اللقب",
        prenomLabel: "الاسم الأول",
        telephoneLabel: "الهاتف",
        emailLabel: "البريد الإلكتروني",
        adresseLabel: "العنوان",
        
        // Incident Form
        incidentFormTitle: "معلومات الحادثة",
        natureLabel: "طبيعة الحادثة",
        naturePlaceholder: "اختر طبيعة الحادثة",
        dateLabel: "تاريخ الحادثة",
        lieuLabel: "مكان الحادثة",
        descriptionLabel: "وصف مفصل للحادثة",
        descriptionHelp: "كن محدداً قدر الإمكان: من، ماذا، أين، متى، كيف",
        personnesLabel: "الأشخاص المتورطون",
        temoinsLabel: "الشهود المحتملون",
        futureDateError: "لا يمكن أن يكون تاريخ الحادثة في المستقبل",
        
        // Preuves Form
        preuvesFormTitle: "الأدلة والوثائق",
        preuvesFormSubtitle: "قم بتحميل جميع الوثائق والصور ومقاطع الفيديو أو الملفات الصوتية التي يمكن أن تدعم بلاغك",
        uploadClickText: "انقر للتحميل",
        uploadDragText: "أو اسحب وأفلت",
        uploadTypes: "صور، فيديو، وثائق PDF، صوت (حد أقصى 10 ميجابايت لكل ملف)",
        filesUploadedTitle: "الملفات المحملة",
        adviceTitle: "نصائح للأدلة",
        
        // Récapitulatif
        recapTitle: "ملخص بلاغك",
        recapSubtitle: "تحقق من المعلومات قبل الإرسال النهائي",
        beforeSubmitTitle: "قبل الإرسال",
        
        // Success Page
        successTitle: "تم إرسال البلاغ بنجاح",
        successMessage: "تم تسجيل بلاغك وسيتم معالجته في أقرب وقت ممكن.",
        trackingLabel: "رقم التتبع الخاص بك:",
        trackingDesc: "احتفظ بهذا الرقم لتتبع تقدم بلاغك",
        successDetailsTitle: "تفاصيل بلاغك",
        successInfo1: "• سيتم إرسال إشعار استلام إذا قدمت عنوان بريد إلكتروني",
        successInfo2: "• ستتم معالجة المعلومات بسرية",
        successInfo3: "• في حالة الطوارئ، اتصل فوراً بالسلطات المختصة",
        newReportText: "بلاغ جديد",
        printText: "طباعة الإيصال",
        
        // Navigation
        prevText: "السابق",
        nextText: "التالي",
        submitText: "إرسال البلاغ",
        stepIndicator: "الخطوة {current} من {total}",
        
        // Summary labels
        summaryType: "نوع المبلغ",
        summaryMatricule: "رقم الهوية",
        summaryName: "الاسم الكامل",
        summaryPhone: "الهاتف",
        summaryEmail: "البريد الإلكتروني",
        summaryAddress: "العنوان",
        summaryNature: "طبيعة الحادثة",
        summaryDate: "تاريخ الحادثة",
        summaryLocation: "مكان الحادثة",
        summaryDescription: "الوصف",
        summaryPersons: "الأشخاص المتورطون",
        summaryWitnesses: "الشهود",
        summaryFiles: "الوثائق المرفقة",
        
        // Confirmation
        confirmLeave: "هل أنت متأكد من أنك تريد المغادرة؟ ستفقد بياناتك غير المحفوظة."
    }
};

// Fonction de traduction (équivalent useTranslation React)
function t(key, params = {}) {
    let translation = translations[currentLanguage]?.[key] || translations.fr[key] || key;
    
    // Remplacer les paramètres dans la traduction
    Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
}

// ==========================================
// FONCTIONS D'INITIALISATION
// ==========================================

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du système de signalement');
    
    // Détecter la langue du navigateur
    detectBrowserLanguage();
    
    // Initialiser les événements
    initializeEventListeners();
    
    // Configurer la date maximale pour le champ incident
    setMaxIncidentDate();
    
    // Mettre à jour l'affichage initial
    updateProgressSteps();
    updateStepIndicator();
    updateAllTexts();
    
    console.log('✅ Initialisation terminée');
});

// Détection de la langue du navigateur
function detectBrowserLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }
}

// Configuration de la date maximale pour l'incident
function setMaxIncidentDate() {
    const dateInput = document.getElementById('dateIncident');
    if (dateInput) {
        const now = new Date();
        const maxDate = now.toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:MM
        dateInput.setAttribute('max', maxDate);
    }
}

// ==========================================
// GESTION DES ÉVÉNEMENTS
// ==========================================

function initializeEventListeners() {
    console.log('🔧 Configuration des événements');
    
    // Bouton d'accueil
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', handleHomeClick);
    }
    
    // Sélecteur de langue
    initializeLanguageSelector();
    
    // Sélection du type de signaleur
    initializeTypeSelection();
    
    // Navigation entre les étapes
    initializeNavigation();
    
    // Formulaires
    initializeFormEvents();
    
    // Upload de fichiers
    initializeFileUpload();
    
    // Page de succès
    initializeSuccessPage();
}

// Gestion du clic sur le bouton d'accueil
function handleHomeClick() {
    if (!isSubmitted) {
        if (confirm(t('confirmLeave'))) {
            window.location.reload();
        }
    } else {
        window.location.reload();
    }
}

// Initialisation du sélecteur de langue
function initializeLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (languageBtn && languageDropdown) {
        // Toggle dropdown
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });
        
        // Fermer dropdown en cliquant ailleurs
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('show');
        });
        
        // Sélection de langue
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.dataset.lang;
                changeLanguage(selectedLang);
                languageDropdown.classList.remove('show');
            });
        });
    }
}

// Changement de langue
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        updateLanguageDisplay();
        updateAllTexts();
        console.log(`🌐 Langue changée vers: ${lang}`);
    }
}

// Mise à jour de l'affichage de la langue
function updateLanguageDisplay() {
    const flags = { fr: '🇫🇷', en: '🇺🇸', es: '🇪🇸', ar: '🇸🇦' };
    const names = { fr: 'Français', en: 'English', es: 'Español', ar: 'العربية' };
    
    const currentFlag = document.getElementById('currentFlag');
    const currentLangName = document.getElementById('currentLang');
    
    if (currentFlag) currentFlag.textContent = flags[currentLanguage];
    if (currentLangName) currentLangName.textContent = names[currentLanguage];
}

// ==========================================
// GESTION DES ÉTAPES ET NAVIGATION
// ==========================================

// Initialisation de la sélection de type
function initializeTypeSelection() {
    const typeOptions = document.querySelectorAll('.type-option');
    
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection précédente
            typeOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Ajouter la sélection actuelle
            this.classList.add('selected');
            
            // Sauvegarder le type sélectionné
            selectedType = this.dataset.type;
            formData.type = selectedType;
            
            // Générer un matricule pour les victimes
            if (selectedType === 'victime') {
                formData.matricule = generateMatricule();
            }
            
            console.log(`📝 Type sélectionné: ${selectedType}`);
        });
    });
}

// Génération d'un matricule unique
function generateMatricule() {
    const prefix = 'SIG';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}

// Initialisation de la navigation
function initializeNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPreviousStep);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitForm);
    }
}

// Aller à l'étape précédente
function goToPreviousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        console.log(`⬅️ Étape précédente: ${currentStep}`);
    }
}

// Aller à l'étape suivante
function goToNextStep() {
    if (validateCurrentStep()) {
        if (currentStep < 5) {
            currentStep++;
            updateStepDisplay();
            console.log(`➡️ Étape suivante: ${currentStep}`);
            
            // Mettre à jour le récapitulatif si on arrive à l'étape 5
            if (currentStep === 5) {
                updateSummary();
            }
        }
    }
}

// Validation de l'étape actuelle
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return true; // Les preuves sont optionnelles
        case 5:
            return true; // Récapitulatif, pas de validation nécessaire
        default:
            return true;
    }
}

// Validation étape 1 - Sélection du type
function validateStep1() {
    if (!selectedType) {
        alert(t('typeSelectionSubtitle'));
        return false;
    }
    return true;
}

// Validation étape 2 - Informations du signaleur
function validateStep2() {
    const anonymousCheck = document.getElementById('anonymousCheck');
    
    // Si anonyme et témoin, pas besoin de valider les champs personnels
    if (selectedType === 'temoin' && anonymousCheck && anonymousCheck.checked) {
        formData.anonymous = true;
        return true;
    }
    
    // Validation des champs obligatoires
    const requiredFields = ['nom', 'prenom', 'telephone', 'adresse'];
    
    // Ajouter typeAuteur si c'est un auteur
    if (selectedType === 'auteur') {
        requiredFields.push('typeAuteur');
    }
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.focus();
            alert(`Le champ "${field.previousElementSibling.textContent}" est obligatoire.`);
            return false;
        }
    }
    
    // Sauvegarder les données
    saveStep2Data();
    return true;
}

// Validation étape 3 - Informations sur l'incident
function validateStep3() {
    const requiredFields = ['natureIncident', 'dateIncident', 'lieuIncident', 'description'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.focus();
            alert(`Le champ "${field.previousElementSibling.textContent}" est obligatoire.`);
            return false;
        }
    }
    
    // Validation de la date
    const dateInput = document.getElementById('dateIncident');
    if (dateInput && dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const now = new Date();
        
        if (selectedDate > now) {
            alert(t('futureDateError'));
            dateInput.focus();
            return false;
        }
    }
    
    // Sauvegarder les données
    saveStep3Data();
    return true;
}

// Sauvegarde des données de l'étape 2
function saveStep2Data() {
    const fields = ['nom', 'prenom', 'telephone', 'email', 'adresse', 'typeAuteur'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            formData[fieldId] = field.value;
        }
    });
    
    const anonymousCheck = document.getElementById('anonymousCheck');
    if (anonymousCheck) {
        formData.anonymous = anonymousCheck.checked;
    }
}

// Sauvegarde des données de l'étape 3
function saveStep3Data() {
    const fields = ['natureIncident', 'dateIncident', 'lieuIncident', 'description', 'personnesImpliquees', 'temoins'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            formData[fieldId] = field.value;
        }
    });
}

// Mise à jour de l'affichage des étapes
function updateStepDisplay() {
    // Masquer toutes les étapes
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Afficher l'étape actuelle
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Mettre à jour les indicateurs de progression
    updateProgressSteps();
    updateStepIndicator();
    updateNavigationButtons();
    
    // Adapter le formulaire selon le type sélectionné
    if (currentStep === 2) {
        adaptStep2ToType();
    }
}

// Adaptation de l'étape 2 selon le type de signaleur
function adaptStep2ToType() {
    const matriculeInfo = document.getElementById('matriculeInfo');
    const anonymousOption = document.getElementById('anonymousOption');
    const typeAuteurGroup = document.getElementById('typeAuteurGroup');
    const personalInfo = document.getElementById('personalInfo');
    
    // Réinitialiser l'affichage
    if (matriculeInfo) matriculeInfo.style.display = 'none';
    if (anonymousOption) anonymousOption.style.display = 'none';
    if (typeAuteurGroup) typeAuteurGroup.style.display = 'none';
    if (personalInfo) personalInfo.style.display = 'block';
    
    switch (selectedType) {
        case 'victime':
            if (matriculeInfo) {
                matriculeInfo.style.display = 'block';
                const matriculeValue = document.getElementById('matriculeValue');
                if (matriculeValue) {
                    matriculeValue.textContent = formData.matricule;
                }
            }
            break;
            
        case 'temoin':
            if (anonymousOption) {
                anonymousOption.style.display = 'block';
                
                // Gérer l'option d'anonymat
                const anonymousCheck = document.getElementById('anonymousCheck');
                if (anonymousCheck) {
                    anonymousCheck.addEventListener('change', function() {
                        if (personalInfo) {
                            personalInfo.style.display = this.checked ? 'none' : 'block';
                        }
                    });
                }
            }
            break;
            
        case 'auteur':
            if (typeAuteurGroup) {
                typeAuteurGroup.style.display = 'block';
            }
            break;
    }
}

// Mise à jour des indicateurs de progression
function updateProgressSteps() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepCircle = step.querySelector('.step-circle');
        
        // Retirer toutes les classes
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            // Étape complétée
            step.classList.add('completed');
            if (stepCircle) {
                stepCircle.innerHTML = '✓';
                stepCircle.style.fontSize = '14px';
            }
        } else if (stepNumber === currentStep) {
            // Étape actuelle
            step.classList.add('active');
            if (stepCircle) {
                stepCircle.textContent = stepNumber;
                stepCircle.style.fontSize = '';
            }
        } else {
            // Étape future
            if (stepCircle) {
                stepCircle.textContent = stepNumber;
                stepCircle.style.fontSize = '';
            }
        }
    });
}

// Mise à jour de l'indicateur d'étape
function updateStepIndicator() {
    const stepIndicator = document.getElementById('stepIndicator');
    if (stepIndicator) {
        stepIndicator.textContent = t('stepIndicator', { current: currentStep, total: 5 });
    }
}

// Mise à jour des boutons de navigation
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Bouton précédent
    if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
    }
    
    // Boutons suivant/soumettre
    if (currentStep === 5) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'flex';
    } else {
        if (nextBtn) nextBtn.style.display = 'flex';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

// ==========================================
// GESTION DES FORMULAIRES
// ==========================================

function initializeFormEvents() {
    // Validation de la date en temps réel
    const dateInput = document.getElementById('dateIncident');
    if (dateInput) {
        dateInput.addEventListener('change', validateIncidentDate);
        dateInput.addEventListener('input', validateIncidentDate);
    }
}

// Validation de la date d'incident
function validateIncidentDate() {
    const dateInput = document.getElementById('dateIncident');
    if (!dateInput || !dateInput.value) return;
    
    const selectedDate = new Date(dateInput.value);
    const now = new Date();
    
    if (selectedDate > now) {
        dateInput.setCustomValidity(t('futureDateError'));
        dateInput.reportValidity();
    } else {
        dateInput.setCustomValidity('');
    }
}

// ==========================================
// GESTION DE L'UPLOAD DE FICHIERS
// ==========================================

function initializeFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        // Clic sur la zone d'upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag & Drop
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        
        // Sélection de fichiers
        fileInput.addEventListener('change', handleFileSelect);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function processFiles(files) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/', 'video/', 'audio/', 'application/pdf', 'application/msword', 'text/'];
    
    files.forEach(file => {
        // Vérifier la taille
        if (file.size > maxSize) {
            alert(`Le fichier "${file.name}" est trop volumineux (max 10MB).`);
            return;
        }
        
        // Vérifier le type
        const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
        if (!isAllowed) {
            alert(`Le type de fichier "${file.name}" n'est pas autorisé.`);
            return;
        }
        
        // Ajouter le fichier
        uploadedFiles.push(file);
        addFileToDisplay(file);
    });
    
    // Mettre à jour l'affichage
    updateFileDisplay();
}

function addFileToDisplay(file) {
    const filesList = document.getElementById('filesList');
    if (!filesList) return;
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-info">
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
        </div>
        <button class="remove-file" onclick="removeFile('${file.name}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    filesList.appendChild(fileItem);
}

function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
    updateFileDisplay();
}

function updateFileDisplay() {
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    const filesList = document.getElementById('filesList');
    
    if (uploadedFiles.length > 0) {
        if (uploadedFilesContainer) uploadedFilesContainer.style.display = 'block';
        if (filesList) {
            filesList.innerHTML = '';
            uploadedFiles.forEach(file => addFileToDisplay(file));
        }
    } else {
        if (uploadedFilesContainer) uploadedFilesContainer.style.display = 'none';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==========================================
// RÉCAPITULATIF ET SOUMISSION
// ==========================================

function updateSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) return;
    
    let summaryHTML = '<div class="summary-sections">';
    
    // Section signaleur
    summaryHTML += `
        <div class="summary-section">
            <h3>${t('signaleurFormTitle')}</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>${t('summaryType')}:</strong>
                    <span>${getTypeLabel(formData.type)}</span>
                </div>
    `;
    
    if (formData.matricule) {
        summaryHTML += `
                <div class="summary-item">
                    <strong>${t('summaryMatricule')}:</strong>
                    <span>${formData.matricule}</span>
                </div>
        `;
    }
    
    if (!formData.anonymous) {
        summaryHTML += `
                <div class="summary-item">
                    <strong>${t('summaryName')}:</strong>
                    <span>${formData.prenom} ${formData.nom}</span>
                </div>
                <div class="summary-item">
                    <strong>${t('summaryPhone')}:</strong>
                    <span>${formData.telephone}</span>
                </div>
        `;
        
        if (formData.email) {
            summaryHTML += `
                <div class="summary-item">
                    <strong>${t('summaryEmail')}:</strong>
                    <span>${formData.email}</span>
                </div>
            `;
        }
        
        summaryHTML += `
                <div class="summary-item">
                    <strong>${t('summaryAddress')}:</strong>
                    <span>${formData.adresse}</span>
                </div>
        `;
    } else {
        summaryHTML += `
                <div class="summary-item">
                    <strong>Statut:</strong>
                    <span>Anonyme</span>
                </div>
        `;
    }
    
    summaryHTML += `
            </div>
        </div>
    `;
    
    // Section incident
    summaryHTML += `
        <div class="summary-section">
            <h3>${t('incidentFormTitle')}</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>${t('summaryNature')}:</strong>
                    <span>${formData.natureIncident}</span>
                </div>
                <div class="summary-item">
                    <strong>${t('summaryDate')}:</strong>
                    <span>${formatDate(formData.dateIncident)}</span>
                </div>
                <div class="summary-item">
                    <strong>${t('summaryLocation')}:</strong>
                    <span>${formData.lieuIncident}</span>
                </div>
            </div>
            <div class="summary-item full-width">
                <strong>${t('summaryDescription')}:</strong>
                <p>${formData.description}</p>
            </div>
    `;
    
    if (formData.personnesImpliquees) {
        summaryHTML += `
            <div class="summary-item full-width">
                <strong>${t('summaryPersons')}:</strong>
                <p>${formData.personnesImpliquees}</p>
            </div>
        `;
    }
    
    if (formData.temoins) {
        summaryHTML += `
            <div class="summary-item full-width">
                <strong>${t('summaryWitnesses')}:</strong>
                <p>${formData.temoins}</p>
            </div>
        `;
    }
    
    summaryHTML += `
        </div>
    `;
    
    // Section fichiers
    if (uploadedFiles.length > 0) {
        summaryHTML += `
            <div class="summary-section">
                <h3>${t('summaryFiles')}</h3>
                <div class="summary-files">
        `;
        
        uploadedFiles.forEach(file => {
            summaryHTML += `
                <div class="summary-file">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            `;
        });
        
        summaryHTML += `
                </div>
            </div>
        `;
    }
    
    summaryHTML += '</div>';
    
    summaryContent.innerHTML = summaryHTML;
}

function getTypeLabel(type) {
    const labels = {
        'victime': t('victimeTitle'),
        'temoin': t('temoinTitle'),
        'auteur': t('auteurTitle')
    };
    return labels[type] || type;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(currentLanguage);
}

// ==========================================
// SOUMISSION DU FORMULAIRE
// ==========================================

function submitForm() {
    console.log('📤 Soumission du formulaire');
    
    // Simuler l'envoi (dans un vrai projet, ici on ferait un appel API)
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            <span>Envoi en cours...</span>
        `;
    }
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Marquer comme soumis
        isSubmitted = true;
        
        // Générer un numéro de suivi
        const trackingNumber = generateTrackingNumber();
        
        // Afficher la page de succès
        showSuccessPage(trackingNumber);
        
        console.log('✅ Formulaire soumis avec succès');
    }, 2000);
}

function generateTrackingNumber() {
    const prefix = 'TRK';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${date}-${random}`;
}

function showSuccessPage(trackingNumber) {
    // Masquer toutes les étapes et la navigation
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.remove('active'));
    
    const navigation = document.getElementById('navigation');
    const progressContainer = document.getElementById('progressContainer');
    
    if (navigation) navigation.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    
    // Afficher la page de succès
    const successPage = document.getElementById('successPage');
    if (successPage) {
        successPage.style.display = 'block';
        successPage.classList.add('active');
    }
    
    // Mettre à jour le numéro de suivi
    const trackingNumberElement = document.getElementById('trackingNumber');
    if (trackingNumberElement) {
        trackingNumberElement.textContent = trackingNumber;
    }
    
    // Mettre à jour le résumé de succès
    updateSuccessDetails();
    
    // Mettre à jour les textes
    updateSuccessTexts();
}

function updateSuccessDetails() {
    const successSummary = document.getElementById('successSummary');
    if (!successSummary) return;
    
    let summaryHTML = `
        <div class="success-detail-item">
            <strong>${t('summaryType')}:</strong>
            <span>${getTypeLabel(formData.type)}</span>
        </div>
        <div class="success-detail-item">
            <strong>${t('summaryNature')}:</strong>
            <span>${formData.natureIncident}</span>
        </div>
        <div class="success-detail-item">
            <strong>${t('summaryDate')}:</strong>
            <span>${formatDate(formData.dateIncident)}</span>
        </div>
        <div class="success-detail-item">
            <strong>${t('summaryLocation')}:</strong>
            <span>${formData.lieuIncident}</span>
        </div>
    `;
    
    if (uploadedFiles.length > 0) {
        summaryHTML += `
            <div class="success-detail-item">
                <strong>${t('summaryFiles')}:</strong>
                <span>${uploadedFiles.length} fichier(s)</span>
            </div>
        `;
    }
    
    successSummary.innerHTML = summaryHTML;
}

// ==========================================
// PAGE DE SUCCÈS
// ==========================================

function initializeSuccessPage() {
    const newReportBtn = document.getElementById('newReportBtn');
    const printBtn = document.getElementById('printBtn');
    
    if (newReportBtn) {
        newReportBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

function updateSuccessTexts() {
    const elements = {
        'successTitle': 'successTitle',
        'successMessage': 'successMessage',
        'trackingLabel': 'trackingLabel',
        'trackingDesc': 'trackingDesc',
        'successDetailsTitle': 'successDetailsTitle',
        'successInfo1': 'successInfo1',
        'successInfo2': 'successInfo2',
        'successInfo3': 'successInfo3',
        'newReportText': 'newReportText',
        'printText': 'printText'
    };
    
    Object.entries(elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
}

// ==========================================
// MISE À JOUR DES TEXTES
// ==========================================

function updateAllTexts() {
    updateHeaderTexts();
    updateProgressTexts();
    updateFormTexts();
    updateNavigationTexts();
    updateSuccessTexts();
}

function updateHeaderTexts() {
    const elements = {
        'headerTitle': 'systemTitle',
        'headerSubtitle': 'systemSubtitle',
        'confidentialText': 'confidential'
    };
    
    Object.entries(elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
    
    // Bouton d'accueil
    const homeText = document.querySelector('.home-text');
    if (homeText) {
        homeText.textContent = t('home');
    }
    
    updateLanguageDisplay();
}

function updateProgressTexts() {
    const stepTitles = [
        'step1Title', 'step2Title', 'step3Title', 'step4Title', 'step5Title'
    ];
    
    stepTitles.forEach((titleKey, index) => {
        const element = document.getElementById(titleKey);
        if (element) {
            element.textContent = t(titleKey);
        }
    });
}

function updateFormTexts() {
    // Étape 1 - Sélection du type
    const step1Elements = {
        'typeSelectionTitle': 'typeSelectionTitle',
        'typeSelectionSubtitle': 'typeSelectionSubtitle',
        'victimeTitle': 'victimeTitle',
        'victimeDesc': 'victimeDesc',
        'temoinTitle': 'temoinTitle',
        'temoinDesc': 'temoinDesc',
        'auteurTitle': 'auteurTitle',
        'auteurDesc': 'auteurDesc'
    };
    
    Object.entries(step1Elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
    
    // Étape 2 - Informations du signaleur
    const step2Elements = {
        'signaleurFormTitle': 'signaleurFormTitle',
        'matriculeLabel': 'matriculeLabel',
        'matriculeDesc': 'matriculeDesc',
        'anonymousText': 'anonymousText',
        'anonymousDesc': 'anonymousDesc',
        'typeAuteurLabel': 'typeAuteurLabel',
        'typeAuteurPlaceholder': 'typeAuteurPlaceholder',
        'nomLabel': 'nomLabel',
        'prenomLabel': 'prenomLabel',
        'telephoneLabel': 'telephoneLabel',
        'emailLabel': 'emailLabel',
        'adresseLabel': 'adresseLabel'
    };
    
    Object.entries(step2Elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (element.tagName === 'OPTION') {
                element.textContent = t(translationKey);
            } else {
                element.textContent = t(translationKey);
            }
        }
    });
    
    // Étape 3 - Informations sur l'incident
    const step3Elements = {
        'incidentFormTitle': 'incidentFormTitle',
        'natureLabel': 'natureLabel',
        'naturePlaceholder': 'naturePlaceholder',
        'dateLabel': 'dateLabel',
        'lieuLabel': 'lieuLabel',
        'descriptionLabel': 'descriptionLabel',
        'descriptionHelp': 'descriptionHelp',
        'personnesLabel': 'personnesLabel',
        'temoinsLabel': 'temoinsLabel'
    };
    
    Object.entries(step3Elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
    
    // Étape 4 - Preuves
    const step4Elements = {
        'preuvesFormTitle': 'preuvesFormTitle',
        'preuvesFormSubtitle': 'preuvesFormSubtitle',
        'uploadClickText': 'uploadClickText',
        'uploadDragText': 'uploadDragText',
        'uploadTypes': 'uploadTypes',
        'filesUploadedTitle': 'filesUploadedTitle',
        'adviceTitle': 'adviceTitle'
    };
    
    Object.entries(step4Elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
    
    // Étape 5 - Récapitulatif
    const step5Elements = {
        'recapTitle': 'recapTitle',
        'recapSubtitle': 'recapSubtitle',
        'beforeSubmitTitle': 'beforeSubmitTitle'
    };
    
    Object.entries(step5Elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
}

function updateNavigationTexts() {
    const elements = {
        'prevText': 'prevText',
        'nextText': 'nextText',
        'submitText': 'submitText'
    };
    
    Object.entries(elements).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    });
    
    updateStepIndicator();
}

// ==========================================
// UTILITAIRES ET HELPERS
// ==========================================

// Fonction pour déboguer l'état du formulaire
function debugFormState() {
    console.log('🔍 État actuel du formulaire:', {
        currentStep,
        selectedType,
        isSubmitted,
        formData,
        uploadedFiles: uploadedFiles.length,
        currentLanguage
    });
}

// Exposer certaines fonctions pour le débogage (développement uniquement)
if (typeof window !== 'undefined') {
    window.debugFormState = debugFormState;
    window.changeLanguage = changeLanguage;
}

console.log('📋 Script du système de signalement chargé avec succès');