'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Mic, MicOff, ChevronRight, ChevronDown, Sparkles, Target, Users, DollarSign, HelpCircle, Megaphone, Zap, Building2, Phone, Globe, BarChart3, ExternalLink, LayoutDashboard, ArrowRight, AudioLines, Presentation, Play } from 'lucide-react'

type Product = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  elevatorPitch: string
  differenciation: string[]
  casUsages: { title: string; description: string }[]
  storyClient: { client: string; resultats: string[]; citation?: string }
  pricing: string[]
  faq: { question: string; reponse: string }[]
  visuels: { src: string; alt: string }[]
  demoUrl?: string
  firstCallDeckUrl?: string
  demoEmbedUrl?: string
  convictionsFrance?: string
}

const products: Product[] = [
  {
    id: 'coworker',
    name: 'Agentforce CoWorker',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-600 to-indigo-700',
    elevatorPitch: "Agentforce CoWorker est un coéquipier IA autonome intégré directement dans Salesforce CRM. Il transforme la recherche d'informations en réponses concrètes et actions immédiates. Connecté aux données entreprise dès le premier jour, il fonctionne sur Salesforce, Slack, Teams, Desktop et Mobile — activable en 2 clics, sans services professionnels.",
    differenciation: [
      "vs Microsoft Copilot : CoWorker agit de manière autonome, il ne se contente pas de suggérer — il exécute des actions concrètes dans le CRM",
      "vs IA publique (ChatGPT, etc.) : CoWorker est ancré dans le contexte enterprise avec une couche de confiance (Trust Layer) — pas d'hallucinations sur vos données",
      "vs Solutions IA point (search isolé) : CoWorker offre une recherche fédérée + indexée, proactive, avec routage vers des agents spécialisés",
      "vs Slackbot : CoWorker est un coéquipier IA autonome multi-surfaces (CRM, Slack, Teams, Mobile) ; Slackbot est un assistant personnel limité à Slack",
      "Activation en 2 clics, aucun service pro requis — Time-to-Value immédiat"
    ],
    casUsages: [
      { title: "Préparation de rendez-vous", description: "CoWorker synthétise automatiquement l'historique client, les dernières interactions, les opportunités en cours et les signaux de risque avant chaque meeting" },
      { title: "Recherche d'information cross-système", description: "Pose une question en langage naturel et obtiens une réponse consolidée depuis l'ensemble des données Salesforce, fichiers partagés et bases de connaissances" },
      { title: "Automatisation des tâches CRM", description: "Création de comptes-rendus, mise à jour de champs, relances automatiques — CoWorker exécute les tâches répétitives de manière autonome" },
      { title: "Coaching commercial en temps réel", description: "Suggestions proactives pendant les conversations : objections anticipées, contenus pertinents, prochaines étapes recommandées" }
    ],
    storyClient: {
      client: "Salesforce (Customer Zero)",
      resultats: [
        "Déployé en interne pour 70 000+ employés Salesforce",
        "Réduction significative du temps de recherche d'information",
        "Adoption massive sans formation préalable grâce à l'interface conversationnelle",
        "Intégration native avec Slack utilisé quotidiennement par les équipes"
      ],
      citation: "CoWorker transforme la façon dont nos équipes accèdent à l'information — en 2 clics, ils ont un coéquipier IA qui connaît l'ensemble de notre contexte business."
    },
    pricing: [
      "Inclus (Unmetered) : Pour les clients Agentforce for Sales (A4S) et Agentforce One Enterprise (A1E)",
      "Metered via Flex Credits : Pour les clients Salesforce Foundations",
      "Actuellement en Beta — Anglais uniquement pour l'instant"
    ],
    faq: [
      { question: "CoWorker est-il disponible en français ?", reponse: "Actuellement en Beta et disponible uniquement en anglais. La disponibilité multilingue est prévue dans les prochaines releases." },
      { question: "Quelle est la différence avec Einstein Copilot ?", reponse: "CoWorker est l'évolution d'Einstein Copilot — il est plus autonome, multi-surfaces (pas limité à Salesforce UI), et peut exécuter des actions complexes de bout en bout." },
      { question: "Faut-il Data Cloud pour utiliser CoWorker ?", reponse: "Data Cloud enrichit les capacités de CoWorker en unifiant les données, mais CoWorker fonctionne avec les données CRM standard dès l'activation." },
      { question: "Comment se compare-t-il à un chatbot classique ?", reponse: "Un chatbot répond à des questions pré-programmées. CoWorker raisonne, planifie et exécute des workflows multi-étapes de manière autonome en s'appuyant sur le contexte complet de votre organisation." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/05/FindAnything.png?w=900", alt: "Find Anything — recherche fédérée sur 300+ sources enterprise" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/05/Analyze.png?w=900", alt: "Analyze — insights proactifs depuis les données entreprise" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/05/Plan.png?w=900", alt: "Plan & Act — déclenchement de flows et agents autonomes" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/05/Coworker-2-Available-everywhere.png?w=980", alt: "Disponible partout — Salesforce, Slack, Teams, Mobile" }
    ],
    demoUrl: "https://www.salesforce.com/fr/agentforce/coworker/",
    firstCallDeckUrl: "https://docs.google.com/presentation/d/1yTs6djUG9LgBLrfmMy1g0zAM8V4ArK6vwsGAPMvHTIQ/edit",
    demoEmbedUrl: "https://play.vidyard.com/nu8jov7JxqrYsjKfBJDShu"
  },
  {
    id: 'help-agent',
    name: 'Help Agent',
    icon: <Phone className="w-6 h-6" />,
    color: 'from-teal-600 to-cyan-700',
    elevatorPitch: "Help Agent est l'agent de support client Salesforce propulsé par Agentforce Voice, déployé sur la ligne 1-800-NO-SOFTWARE. C'est notre histoire Customer Zero la plus puissante : un agent IA vocal qui gère des scénarios de support réels à grande échelle, capable de résoudre les problèmes des clients et de répondre aux questions sans intervention humaine.",
    differenciation: [
      "Agent IA vocal (pas texte uniquement) — première ligne de support téléphonique entièrement automatisée par Agentforce",
      "Customer Zero : Salesforce utilise sa propre technologie en production à grande échelle sur sa ligne support",
      "Déployé en 30 jours seulement — démontrant la rapidité de mise en production d'Agentforce",
      "Capacités de troubleshooting et Q&A combinées dans un même agent vocal",
      "Démonstrable en live — numéro dédié disponible pour les présentations clients : +1 855-302-7007"
    ],
    casUsages: [
      { title: "Support client téléphonique 24/7", description: "Help Agent répond aux appels clients, comprend leurs problèmes en langage naturel et fournit des résolutions sans temps d'attente" },
      { title: "Troubleshooting guidé", description: "L'agent guide le client pas à pas à travers les procédures de diagnostic et résolution, comme un agent humain expert" },
      { title: "Questions-Réponses produit", description: "Réponses instantanées aux questions sur les produits, fonctionnalités, configuration et bonnes pratiques Salesforce" },
      { title: "Escalade intelligente", description: "Si le cas dépasse les capacités de l'agent IA, escalade fluide vers un agent humain avec le contexte complet de la conversation" }
    ],
    storyClient: {
      client: "Salesforce (Customer Zero — ligne 1-800-NO-SOFTWARE)",
      resultats: [
        "Déployé sur la ligne de support client Salesforce en production",
        "Capacités de troubleshooting + Q&A construites et lancées en seulement 30 jours",
        "Gère des scénarios de support réels à grande échelle",
        "Démonstrable en live aux clients via le numéro +1 855-302-7007",
        "Collaboration DET, T&P, Legal et Customer Success pour un lancement rapide"
      ],
      citation: "Nos nouvelles capacités Help Agent, propulsées par Agentforce Voice, sont live sur notre ligne de support. C'est une histoire Customer Zero puissante d'Agentforce Voice gérant des scénarios de support réels à grande échelle."
    },
    pricing: [
      "Inclus dans la plateforme Agentforce — fait partie des capacités Agentforce Voice",
      "Modèle de consommation Agentforce standard (conversations)",
      "Disponible pour les clients Service Cloud avec Agentforce"
    ],
    faq: [
      { question: "Help Agent est-il utilisable par nos clients ?", reponse: "Oui — la technologie sous-jacente (Agentforce Voice) est disponible pour tous les clients. L'implémentation sur la ligne Salesforce sert de référence et de démonstration Customer Zero." },
      { question: "Peut-on faire une démo live ?", reponse: "Oui ! Un numéro dédié bypass le menu et connecte directement à l'agent : +1 855-302-7007. Des slides et démos pré-enregistrées sont aussi disponibles." },
      { question: "En combien de temps peut-on déployer un agent vocal similaire ?", reponse: "L'équipe Salesforce a construit et lancé les capacités en 30 jours. Le time-to-value dépend de la complexité du cas d'usage client." },
      { question: "Quelles langues sont supportées ?", reponse: "Actuellement disponible en anglais. Le support multilingue pour Agentforce Voice est sur la roadmap." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-launch-fast-720x720-1.webp?w=1024", alt: "Setup no-code — lancement rapide de Help Agent" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-engage-across-channels-720x720-1.webp?w=1024", alt: "Engagement multicanal — search + chat unifiés" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-automate-w-actions-720x720-1.webp?w=1024", alt: "Actions automatisées — workflows et escalade" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-personalized-proactive-support-conversational-support-720x720-1.webp?w=1024", alt: "Support conversationnel — self-service intelligent" }
    ],
    demoUrl: "https://www.salesforce.com/service/customer-self-service/",
    firstCallDeckUrl: "https://docs.google.com/presentation/d/15IKl4Hz8vHg_y1V6o3fH2a4TP7A4C22H3JU1aYXrsKc/edit",
    demoEmbedUrl: "https://play.vidyard.com/t2QNE5As2xwPQeRTr1rKrz"
  },
  {
    id: 'momentum',
    name: 'Momentum',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-blue-600 to-blue-800',
    elevatorPitch: "Momentum est la plateforme d'intelligence conversationnelle et d'orchestration revenue acquise par Salesforce (mars 2026). Son moteur d'ingestion universel capture chaque interaction depuis Zoom, Google Meet et plus, puis structure, contextualise et exécute automatiquement — du remplissage CRM aux alertes de deal, du coaching aux briefs exécutifs. Inclus dans A4S et A1E depuis le 1er juillet 2026.",
    differenciation: [
      "vs Gong (le 'magnétophone') : Gong enregistre et transcrit. Momentum est le moteur qui fait le travail — il exécute des actions concrètes post-appel",
      "vs Clari (le 'tableau de bord') : Clari affiche des scores. Momentum orchestre le revenue de bout en bout — de l'ingestion à l'exécution",
      "Stack 3 couches unique : Ingestion → Structure & Contexte → Exécution & Orchestration",
      "Inclus sans surcoût dans A4S et A1E (là où Gong/Clari sont des add-ons coûteux)",
      "Intégration native Salesforce CRM — pas de synchronisation bidirectionnelle fragile",
      "Intelligence compétitive automatique extraite de chaque appel"
    ],
    casUsages: [
      { title: "Auto-population CRM", description: "Chaque champ CRM pertinent est automatiquement rempli après chaque appel — plus jamais de données manquantes dans les opportunités" },
      { title: "Résumés d'appels & Follow-ups", description: "Résumés structurés automatiques avec identification des next steps, objections, et génération de brouillons de follow-up" },
      { title: "Signaux IA & Alertes de deal", description: "Détection automatique des signaux de risque, changements de champion, mentions concurrentielles et alertes proactives aux managers" },
      { title: "Coaching & Scorecards", description: "Scorecards automatiques par appel avec évaluation des compétences commerciales et recommandations de coaching personnalisées" },
      { title: "Intelligence compétitive", description: "Extraction automatique des mentions concurrentielles, objections récurrentes et tendances marché depuis l'ensemble des conversations" },
      { title: "Briefs exécutifs", description: "Synthèses automatiques pour les QBR et forecasts — vision consolidée de l'ensemble des interactions d'un compte" }
    ],
    storyClient: {
      client: "Contentful",
      resultats: [
        "Adoption massive par les équipes commerciales grâce à l'automatisation du CRM",
        "Réduction significative du temps administratif post-appel",
        "Amélioration de la précision du forecast grâce aux signaux IA",
        "Coaching data-driven avec scorecards automatiques"
      ],
      citation: "Momentum nous a permis de passer d'un CRM rempli manuellement à un système vivant qui capture chaque signal de nos conversations et agit dessus automatiquement."
    },
    pricing: [
      "Inclus à $0 : Pour tous les clients Agentforce for Sales (A4S) et Agentforce One Enterprise (A1E) éligibles",
      "Disponible via QST (QSTM-0676) — processus DAM standard pour les remises",
      "SKUs éligibles : Sales Cloud A1E (200007760), A4S Add-on Performance/Enterprise/Unlimited",
      "Effectif depuis le 1er juillet 2026 (remplace la promo précédente)"
    ],
    faq: [
      { question: "Momentum remplace-t-il notre outil existant (Gong/Chorus) ?", reponse: "Oui — Momentum offre les mêmes capacités d'enregistrement/transcription PLUS l'exécution automatique. Et il est inclus dans la licence A4S/A1E, là où Gong coûte en moyenne $100-150/utilisateur/mois en plus." },
      { question: "Quelles plateformes de visioconférence sont supportées ?", reponse: "Zoom et Google Meet sont supportés nativement par le moteur d'ingestion universel. D'autres plateformes sont sur la roadmap." },
      { question: "Comment Momentum s'intègre-t-il au CRM ?", reponse: "Intégration native — Momentum écrit directement dans les objets Salesforce standard (Opportunity, Contact, Activity) sans middleware ni sync bidirectionnelle." },
      { question: "Faut-il une licence séparée ?", reponse: "Non — Momentum est inclus sans surcoût dans les licences A4S et A1E éligibles depuis le 1er juillet 2026." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/Coaching-and-Teaching-1.webp?w=1024", alt: "Coaching IA — analyse d'appel et scorecards en temps réel" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/Deep-Research-1.webp?w=1024", alt: "Deep Research — dashboard sales et signaux IA" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/sales-overview-marquee-1.webp?w=800", alt: "Sales Cloud — auto-population CRM et pipeline" }
    ],
    firstCallDeckUrl: "https://docs.google.com/presentation/d/1xPoQWWdMNMtndvFi_IiKnlzcsUX76GR76CI8Z8KmZ7M/edit",
    demoEmbedUrl: "https://www.loom.com/embed/6bc404468c33497ebac4d83c4594fed8"
  },
  {
    id: 'afo',
    name: 'Agentforce Operations',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-green-600 to-emerald-700',
    elevatorPitch: "Agentforce Operations (anciennement Regrello) digitalise les processus back-office en tâches exécutables par des agents IA. En 3 piliers — Digitaliser en minutes, Orchestrer humains + agents, Améliorer sans code — il transforme des processus qui prenaient 8-18 mois à automatiser en workflows opérationnels en 1 heure, avec 50-70% de réduction des temps de cycle.",
    differenciation: [
      "1 heure pour construire vs 8-18 mois avec les solutions traditionnelles (ERP, BPM)",
      "Minutes pour modifier vs mois — amélioration continue sans code ni IT",
      "80% de réduction du travail manuel vs 15% avec les outils classiques",
      "Orchestration hybride humains + agents IA — pas de remplacement brutal mais une collaboration intelligente",
      "Conçu pour le back-office complexe (supply chain, finance, assurance) — pas un simple outil de workflow",
      "Pas besoin de rip-and-replace : se superpose aux systèmes existants"
    ],
    casUsages: [
      { title: "Audit de factures", description: "Vérification automatique des factures fournisseurs contre les bons de commande et contrats, avec escalade intelligente des anomalies" },
      { title: "Onboarding fournisseurs", description: "Digitalisation du processus complet : collecte de documents, vérifications de conformité, validations multi-parties — 85% automatisé" },
      { title: "Qualification fournisseurs", description: "Évaluation automatique des fournisseurs selon des critères qualité, conformité et risque avec scoring et recommandations" },
      { title: "Gestion des réclamations & dommages", description: "Traitement automatisé des claims depuis la déclaration jusqu'à la résolution, incluant évaluation et approbation" },
      { title: "Souscription assurance (FINS)", description: "Automatisation du processus de policy application et underwriting avec vérification documentaire et scoring de risque" },
      { title: "Onboarding compte (FINS)", description: "Processus KYC/AML automatisé avec collecte de documents, vérifications réglementaires et activation de compte" }
    ],
    storyClient: {
      client: "Grands comptes industriels et financiers (anonymisés)",
      resultats: [
        "77% de réduction des temps de cycle (constructeur de camions)",
        "$40M économisés en automatisation des factures (entreprise énergétique)",
        "$20M+/an économisés (entreprise informatique)",
        "62% de réduction des temps de cycle (fabricant alimentaire)",
        "85% des processus d'onboarding fournisseurs automatisés"
      ],
      citation: "Ce qui prenait des mois à construire et modifier se fait maintenant en heures. Nos équipes se concentrent sur les exceptions et les décisions à haute valeur ajoutée."
    },
    pricing: [
      "Modèle packagé par taille :",
      "• Small : 10 blueprints de processus",
      "• Medium : 50 blueprints de processus",
      "• Large : 50+ blueprints personnalisés",
      "Doit être vendu sur un OrgID force.com nouveau (brand new)",
      "Actuellement disponible pour les clients PACE et FINS"
    ],
    faq: [
      { question: "Qu'est-ce qu'un 'blueprint' ?", reponse: "Un blueprint est un modèle de processus digitalisé — par exemple 'Audit de facture' ou 'Onboarding fournisseur'. Chaque blueprint peut être instancié des milliers de fois." },
      { question: "Faut-il un nouvel OrgID ?", reponse: "Oui — AFO doit être déployé sur un OrgID force.com dédié. C'est une contrainte technique actuelle liée à l'architecture Regrello." },
      { question: "Quels secteurs sont ciblés ?", reponse: "Principalement PACE (manufacturing, supply chain, énergie) et FINS (assurance, banque, services financiers). Les cas d'usage supply chain et finance sont les plus matures." },
      { question: "Comment ça se compare à un BPM classique (Pega, Appian) ?", reponse: "1h pour construire vs 8-18 mois. Les BPM traditionnels nécessitent des équipes de développeurs et des mois de paramétrage. AFO utilise l'IA pour digitaliser un processus à partir d'une simple description." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/02/Blade-1.webp?w=1024", alt: "Digitalisation — création de blueprints en langage naturel" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/02/Blade-2.webp?w=975", alt: "Orchestration — agents spécialisés back-office en action" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/02/Blade-3.webp?w=938", alt: "Dashboard — suivi des processus, taux de complétion, escalades" }
    ],
    demoEmbedUrl: "https://play.vidyard.com/DyxcSKeZuFJuegbrHT4sMQ",
    demoUrl: "https://www.salesforce.com/agentforce/operations/",
    firstCallDeckUrl: "https://docs.google.com/presentation/d/1UXYCvYZYsiCjodY97fSodlJMKhM57Z7hYXE-dwbyrO4/edit"
  },
  {
    id: 'qualified',
    name: 'Qualified',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    elevatorPitch: "Qualified est la plateforme Agentic Marketing de Salesforce pour la génération de pipeline inbound. Son agent IA SDR 'Piper' travaille le site web et l'inbox email 24/7, convertissant les visiteurs en meetings qualifiés. Acquis en avril 2026, #1 AI SDR selon Forrester & G2, avec 600+ marques B2B et des résultats prouvés : 4x plus de conversations, 3x plus de meetings, 2x plus de pipeline.",
    differenciation: [
      "Piper = AI SDR Agent autonome qui travaille 24/7 sur le site web ET l'email — pas un simple chatbot",
      "#1 AI SDR classé par Forrester et G2, 1800+ avis 5 étoiles",
      "Résultats prouvés : 4x conversations, 3x meetings, 2x pipeline — metrics vérifiables chez 600+ clients",
      "Live en ~45 jours — adoption 100% (pas de formation agent nécessaire)",
      "Cycle de vente médian de 90 jours — ROI rapide et démontrable",
      "vs 1mind (concurrent tier 1) : intégration native Salesforce, plus de données d'entraînement (600+ marques B2B), track record prouvé"
    ],
    casUsages: [
      { title: "Conversion inbound site web", description: "Piper engage chaque visiteur qualifié sur le site, identifie l'intent, qualifie selon vos critères et booke un meeting directement dans l'agenda du commercial" },
      { title: "Suivi inbound email", description: "L'agent IA traite les réponses email entrantes, continue la conversation de manière contextuelle et convertit en rendez-vous qualifiés" },
      { title: "Suivi post-événement", description: "Après un salon ou webinar, Piper engage automatiquement tous les leads capturés avec un follow-up personnalisé et contextuel" }
    ],
    storyClient: {
      client: "Asana, Epson, Gainsight, Box, Crunchbase, Grubhub",
      resultats: [
        "4x plus de conversations qualifiées sur le site web",
        "3x plus de meetings bookés par l'agent IA",
        "2x plus de pipeline généré vs. formulaires classiques",
        "100% d'adoption — aucune formation nécessaire",
        "Live en ~45 jours en moyenne"
      ],
      citation: "Qualified a transformé notre site web d'une brochure en ligne en notre meilleur commercial. Piper ne dort jamais et convertit plus que nos meilleurs SDR humains."
    },
    pricing: [
      "Premier : $149 250/an — jusqu'à 250K sessions",
      "Enterprise : $436 000/an — jusqu'à 2M sessions",
      "Ultimate : $1 360 000/an — jusqu'à 5M sessions",
      "ASP moyen FY26Q4 : $117K — les deals montent au-delà de $300K",
      "Cycle de vente médian : 90 jours"
    ],
    faq: [
      { question: "Quel est l'ICP de Qualified ?", reponse: "Client B2B Sales Cloud, 50K+ sessions mensuelles sur le site web, utilisant une des top 4 MAPs (Marketing Automation Platforms). Les entreprises mid-market à enterprise avec un volume inbound significatif." },
      { question: "Piper remplace-t-il les SDR humains ?", reponse: "Piper augmente et complète les SDR — il travaille 24/7 sur le volume que les humains ne peuvent pas traiter (nuits, weekends, volume pic). Les SDR humains se concentrent sur les comptes stratégiques et les conversations complexes." },
      { question: "Comment se passe l'intégration avec Salesforce ?", reponse: "Intégration native depuis l'acquisition — les leads, meetings et activités sont synchronisés directement dans Sales Cloud. Piper accède au contexte CRM complet pour personnaliser ses interactions." },
      { question: "Combien de temps pour être opérationnel ?", reponse: "~45 jours en moyenne pour le déploiement complet, avec 100% d'adoption dès le lancement puisque c'est un agent autonome — pas de formation des utilisateurs nécessaire." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/Sales-Development-1.webp?w=1024", alt: "Piper SDR — inbox automatisée et traitement des leads" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/Appointment-Scheduling-1.webp?w=1024", alt: "Chat IA — prise de rendez-vous qualifiés en direct" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/06/Product-Recommendation-1.webp?w=1024", alt: "Agent IA sur site web — engagement visiteur et qualification" }
    ],
    firstCallDeckUrl: "https://docs.google.com/presentation/d/1rQmpC4QK9eZjjBD1qywgPEUSYN1H4Us94OUJF6oodpA/edit",
    demoEmbedUrl: "https://www.qualified.com/"
  },
  {
    id: 'voice',
    name: 'Agentforce Voice',
    icon: <AudioLines className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-700',
    elevatorPitch: "Remplacez les IVR rigides et les bots scriptés par des agents IA vocaux qui parlent naturellement, agissent sur vos données Salesforce et transfèrent aux humains avec le contexte complet. Agentforce Voice est nativement construit sur la Salesforce Platform — chaque interaction est personnalisée, chaque escalade est fluide, chaque conversation est observable et améliorable en continu. Déployez sur téléphone, web, mobile et WhatsApp depuis un seul agent, construit une seule fois.",
    differenciation: [
      "CRM-Native Reasoning : chaque appelant est reconnu avant le premier mot grâce au Customer 360 — historique, cases, préférences — en temps réel, sans intégration",
      "Build Once, Deploy Everywhere : un seul agent fonctionne sur téléphone (PSTN/SIP), web via WebRTC, mobile et WhatsApp — voix et texte sont des modalités d'une plateforme unifiée",
      "Handoff humain fluide : lors d'une escalade, l'agent humain reçoit le transcript complet, un résumé et les actions recommandées — pas de perte de contexte",
      "vs IVR traditionnel : conversations naturelles vs menus à touches, résolution en une interaction vs parcours complexes",
      "vs Bots vocaux concurrents (Google CCAI, Amazon Connect) : nativement intégré au CRM, pas de connecteurs tiers, données client disponibles instantanément",
      "Disponibilité : PSTN GA (Amérique du Nord), SIP GA (International), Digital Channels GA (web, WhatsApp, mobile)"
    ],
    casUsages: [
      { title: "Support client téléphonique 24/7", description: "L'agent vocal répond aux appels, comprend le problème en langage naturel, accède aux données CRM du client et résout sans intervention humaine" },
      { title: "Self-service vocal sur le web et mobile", description: "Boutons 'Click-to-Talk' intégrés aux portails et apps — le client parle au lieu de taper, avec réponses vocales et texte en temps réel" },
      { title: "Escalade intelligente vers agent humain", description: "Quand le cas dépasse les capacités de l'IA, transfert fluide avec transcript complet, résumé et next actions recommandées — aucune question répétée" },
      { title: "Support multicanal WhatsApp", description: "Le même agent déployé sur WhatsApp avec capacités vocales — les clients envoient des messages vocaux et reçoivent des réponses contextuelles" },
      { title: "Monitoring et amélioration continue", description: "Chaque conversation est loguée dans le Voice Call Object avec résumés automatiques, métriques de performance et insights pour améliorer l'agent" }
    ],
    storyClient: {
      client: "Florida Prepaid & Adecco",
      resultats: [
        "Florida Prepaid : centre d'appels qui ne ferme jamais grâce à Agentforce Voice — support 24/7 sans effectifs supplémentaires",
        "Adecco : 100K+ candidats interviewés par Agentforce, maintenant déploiement de la voix pour les entretiens téléphoniques",
        "Sammons Financial : déploiement Voice pour le service client assurance",
        "Démo live disponible : +1 (213) 275-0143 (anglais) / +1 617 313-7968 (français)",
        "Salesforce Customer Zero : Help Agent déployé sur la ligne 1-800-NO-SOFTWARE"
      ],
      citation: "Notre centre d'appels ne ferme plus jamais grâce à Agentforce Voice. Les clients obtiennent des réponses instantanées à toute heure, et nos agents humains se concentrent sur les cas complexes à haute valeur ajoutée."
    },
    pricing: [
      "SKU : AgentforceVoiceAddOn — doit être provisionné avec Service Cloud Voice et Enhanced Omni-Channel",
      "Tarification Agentforce standard à la conversation",
      "Pour le test PSTN live : 3 SKUs additionnels à $0 (numéro, minutes inbound, call forwarding)",
      "Voir les rate cards détaillées : salesforce.com/agentforce/rates/"
    ],
    faq: [
      { question: "Quelle est la différence entre Voice for Phone et Voice for Digital Channels ?", reponse: "Voice for Phone connecte via la téléphonie traditionnelle (PSTN/SIP) et logue dans le Voice Call Object. Voice for Digital Channels utilise des boutons Click-to-Talk sur web, portails, WhatsApp et apps mobiles — GA depuis mai 2026." },
      { question: "Quelles langues sont supportées ?", reponse: "Anglais GA, avec extension récente au Hindi. Le support multilingue s'étend progressivement. Une démo française est disponible au +1 617 313-7968." },
      { question: "Faut-il un partenaire téléphonie ?", reponse: "Pour le PSTN, oui — via Salesforce Voice (anciennement Service Cloud Voice) avec des partenaires comme Genesys, Amazon Connect. Pour le SIP, connexion directe possible. Pour les Digital Channels, aucun partenaire requis." },
      { question: "Comment monitorer la qualité des conversations ?", reponse: "Chaque appel est logué dans le Voice Call Object avec transcript, résumé automatique et métriques. L'agent est testable et observable via les outils standard Agentforce (Agent Builder, Testing Center)." },
      { question: "Peut-on personnaliser la voix et la personnalité de l'agent ?", reponse: "Oui — configuration du persona (ton, style, instructions) dans Agent Builder, comme tout agent Agentforce. La voix elle-même est configurable via les paramètres Voice Settings." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/Agentforce-Voice-1-7.webp?w=1024", alt: "Agentforce Voice — agent vocal IA pour le centre de contact" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/Voice-Settings-4.webp?w=1024", alt: "Voice Settings — configuration et personnalisation de l'agent vocal" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/Voice-Preview-3.webp?w=986", alt: "Live Call Transcript — conversation client en temps réel" }
    ],
    demoUrl: "https://www.salesforce.com/agentforce/voice/",
    firstCallDeckUrl: "https://docs.google.com/presentation/d/15IKl4Hz8vHg_y1V6o3fH2a4TP7A4C22H3JU1aYXrsKc/edit",
    demoEmbedUrl: "https://play.vidyard.com/bT64KgHd6ngmKr6A8V2Bwn"
  }
]

function VoiceControl({ onCommand }: { onCommand: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [mounted, setMounted] = useState(false)
  const [supported, setSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return
    setSupported(true)

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'fr-FR'

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1]
      const text = result[0].transcript
      setTranscript(text)
      if (result.isFinal) {
        onCommand(text)
        setTranscript('')
      }
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
  }, [onCommand])

  const toggle = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  if (!mounted || !supported) return null

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
        }`}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {isListening ? 'Arrêter' : 'Commande vocale'}
      </button>
      {transcript && (
        <span className="text-sm text-white/60 italic">&ldquo;{transcript}&rdquo;</span>
      )}
    </div>
  )
}

function Section({ title, icon, children, defaultOpen = false }: { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="card-dark rounded-xl overflow-hidden transition-all duration-200 hover:border-white/12">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-[#1B96FF]">{icon}</span>
        <span className="font-semibold text-white text-lg flex-1">{title}</span>
        {open ? <ChevronDown className="w-5 h-5 text-white/40" /> : <ChevronRight className="w-5 h-5 text-white/40" />}
      </button>
      {open && <div className="px-6 pb-6 pt-2">{children}</div>}
    </div>
  )
}

function ExecutiveSummary({ onEnter, onSelectProduct }: { onEnter: () => void; onSelectProduct: (id: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col">
      <header className="glass px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white tracking-tight">Gagner ensemble avec Agentforce</h1>
          <p className="text-white/50 text-sm mt-1">Meeting Managers — Juillet 2026</p>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Executive Summary</h2>
          <p className="text-white/60 text-lg max-w-3xl">L'ère de l'entreprise agentique est là. Agentforce transforme chaque équipe avec des agents IA autonomes qui travaillent aux côtés de vos collaborateurs — 24/7, à grande échelle.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="card-dark rounded-xl p-6 hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">⚡ Productivité augmentée</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">CoWorker comme coéquipier IA, Momentum pour l'intelligence conversationnelle — chaque commercial et manager gagne des heures chaque jour.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onSelectProduct('coworker')} className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors font-medium">CoWorker</button>
              <button onClick={() => onSelectProduct('momentum')} className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors font-medium">Momentum</button>
            </div>
          </div>
          <div className="card-dark rounded-xl p-6 hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">🎧 Service client IA</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">Help Agent résout les problèmes clients par la voix 24/7 — déployé en 30 jours sur notre propre ligne support. Customer Zero à grande échelle.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onSelectProduct('help-agent')} className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors font-medium">Help Agent</button>
            </div>
          </div>
          <div className="card-dark rounded-xl p-6 hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center mb-4">
              <AudioLines className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">🗣️ Voix & Téléphonie IA</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">Agentforce Voice remplace les IVR rigides par des agents vocaux naturels — téléphone, web, WhatsApp — depuis un seul agent.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onSelectProduct('voice')} className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors font-medium">Agentforce Voice</button>
            </div>
          </div>
          <div className="card-dark rounded-xl p-6 hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">🚀 Pipeline & Revenue</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">Qualified génère 2x plus de pipeline inbound avec Piper, l'agent SDR IA qui travaille le site web et l'email 24/7.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onSelectProduct('qualified')} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors font-medium">Qualified</button>
            </div>
          </div>
          <div className="card-dark rounded-xl p-6 hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">🏭 Opérations transformées</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">Agentforce Operations digitalise le back-office en heures au lieu de mois. 50-70% de réduction des temps de cycle.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onSelectProduct('afo')} className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors font-medium">AF Operations</button>
            </div>
          </div>
        </div>

        <div className="card-dark rounded-xl p-8 mb-12">
          <h3 className="text-white font-bold text-xl mb-6">💬 Messages clés pour vos conversations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#1B96FF]/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#1B96FF]">1</span>
              <div>
                <p className="text-white font-medium">🎁 Inclus dans vos licences existantes</p>
                <p className="text-white/50 text-sm mt-1">CoWorker et Momentum sont inclus sans surcoût dans A4S et A1E. Pas de budget additionnel à aller chercher.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#1B96FF]/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#1B96FF]">2</span>
              <div>
                <p className="text-white font-medium">⏱️ Time-to-Value immédiat</p>
                <p className="text-white/50 text-sm mt-1">CoWorker s'active en 2 clics. Qualified est live en 45 jours. Help Agent a été déployé en 30 jours. Pas de projet à 18 mois.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#1B96FF]/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#1B96FF]">3</span>
              <div>
                <p className="text-white font-medium">🍽️ Customer Zero — on mange notre propre nourriture</p>
                <p className="text-white/50 text-sm mt-1">CoWorker déployé pour 70K+ employés, Help Agent en prod sur notre ligne support. Preuve par l'usage à grande échelle.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#1B96FF]/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#1B96FF]">4</span>
              <div>
                <p className="text-white font-medium">💰 Remplace les outils tiers coûteux</p>
                <p className="text-white/50 text-sm mt-1">Momentum remplace Gong ($100-150/user/mois). Qualified remplace les SDR sous-performants. AFO remplace les BPM à 18 mois de setup.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 w-6 h-6 rounded-full bg-[#1B96FF]/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#1B96FF]">5</span>
              <div>
                <p className="text-white font-medium">🛡️ Confiance et sécurité natives</p>
                <p className="text-white/50 text-sm mt-1">Trust Layer, garde-fous, pas d'hallucinations sur vos données. L'IA enterprise responsable, pas l'IA grand public.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {products.map(p => (
            <button key={p.id} onClick={() => onSelectProduct(p.id)} className="card-dark rounded-xl p-4 text-center hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/20">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3`}>
                {p.icon}
              </div>
              <p className="text-white text-sm font-medium">{p.name}</p>
            </button>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/[0.06] text-white/40 text-center py-6 text-sm">
        Agentforce Portfolio — Meeting Managers — Juillet 2026
      </footer>
    </div>
  )
}

export default function ProductsPage() {
  const [view, setView] = useState<'summary' | 'products'>('summary')
  const [activeProduct, setActiveProduct] = useState<string>('coworker')
  const product = products.find(p => p.id === activeProduct)!

  const handleVoiceCommand = (text: string) => {
    const lower = text.toLowerCase()
    const productMap: Record<string, string> = {
      'coworker': 'coworker', 'co-worker': 'coworker', 'co worker': 'coworker',
      'help': 'help-agent', 'help agent': 'help-agent',
      'momentum': 'momentum',
      'operations': 'afo', 'opérations': 'afo', 'afo': 'afo',
      'qualified': 'qualified', 'qualifié': 'qualified', 'piper': 'qualified',
      'voice': 'voice', 'voix': 'voice', 'vocal': 'voice'
    }
    for (const [keyword, id] of Object.entries(productMap)) {
      if (lower.includes(keyword)) {
        setActiveProduct(id)
        return
      }
    }
  }

  if (view === 'summary') {
    return <ExecutiveSummary onEnter={() => setView('products')} onSelectProduct={(id) => { setActiveProduct(id); setView('products') }} />
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <header className="glass px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('summary')} className="text-white/40 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Gagner ensemble avec Agentforce</h1>
              <p className="text-white/50 text-sm mt-1">Présentation Interactive Managers</p>
            </div>
          </div>
          <div suppressHydrationWarning>
            <VoiceControl onCommand={handleVoiceCommand} />
          </div>
        </div>
      </header>

      <nav className="glass sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-thin">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveProduct(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeProduct === p.id
                    ? `bg-gradient-to-r ${p.color} text-white shadow-lg glow-blue`
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {p.icon}
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <div className={`bg-gradient-to-br ${product.color} rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              {product.icon}
              <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
            </div>
            <p className="text-lg leading-relaxed text-white/90 max-w-4xl">{product.elevatorPitch}</p>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${product.color} rounded-2xl p-8 text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative">
            <h3 className="text-xl font-bold tracking-tight mb-3">🇫🇷 Nos convictions pour la France</h3>
            <p className="text-white/80 leading-relaxed">{product.convictionsFrance || "Contenu à venir..."}</p>
          </div>
        </div>

        <Section title="Démo interactive" icon={<Play className="w-5 h-5" />} defaultOpen={true}>
          {product.demoEmbedUrl && (
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={product.demoEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          {(product.demoUrl || product.firstCallDeckUrl) && (
            <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap gap-3">
              {product.firstCallDeckUrl && (
                <a
                  href={product.firstCallDeckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Presentation className="w-4 h-4" />
                  First Call Deck
                </a>
              )}
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Page produit
                </a>
              )}
            </div>
          )}
        </Section>

        <Section title="Éléments de différenciation" icon={<Target className="w-5 h-5" />} defaultOpen={true}>
          <ul className="space-y-3">
            {product.differenciation.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#1B96FF] flex-shrink-0" />
                <span className="text-white/80">{d}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Cas d'usages" icon={<Users className="w-5 h-5" />}>
          <div className="grid md:grid-cols-2 gap-4">
            {product.casUsages.map((c, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                <h4 className="font-semibold text-white mb-2">{c.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Story client" icon={<Megaphone className="w-5 h-5" />}>
          <div className="bg-gradient-to-br from-white/[0.04] to-[#0176D3]/10 rounded-xl p-6 border border-white/[0.06]">
            <h4 className="font-bold text-white text-lg mb-4">{product.storyClient.client}</h4>
            <ul className="space-y-2.5 mb-5">
              {product.storyClient.resultats.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/80">
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            {product.storyClient.citation && (
              <blockquote className="border-l-4 border-[#1B96FF] pl-4 italic text-white/60">
                &ldquo;{product.storyClient.citation}&rdquo;
              </blockquote>
            )}
          </div>
        </Section>

        <Section title="Pricing" icon={<DollarSign className="w-5 h-5" />}>
          <ul className="space-y-2.5">
            {product.pricing.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80">
                <DollarSign className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="FAQ" icon={<HelpCircle className="w-5 h-5" />}>
          <div className="space-y-5">
            {product.faq.map((f, i) => (
              <div key={i} className="border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
                <h4 className="font-semibold text-white mb-2">{f.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{f.reponse}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Call to Action" icon={<ChevronRight className="w-5 h-5" />}>
          <div className="bg-white/[0.03] border border-dashed border-white/20 rounded-xl p-6 text-center text-white/40 italic">
            À compléter par le présentateur
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/[0.06] text-white/40 text-center py-6 text-sm">
        Agentforce Portfolio — Meeting Managers — Juillet 2026
      </footer>
    </div>
  )
}
