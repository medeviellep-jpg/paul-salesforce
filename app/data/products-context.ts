export type ProductContext = {
  id: string
  name: string
  elevatorPitch: string
  differenciation: string[]
  casUsages: { title: string; description: string }[]
  storyClient: { client: string; resultats: string[]; citation?: string }
  pricing: string[]
  faq: { question: string; reponse: string }[]
  convictionsFranceText?: string
  ressources: { title: string; url?: string; category: string }[]
}

export const productsContext: ProductContext[] = [
  {
    id: "coworker",
    name: "Agentforce CoWorker",
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
    convictionsFranceText: "CoWorker est un play tactique puissant au-delà du CRM conversationnel : 1) Accélérateur de cycle de vente — Activer CoWorker pour rassurer sur notre techno et éviter un pilote/POC à rallonge. 2) Accélérateur d'Adoption et de Change — Positionner CoWorker en Super Agent Orchestrateur de sous-agents spécialisés. 3) Accélérateur de Consommation (Flex) et de valeur (A4X) — Clients avec des grosses allocations doivent montrer qu'ils n'ont pas acheté pour rien.",
    ressources: [
      { title: "First Call Deck / Pitch Deck (GSlides)", url: "https://docs.google.com/presentation/d/1yTs6djUG9LgBLrfmMy1g0zAM8V4ArK6vwsGAPMvHTIQ/edit", category: "First Call Deck" },
      { title: "Internal FAQs (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B2RMADLP3", category: "FAQ & Knowledge" },
      { title: "Getting Started Guide — Org62 (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0ASL5J6TS6", category: "FAQ & Knowledge" },
      { title: "AE Sales Playbook (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B7KTPBJE4", category: "Sales Playbook & Activation" },
      { title: "Consumption Scale Play (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B49R4SQJF", category: "Sales Playbook & Activation" },
      { title: "BASHO Email template (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B1T01SU0J", category: "Sales Playbook & Activation" },
      { title: "Data 360 Canvas — section CoWorker", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F04MGLBV9SB", category: "Sales Playbook & Activation" },
      { title: "Pricing Calculator (GSheets)", url: "https://docs.google.com/spreadsheets/d/1jxNh5z2h510ZmyusJDfH5q5pqku3-0el/edit?gid=1100556165#gid=1100556165", category: "Sales Playbook & Activation" },
      { title: "Customer Setup Instructions (Org62)", url: "https://org62.my.salesforce.com/sfc/p/#000000000062/a/ed000001TnSz/IpPKSYEMrkxZqiHROUprdnNxLGyKYBR.JLVbPracSfw", category: "Sales Playbook & Activation" },
      { title: "Demo Video 2 min (Vidyard)", url: "https://salesforce.vidyard.com/watch/zWp6pXw6kW2eVhHfeUmANC", category: "Démonstrations & Vidéos" },
      { title: "Demo Video — one Coworker, every surface (Vidyard)", url: "https://salesforce.vidyard.com/watch/nu8jov7JxqrYsjKfBJDShu", category: "Démonstrations & Vidéos" },
      { title: "Setup Video (YouTube)", url: "https://www.youtube.com/watch?v=SWnTa8w0La4", category: "Démonstrations & Vidéos" },
      { title: "Website", url: "https://www.salesforce.com/agentforce/coworker/", category: "Ressources Externes" },
      { title: "Blog — What is Coworker?", url: "https://salesforce.com/blog/agentforce-coworker-salesforce-ai-teammate", category: "Ressources Externes" },
      { title: "#help-sell-agentforce-coworker", category: "Canal Slack" }
    ]
  },
  {
    id: "momentum",
    name: "Momentum",
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
    convictionsFranceText: "Momentum c'est le TikTok du CRM — on capture les moments importants pour les partager en interne et mettre à jour le CRM en temps réel. Inclus dans A4S et A1E, pas de budget additionnel. Play de consolidation vs. Gong/Clari — le budget existe déjà. Top features : Autopilot (écriture CRM automatique), Smart Clips (extraits vidéo dans Slack), Agentforce-ready. Preuves : Zscaler 3-10h économisées/rep/semaine, Ramp ~30K champs CRM mis à jour/semaine. SPIFF jusqu'à 15K$ sur les deals qualifiants.",
    ressources: [
      { title: "Momentum Sales Play Deck (GSlides)", url: "https://docs.google.com/presentation/d/1xPoQWWdMNMtndvFi_IiKnlzcsUX76GR76CI8Z8KmZ7M/edit", category: "First Call Deck" },
      { title: "A4S + Momentum First Call Deck (GSlides)", url: "https://docs.google.com/presentation/d/1autdhwtvN-9PellsatIOFE6CuDFk8dLETOI75dEI5OE/edit", category: "First Call Deck" },
      { title: "Momentum Platform Overview Deck", url: "https://salesforce.enterprise.slack.com/files/U0208CRV160/F0B7NE5PJ3E/momentum_platform_overview_", category: "First Call Deck" },
      { title: "Momentum Knowledge Hub — SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B3XLV7TMF", category: "FAQ & Knowledge" },
      { title: "Internal Seller FAQ (Google Doc)", url: "https://docs.google.com/document/d/1mt8nhQVeIW7bN2dHJWleOSFYCXGjM2-h03zyqmwZPp4/edit", category: "FAQ & Knowledge" },
      { title: "Promo Deck — A4S + Momentum (GSlides)", url: "https://docs.google.com/presentation/d/1TyOSKrStY4KzDpRqUwYYx4ZIx02hREviZhr-DmShl9I/edit", category: "Promo & Pricing" },
      { title: "Momentum + A1E Upgrade Sales Play (GSlides)", url: "https://docs.google.com/presentation/d/1Fzw_zec0RQSdb7SgH3-7TH7Fhc1BsaihtRt36T1UwdI/edit", category: "Promo & Pricing" },
      { title: "Slackbot Prompt — A4S now with Momentum (Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AUFJBHBFW", category: "Promo & Pricing" },
      { title: "Slackbot Prompt — A1E Upgrade + Momentum (Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B7F3D7N22", category: "Promo & Pricing" },
      { title: "Momentum Demo (Vidyard)", url: "https://salesforce.vidyard.com/watch/WkSogdAvH27mJUkhYyC8tr", category: "Démonstrations & Vidéos" },
      { title: "Momentum Demo (Loom)", url: "https://www.loom.com/share/162fd3f28cb7483586ba2aff48c43ef2", category: "Démonstrations & Vidéos" },
      { title: "Customer-Facing Demo (Consensus)", category: "Démonstrations & Vidéos" },
      { title: "Shared Demo Orgs Guide (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B9PRGJGVC", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded Momentum — Replay (IBM Video)", url: "https://video.ibm.com/recorded/134893094", category: "Product Decoded" },
      { title: "Product Decoded Momentum — Episode Deck (GSlides)", url: "https://docs.google.com/presentation/d/1580UmL_CoSd0It7RRQt0gOO6xkklEdbuRM36qqUeIpE/edit", category: "Product Decoded" },
      { title: "Customer Stories — Contentful, Demandbase, Owner (GSlides)", url: "https://docs.google.com/presentation/d/1xPoQWWdMNMtndvFi_IiKnlzcsUX76GR76CI8Z8KmZ7M/edit", category: "Customer Stories" },
      { title: "Customer Stories — 1Password (GSlides)", url: "https://docs.google.com/presentation/d/1Z6xBAhMQXsEBhmXjfaDM1cU-6-eJzYssRxf5Au3a6iw/edit", category: "Customer Stories" },
      { title: "#momentum-gtm-faq", category: "Canal Slack" },
      { title: "Channel support Momentum SE", category: "Canal Slack" }
    ]
  },
  {
    id: "help-agent",
    name: "Help Agent",
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
        "Capacités construites et lancées en seulement 30 jours",
        "Gère des scénarios de support réels à grande échelle",
        "Démonstrable en live aux clients via le numéro +1 855-302-7007"
      ],
      citation: "Nos nouvelles capacités Help Agent, propulsées par Agentforce Voice, sont live sur notre ligne de support."
    },
    pricing: [
      "Inclus dans la plateforme Agentforce — fait partie des capacités Agentforce Voice",
      "Modèle de consommation Agentforce standard (conversations)",
      "Disponible pour les clients Service Cloud avec Agentforce"
    ],
    faq: [
      { question: "Help Agent est-il utilisable par nos clients ?", reponse: "Oui — la technologie sous-jacente (Agentforce Voice) est disponible pour tous les clients. L'implémentation sur la ligne Salesforce sert de référence Customer Zero." },
      { question: "Peut-on faire une démo live ?", reponse: "Oui ! Numéro dédié : +1 855-302-7007." },
      { question: "En combien de temps peut-on déployer un agent similaire ?", reponse: "L'équipe Salesforce l'a construit en 30 jours." },
      { question: "Quelles langues sont supportées ?", reponse: "Actuellement disponible en anglais. Support multilingue sur la roadmap." }
    ],
    convictionsFranceText: "Help Agent est notre Customer Zero story la plus puissante. Déployé en 30 jours sur la ligne 1-800-NO-SOFTWARE. Démonstrable en live (+1 855-302-7007). Preuve irréfutable qu'Agentforce Voice fonctionne en production à grande échelle.",
    ressources: [
      { title: "Help Agent First Call Deck (GSlides)", category: "First Call Deck" },
      { title: "Help Agent Sales Play (GSlides)", category: "First Call Deck" },
      { title: "FY27 Community Call Deck (GSlides)", category: "First Call Deck" },
      { title: "Help Agent Sales FAQ / Sales Guide SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B9D5KJPGR", category: "FAQ & Knowledge" },
      { title: "Help Agent Pricing & Packaging Deck (GSlides)", category: "Pricing & Packaging" },
      { title: "Slides Pricing & Nouveaux Portails (GSlides)", category: "Pricing & Packaging" },
      { title: "Web Demo — Self-Service (Salesforce.com)", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded Help Agent — Replay (IBM Video)", category: "Product Decoded" },
      { title: "Product Decoded Help Agent — Episode Deck (GSlides)", category: "Product Decoded" },
      { title: "4-min Highlights Video", category: "Product Decoded" },
      { title: "Newsroom Announcement", category: "Ressources Externes" },
      { title: "#help-sell-ai", category: "Canal Slack" }
    ]
  },
  {
    id: "afo",
    name: "Agentforce Operations",
    elevatorPitch: "Agentforce Operations (anciennement Regrello) digitalise les processus back-office en tâches exécutables par des agents IA. En 3 piliers — Digitaliser en minutes, Orchestrer humains + agents, Améliorer sans code — il transforme des processus qui prenaient 8-18 mois à automatiser en workflows opérationnels en 1 heure, avec 50-70% de réduction des temps de cycle.",
    differenciation: [
      "1 heure pour construire vs 8-18 mois avec les solutions traditionnelles (ERP, BPM)",
      "Minutes pour modifier vs mois — amélioration continue sans code ni IT",
      "80% de réduction du travail manuel vs 15% avec les outils classiques",
      "Orchestration hybride humains + agents IA",
      "Conçu pour le back-office complexe (supply chain, finance, assurance)",
      "Pas besoin de rip-and-replace : se superpose aux systèmes existants"
    ],
    casUsages: [
      { title: "Audit de factures", description: "Vérification automatique des factures fournisseurs contre les bons de commande et contrats" },
      { title: "Onboarding fournisseurs", description: "Digitalisation du processus complet : collecte de documents, vérifications de conformité, validations multi-parties — 85% automatisé" },
      { title: "Qualification fournisseurs", description: "Évaluation automatique selon critères qualité, conformité et risque avec scoring" },
      { title: "Gestion des réclamations & dommages", description: "Traitement automatisé des claims depuis la déclaration jusqu'à la résolution" },
      { title: "Souscription assurance (FINS)", description: "Automatisation du processus de policy application et underwriting" },
      { title: "Onboarding compte (FINS)", description: "Processus KYC/AML automatisé avec collecte de documents et vérifications réglementaires" }
    ],
    storyClient: {
      client: "Grands comptes industriels et financiers",
      resultats: [
        "77% de réduction des temps de cycle (constructeur de camions)",
        "$40M économisés en automatisation des factures (entreprise énergétique)",
        "$20M+/an économisés (entreprise informatique)",
        "62% de réduction des temps de cycle (fabricant alimentaire)",
        "85% des processus d'onboarding fournisseurs automatisés"
      ],
      citation: "Ce qui prenait des mois à construire et modifier se fait maintenant en heures."
    },
    pricing: [
      "Modèle packagé par taille : Small (10 blueprints), Medium (50 blueprints), Large (50+ personnalisés)",
      "Doit être vendu sur un OrgID force.com nouveau (brand new)",
      "Actuellement disponible pour les clients PACE et FINS"
    ],
    faq: [
      { question: "Qu'est-ce qu'un 'blueprint' ?", reponse: "Un modèle de processus digitalisé instanciable des milliers de fois." },
      { question: "Faut-il un nouvel OrgID ?", reponse: "Oui — contrainte technique actuelle liée à l'architecture Regrello." },
      { question: "Quels secteurs sont ciblés ?", reponse: "PACE (manufacturing, supply chain, énergie) et FINS (assurance, banque, services financiers)." },
      { question: "Comment ça se compare à un BPM classique ?", reponse: "1h pour construire vs 8-18 mois. Les BPM traditionnels nécessitent des équipes de développeurs." }
    ],
    convictionsFranceText: "AFO est parfait pour les grands comptes industriels et financiers avec des processus back-office lourds. Time-to-value en heures vs mois. Play vertical : supply chain (PACE) et finance (FINS). Attention : nécessite un OrgID dédié.",
    ressources: [
      { title: "FCD Supply Chain (GSlides)", url: "https://docs.google.com/presentation/d/1UXYCvYZYsiCjodY97fSodlJMKhM57Z7hYXE-dwbyrO4/edit", category: "First Call Deck" },
      { title: "FCD Financial Services / FINS (GSlides)", url: "https://docs.google.com/presentation/d/1BjubIJkIHLZb2btLdEhGrZErXXqkOgfw14oHJ0-fazg/edit", category: "First Call Deck" },
      { title: "Internal FAQ (Google Doc)", url: "https://docs.google.com/document/d/13m9A6y-cUqsbk4SnXPanXI71J5KHxWUOM5DgBkUW5nU/edit", category: "FAQ & Knowledge" },
      { title: "EMEA FAQ (Agentforce Pulse Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B1UDAJFNV", category: "FAQ & Knowledge" },
      { title: "Pricing & Packaging (GSlides)", url: "https://docs.google.com/presentation/d/1NFIxGq3YzFBElUXfLxyDV0NJyvP9fijayjl3pLgIrFY/edit", category: "Pricing & Packaging" },
      { title: "SKU Quoting Guide (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AARDWPXEH", category: "Pricing & Packaging" },
      { title: "Demo Video (Vidyard)", url: "https://salesforce.vidyard.com/watch/TAHyStu6wePV2ZZ98WQCoz", category: "Démonstrations & Vidéos" },
      { title: "Main Keynote — Agentforce World Tour NY (YouTube)", url: "https://www.youtube.com/live/tB53TdyLqQk", category: "Démonstrations & Vidéos" },
      { title: "Page produit officielle", url: "https://www.salesforce.com/agentforce/operations/", category: "Ressources Externes" },
      { title: "Announcement newsroom", url: "https://www.salesforce.com/news/stories/agentforce-operations-announcement/", category: "Ressources Externes" },
      { title: "#help-sell-agentforce-operations", category: "Canal Slack" }
    ]
  },
  {
    id: "voice",
    name: "Agentforce Voice",
    elevatorPitch: "Remplacez les IVR rigides et les bots scriptés par des agents IA vocaux qui parlent naturellement, agissent sur vos données Salesforce et transfèrent aux humains avec le contexte complet. Nativement construit sur la Salesforce Platform. Déployez sur téléphone, web, mobile et WhatsApp depuis un seul agent, construit une seule fois.",
    differenciation: [
      "CRM-Native Reasoning : chaque appelant est reconnu avant le premier mot grâce au Customer 360",
      "Build Once, Deploy Everywhere : un seul agent sur téléphone (PSTN/SIP), web (WebRTC), mobile et WhatsApp",
      "Handoff humain fluide : transcript complet, résumé et actions recommandées transmis à l'agent humain",
      "vs IVR traditionnel : conversations naturelles vs menus à touches",
      "vs Bots vocaux concurrents (Google CCAI, Amazon Connect) : nativement intégré au CRM, pas de connecteurs tiers",
      "Disponibilité : PSTN GA (Amérique du Nord), SIP GA (International), Digital Channels GA (web, WhatsApp, mobile)"
    ],
    casUsages: [
      { title: "Support client téléphonique 24/7", description: "L'agent vocal répond aux appels, comprend le problème en langage naturel, accède aux données CRM et résout sans intervention humaine" },
      { title: "Self-service vocal web et mobile", description: "Boutons Click-to-Talk intégrés aux portails et apps" },
      { title: "Escalade intelligente vers agent humain", description: "Transfert fluide avec transcript complet et next actions recommandées" },
      { title: "Support multicanal WhatsApp", description: "Le même agent déployé sur WhatsApp avec capacités vocales" },
      { title: "Monitoring et amélioration continue", description: "Chaque conversation loguée avec résumés automatiques et métriques" }
    ],
    storyClient: {
      client: "Florida Prepaid & Adecco",
      resultats: [
        "Florida Prepaid : centre d'appels 24/7 sans effectifs supplémentaires",
        "Adecco : 100K+ candidats interviewés par Agentforce, déploiement voix pour les entretiens",
        "Sammons Financial : déploiement Voice pour le service client assurance",
        "Démo live : +1 (213) 275-0143 (EN) / +1 617 313-7968 (FR)"
      ],
      citation: "Notre centre d'appels ne ferme plus jamais grâce à Agentforce Voice."
    },
    pricing: [
      "SKU : AgentforceVoiceAddOn — provisionné avec Service Cloud Voice et Enhanced Omni-Channel",
      "Tarification Agentforce standard à la conversation",
      "Pour test PSTN live : 3 SKUs additionnels à $0",
      "Rate cards : salesforce.com/agentforce/rates/"
    ],
    faq: [
      { question: "Différence Voice for Phone vs Digital Channels ?", reponse: "Phone connecte via téléphonie (PSTN/SIP). Digital Channels utilise Click-to-Talk sur web, portails, WhatsApp et apps mobiles — GA mai 2026." },
      { question: "Quelles langues ?", reponse: "Anglais GA, Hindi récent. Démo française disponible au +1 617 313-7968." },
      { question: "Faut-il un partenaire téléphonie ?", reponse: "PSTN : oui (Genesys, Amazon Connect). SIP : connexion directe. Digital Channels : non." },
      { question: "Monitoring qualité ?", reponse: "Voice Call Object avec transcript, résumé automatique et métriques." },
      { question: "Personnalisation voix/personnalité ?", reponse: "Oui — configuration persona dans Agent Builder et Voice Settings." }
    ],
    convictionsFranceText: "Agentforce Voice remplace les IVR et bots scriptés. CRM-native, build once deploy everywhere. Clients clés : Florida Prepaid (24/7), Adecco (100K+ interviews), Sammons Financial. Démo live en français disponible. SKU: AgentforceVoiceAddOn + Service Cloud Voice.",
    ressources: [
      { title: "NEW FCD FY27 — Agentforce Voice (GSlides)", url: "https://docs.google.com/presentation/d/15IKl4Hz8vHg_y1V6o3fH2a4TP7A4C22H3JU1aYXrsKc/edit", category: "First Call Deck" },
      { title: "Sales Play Deck — Dynamic Voice Routing (GSlides)", url: "https://docs.google.com/presentation/d/1bEQa1BK1u0A1Ip8ToCz7-puelpcZiWyMxAXVaqrUmwc/edit", category: "First Call Deck" },
      { title: "Agentforce Voice Seller Guide — SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0A2TCEME11", category: "FAQ & Knowledge" },
      { title: "FAQ Voice for Digital Channels / Web+Mobile (Google Doc)", url: "https://docs.google.com/document/d/1HUvk5SQ7CV6qFGRgluQsjvv8nNDA2HGqgVY9L2j8thQ/edit", category: "FAQ & Knowledge" },
      { title: "FAQ Dynamic Voice Routing — EMEA (Google Doc)", url: "https://docs.google.com/document/d/1AnLi85JQcxE2nFf52-_m2p8pySB_Ci9FG4UF7OQwh_c/edit", category: "FAQ & Knowledge" },
      { title: "FAQ Language Support (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AP0RVKTHR", category: "FAQ & Knowledge" },
      { title: "Canvas FR — Agentforce Voice/ContactCenter TeamFR", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0A2FUATB4N", category: "FAQ & Knowledge" },
      { title: "CCaaS Partners supportés (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T01G0063H29/F0AP2GM1R8W", category: "Pricing" },
      { title: "CCaaS providers list — Dynamic Routing (GSheets)", url: "https://docs.google.com/spreadsheets/d/1ywGE4_64NIMtUxFckmOMqHufeK3EOX4Fv6dUrGOH8Vs/edit", category: "Pricing" },
      { title: "Demo GA Web/Mobile (Vidyard)", url: "https://salesforce.vidyard.com/watch/bT64KgHd6ngmKr6A8V2Bwn", category: "Démonstrations & Vidéos" },
      { title: "Pitch Audio — Josh Rosenstrauch walkthrough", url: "https://drive.google.com/file/d/1n6sUGiZTeCO9hO4dueznlmoJFlaWatiB/view", category: "Démonstrations & Vidéos" },
      { title: "Demo Guide — Web/Mobile NTO scenario (Google Doc)", url: "https://docs.google.com/document/d/1rh2r8bg8nuZ9scTCQdfvPTbj0G2i8s_Kv4u9h72ZZlQ/edit", category: "Démonstrations & Vidéos" },
      { title: "Live Demo Number — +1 855-302-7007", url: "tel:+18553027007", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded AF Voice — Replay (IBM Video)", url: "https://secure.video.ibm.com/channel/24382606/video/134855292", category: "Product Decoded" },
      { title: "Product Decoded AF Voice — Episode Deck (GSlides)", url: "https://docs.google.com/presentation/d/1yKaLogg4u4o-x6xuusNm9BKlg2k-OPc7MZ218gEpIM4/edit", category: "Product Decoded" },
      { title: "Road to TDX — AF Voice Deck + Recording (GSlides)", url: "https://docs.google.com/presentation/d/1fk-yaMIhb-4Wzg6Tk5dkJ72EeqbOL1Of4-3N9zF8Tww/edit", category: "Product Decoded" },
      { title: "#help-sell-ai", category: "Canal Slack" }
    ]
  }
]

export function buildSystemPrompt(): string {
  const productsText = productsContext.map(p => {
    const ressourcesText = p.ressources.map(r => `  - ${r.title}${r.url ? ` → ${r.url}` : ''} [${r.category}]`).join('\n')
    return `
## ${p.name} (${p.id})

**Description:** ${p.elevatorPitch}

**Différenciation:**
${p.differenciation.map(d => `- ${d}`).join('\n')}

**Cas d'usage:**
${p.casUsages.map(c => `- ${c.title}: ${c.description}`).join('\n')}

**Client référence:** ${p.storyClient.client}
${p.storyClient.resultats.map(r => `- ${r}`).join('\n')}
${p.storyClient.citation ? `Citation: "${p.storyClient.citation}"` : ''}

**Pricing:**
${p.pricing.map(pr => `- ${pr}`).join('\n')}

**FAQ:**
${p.faq.map(f => `Q: ${f.question}\nR: ${f.reponse}`).join('\n\n')}

${p.convictionsFranceText ? `**Convictions France:** ${p.convictionsFranceText}` : ''}

**Ressources:**
${ressourcesText}
`
  }).join('\n---\n')

  return `Tu es un assistant expert du portfolio Agentforce de Salesforce France.
Tu aides les managers commerciaux à comprendre les produits, leur pertinence client, le pricing, les cas d'usage, la différenciation et les ressources disponibles.

REGLES :
- Réponds toujours en français
- Base-toi UNIQUEMENT sur les données produit ci-dessous — n'invente rien
- Quand tu cites une ressource, inclus le lien URL si disponible
- Si tu ne sais pas ou si l'information n'est pas dans les données, dis-le clairement
- Sois concis mais complet — utilise des bullet points et du markdown
- Pour les questions de pertinence client (ex: "est-ce pertinent chez Adecco ?"), raisonne à partir des cas d'usage et de la verticale du client

PRODUITS DISPONIBLES :
${productsText}`
}
