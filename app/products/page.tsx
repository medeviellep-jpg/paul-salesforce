'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronRight, ChevronDown, Sparkles, Target, Users, DollarSign, HelpCircle, Megaphone, Zap, Building2, Phone, Globe, BarChart3, ExternalLink, LayoutDashboard, ArrowRight, AudioLines, Presentation, Play, Link2, FileText, MessageSquare, Video } from 'lucide-react'

type Resource = {
  title: string
  url?: string
  category: string
}

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
  convictionsFrance?: React.ReactNode
  ressources?: Resource[]
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
    convictionsFrance: (<>CoWorker c'est un &ldquo;Play tactique&rdquo; si on se cantonne de penser au play &ldquo;CRM conversationnel&rdquo; mais le vrai impact est ailleurs :<br/><br/>1️⃣ <strong>Accélérateur de cycle de vente</strong> — Activer CoWorker pour rassurer sur notre techno et éviter un pilote/POC à rallonge avant de signer un AELA. Exemple : T&S (CMRCL), on réduit le cycle de vente en activant CoWorker une semaine plutôt que x mois de pilote at risk.<br/><br/>2️⃣ <strong>Accélérateur d'Adoption et de Change</strong> — Positionner CoWorker en Super Agent Orchestrateur de sous-agents spécialisés. On commence rapidement, super simple à utiliser, chaque nouveau use case enrichit CoWorker sans complexifier l'usage. Exemple : Atos / Bureau Veritas → "pas besoin de training, activons-le de suite."<br/><br/>3️⃣ <strong>Accélérateur de Consommation (Flex) et de valeur (A4X)</strong> — Tous les clients avec des grosses allocations doivent montrer qu'ils n'ont pas acheté pour rien. Exemple : Atos, CIO → "activons-le de suite pour mes sellers, on va enfin montrer qu'on avance sans attendre la fin du projet sur les 5 agents spés."</>),
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
    convictionsFrance: (<>Momentum c'est un peu le 🎵 TikTok du CRM — on capture les moments importants pour les partager en interne et mettre à jour le CRM en temps réel.<br/><br/>C'est notre nouvel outil de <strong>Conversation Intelligence</strong> qui capture automatiquement les calls, emails et SMS, structure la donnée et la réinjecte dans Salesforce, sans aucune action manuelle du rep. C'est la fondation data qui rend tous les types de Sales Agents vraiment efficaces.<br/><br/><strong>Pourquoi le mettre en avant ?</strong><br/>• Inclus dans Agentforce for Sales et Agentforce One Sales Edition — pas de conversation budget supplémentaire<br/>• Répond directement au blocage #1 : "notre data n'est pas prête pour l'IA" → Momentum règle ça out of the box<br/>• Play de consolidation vs. Gong / Clari / Salesloft — le budget existe déjà, on aide nos clients à mieux l'investir<br/><br/>✅ <strong>Comment le vendre — c'est simple</strong><br/>Quoter Agentforce for Sales et ajouter le QST Momentum → Momentum est inclus gratuitement. C'est tout.<br/><br/>🎤 <strong>Top features à démontrer</strong><br/>• <strong>Autopilot</strong> : écriture automatique des données structurées dans le CRM en temps réel<br/>• <strong>Smart Clips</strong> : extraits vidéo de 20 secondes postés directement dans Slack (hashtag TikTok)<br/>• <strong>Agentforce-ready</strong> : alimente les agents SDR, préparation de réunion, coaching, pipeline management et forecasting<br/><br/>📊 <strong>Preuves terrain</strong><br/>• Zscaler : 3 à 10h d'admin économisées par rep et par semaine<br/>• Ramp : ~30 000 champs CRM mis à jour automatiquement chaque semaine<br/><br/>🗓️ <strong>Roadmap</strong><br/>GA à Dreamforce — Momentum + A4S deviennent un seul produit intégré (call capture, deal inspection, coaching, forecasting, etc). On vend dès maintenant.<br/><br/>💰 <strong>Incentive seller</strong> : SPIFF jusqu'à 15 000$ sur les deals qualifiants</>),
    ressources: [
      { title: "Momentum Sales Play Deck (GSlides)", url: "https://docs.google.com/presentation/d/1xPoQWWdMNMtndvFi_IiKnlzcsUX76GR76CI8Z8KmZ7M/edit?slide=id.g3cb30e3fe93_0_1266#slide=id.g3cb30e3fe93_0_1266", category: "First Call Deck" },
      { title: "A4S + Momentum First Call Deck (GSlides)", url: "https://docs.google.com/presentation/d/1autdhwtvN-9PellsatIOFE6CuDFk8dLETOI75dEI5OE/edit?slide=id.g389ca30296e_0_1117#slide=id.g389ca30296e_0_1117", category: "First Call Deck" },
      { title: "Momentum Platform Overview Deck", url: "https://salesforce.enterprise.slack.com/files/U0208CRV160/F0B7NE5PJ3E/momentum_platform_overview_", category: "First Call Deck" },
      { title: "Momentum Knowledge Hub — SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B3XLV7TMF", category: "FAQ & Knowledge" },
      { title: "Internal Seller FAQ (Google Doc)", url: "https://docs.google.com/document/d/1mt8nhQVeIW7bN2dHJWleOSFYCXGjM2-h03zyqmwZPp4/edit?tab=t.0#heading=h.kkzaud7xcm9h", category: "FAQ & Knowledge" },
      { title: "Promo Deck — A4S + Momentum (GSlides)", url: "https://docs.google.com/presentation/d/1TyOSKrStY4KzDpRqUwYYx4ZIx02hREviZhr-DmShl9I/edit?slide=id.g3df1ded45f9_56_599#slide=id.g3df1ded45f9_56_599", category: "Promo & Pricing" },
      { title: "Momentum + A1E Upgrade Sales Play (GSlides)", url: "https://docs.google.com/presentation/d/1Fzw_zec0RQSdb7SgH3-7TH7Fhc1BsaihtRt36T1UwdI/edit?slide=id.g3ecad66ddef_151_1588#slide=id.g3ecad66ddef_151_1588", category: "Promo & Pricing" },
      { title: "Slackbot Prompt — A4S now with Momentum (Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AUFJBHBFW", category: "Promo & Pricing" },
      { title: "Slackbot Prompt — A1E Upgrade + Momentum (Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B7F3D7N22", category: "Promo & Pricing" },
      { title: "Momentum Demo (Vidyard)", url: "https://salesforce.vidyard.com/watch/WkSogdAvH27mJUkhYyC8tr", category: "Démonstrations & Vidéos" },
      { title: "Momentum Demo (Loom)", url: "https://www.loom.com/share/162fd3f28cb7483586ba2aff48c43ef2", category: "Démonstrations & Vidéos" },
      { title: "Customer-Facing Demo (Consensus)", category: "Démonstrations & Vidéos" },
      { title: "Shared Demo Orgs Guide (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B9PRGJGVC", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded Momentum — Replay (IBM Video, 2 juillet 2026)", url: "https://video.ibm.com/recorded/134893094", category: "Product Decoded" },
      { title: "Product Decoded Momentum — Episode Deck (GSlides)", url: "https://docs.google.com/presentation/d/1580UmL_CoSd0It7RRQt0gOO6xkklEdbuRM36qqUeIpE/edit", category: "Product Decoded" },
      { title: "Customer Stories — Contentful, Demandbase, Owner (GSlides)", url: "https://docs.google.com/presentation/d/1xPoQWWdMNMtndvFi_IiKnlzcsUX76GR76CI8Z8KmZ7M/edit?slide=id.g3d8d6aa6686_31_375#slide=id.g3d8d6aa6686_31_375", category: "Customer Stories" },
      { title: "Customer Stories — 1Password, détail (GSlides)", url: "https://docs.google.com/presentation/d/1Z6xBAhMQXsEBhmXjfaDM1cU-6-eJzYssRxf5Au3a6iw/edit?slide=id.g3e2aef576cb_1_548#slide=id.g3e2aef576cb_1_548", category: "Customer Stories" },
      { title: "#momentum-gtm-faq", category: "Canal Slack" },
      { title: "Channel support Momentum SE", category: "Canal Slack" }
    ]
  },
  {
    id: 'help-agent',
    name: 'Help Agent',
    icon: <Phone className="w-6 h-6" />,
    color: 'from-teal-600 to-cyan-700',
    elevatorPitch: "Help Agent est l'agent IA de self-service client déployable en moins de 10 minutes. GA juillet 2026. Construit sur la même stack qu'Agentforce Service Agent, mais packagé pour aller vite — sans projet, sans intégrateur. Tarification à la résolution réussie : $2/résolution (= 400 Flex Credits).",
    differenciation: [
      "Déployable en moins de 10 minutes — aucun service pro requis, setup no-code",
      "Pricing à la résolution : $2 par résolution réussie (= 400 Flex Credits) — on ne paie que ce qui fonctionne",
      "Même stack qu'Agentforce Service Agent, mais packagé pour aller vite",
      "Self-service web et chat natif — répond, résout, escalade avec contexte complet",
      "GA juillet 2026 — disponible immédiatement pour tous les clients"
    ],
    casUsages: [
      { title: "Self-service client 24/7", description: "Help Agent répond aux questions clients en langage naturel, résout les problèmes courants et s'appuie sur la base de connaissances existante — sans attente, sans agent humain" },
      { title: "Déflexion de tickets", description: "Résolution automatique des cas simples et répétitifs avant qu'ils atteignent les agents humains — réduction directe du volume de tickets entrants" },
      { title: "Escalade intelligente", description: "Quand l'agent ne peut pas résoudre, il transfère vers un agent humain avec le transcript complet et le contexte du problème — zéro friction pour le client" },
      { title: "Portails clients et communautés", description: "Intégration native dans les portails Experience Cloud existants — enrichit l'expérience self-service sans refonte du portail" }
    ],
    storyClient: {
      client: "Clients Service Cloud — GA juillet 2026",
      resultats: [
        "Déployable en moins de 10 minutes sans services professionnels",
        "Pricing à la résolution : on ne paie que les résolutions réussies",
        "Même technologie qu'Agentforce Service Agent — fiabilité enterprise",
        "Intégration native aux portails Experience Cloud existants"
      ],
      citation: "Avec Help Agent, nos clients peuvent avoir un agent IA de self-service en production en moins de 10 minutes — et ne payer que pour les problèmes réellement résolus."
    },
    pricing: [
      "$2 par résolution réussie = 400 Flex Credits",
      "On ne paie que ce qui fonctionne — pricing à la valeur délivrée",
      "GA juillet 2026 — disponible via les SKUs Agentforce standard"
    ],
    faq: [
      { question: "Quelle différence avec Agentforce Service Agent ?", reponse: "Help Agent est construit sur la même stack qu'Agentforce Service Agent, mais packagé pour aller vite — déployable en moins de 10 minutes sans projet ni intégrateur. Agentforce Service Agent est la version enterprise pour des cas d'usage complexes et des déploiements plus larges." },
      { question: "Comment fonctionne le pricing à la résolution ?", reponse: "$2 par résolution réussie = 400 Flex Credits. Si l'agent ne résout pas le problème et escalade vers un humain, la conversation n'est pas facturée comme résolution. On ne paie que la valeur délivrée." },
      { question: "En combien de temps peut-on déployer Help Agent ?", reponse: "Moins de 10 minutes pour un premier déploiement. Setup no-code, sans services professionnels requis." },
      { question: "Faut-il Experience Cloud pour utiliser Help Agent ?", reponse: "Help Agent s'intègre nativement dans les portails Experience Cloud mais peut aussi être déployé sur d'autres canaux web. Vérifier les prérequis avec l'équipe produit pour les configurations spécifiques." }
    ],
    visuels: [
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-launch-fast-720x720-1.webp?w=1024", alt: "Setup no-code — lancement rapide de Help Agent" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-engage-across-channels-720x720-1.webp?w=1024", alt: "Engagement multicanal — search + chat unifiés" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-af-help-agent-automate-w-actions-720x720-1.webp?w=1024", alt: "Actions automatisées — workflows et escalade" },
      { src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/06/svc-pdp-sp-pf-personalized-proactive-support-conversational-support-720x720-1.webp?w=1024", alt: "Support conversationnel — self-service intelligent" }
    ],
    convictionsFrance: (<>Help Agent c'est le play <strong>Time-to-Value immédiat sur le Service</strong> :<br/><br/>1️⃣ <strong>Moins de 10 minutes pour déployer</strong> — argument massue face aux projets CRM à 18 mois. Idéal pour débloquer un client hésitant sur Agentforce.<br/><br/>2️⃣ <strong>Pricing à la résolution</strong> — $2 par résolution réussie. On ne paie que ce qui fonctionne. Argument ROI immédiat et sans risque pour le client.<br/><br/>3️⃣ <strong>Même stack qu'Agentforce Service Agent</strong> — porte d'entrée vers un déploiement plus large. Help Agent aujourd'hui, Service Agent demain.</>),
    ressources: [
      { title: "First Call Deck (GSlides)", url: "https://docs.google.com/presentation/d/1uaHWWeXoo3j3kTmPBcgbwETTMXmQihHKjEuowHJfO1c/edit", category: "First Call Deck" },
      { title: "Sales Play (GSlides)", url: "https://docs.google.com/presentation/d/1j6CLEBNcOLVrvG8OkXreafElOF9xOm7g3XQhTutIraE/edit?slide=id.g3eefb8c9a16_2_2250#slide=id.g3eefb8c9a16_2_2250", category: "First Call Deck" },
      { title: "Community Call Deck — Help Agent + Resolution Pricing + New Portals (GSlides)", category: "First Call Deck" },
      { title: "Sales FAQ / Guide SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B9D5KJPGR", category: "FAQ & Knowledge" },
      { title: "Pricing & Packaging Deck + Slides Resolution SKUs (GSlides)", category: "Pricing & Packaging" },
      { title: "Web Demo — Self-Service (Salesforce.com)", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded — Replay (17 juin 2026)", category: "Product Decoded" },
      { title: "Product Decoded — Episode Deck (GSlides)", category: "Product Decoded" },
      { title: "Product Decoded — 4-min Highlights Video", category: "Product Decoded" },
      { title: "Newsroom Announcement", category: "Ressources Externes" },
      { title: "#help-sell-ai", url: "https://slack.com/archives/C01PVR4M88G", category: "Canal Slack" }
    ]
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
    ressources: [
      { title: "FCD Supply Chain (GSlides)", url: "https://docs.google.com/presentation/d/1UXYCvYZYsiCjodY97fSodlJMKhM57Z7hYXE-dwbyrO4/edit?usp=sharing", category: "First Call Deck" },
      { title: "FCD Financial Services / FINS (GSlides)", url: "https://docs.google.com/presentation/d/1BjubIJkIHLZb2btLdEhGrZErXXqkOgfw14oHJ0-fazg/edit?usp=sharing", category: "First Call Deck" },
      { title: "Internal FAQ (Google Doc)", url: "https://docs.google.com/document/d/13m9A6y-cUqsbk4SnXPanXI71J5KHxWUOM5DgBkUW5nU/edit?usp=sharing", category: "FAQ & Knowledge" },
      { title: "EMEA FAQ (Agentforce Pulse Canvas)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0B1UDAJFNV", category: "FAQ & Knowledge" },
      { title: "Pricing & Packaging (GSlides)", url: "https://docs.google.com/presentation/d/1NFIxGq3YzFBElUXfLxyDV0NJyvP9fijayjl3pLgIrFY/edit?usp=sharing", category: "Pricing & Packaging" },
      { title: "SKU Quoting Guide (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AARDWPXEH", category: "Pricing & Packaging" },
      { title: "Demo Video (Vidyard)", url: "https://salesforce.vidyard.com/watch/TAHyStu6wePV2ZZ98WQCoz", category: "Démonstrations & Vidéos" },
      { title: "Main Keynote — Agentforce World Tour New York (YouTube)", url: "https://www.youtube.com/live/tB53TdyLqQk?si=YfAXloFUKpnid2CM", category: "Démonstrations & Vidéos" },
      { title: "Page produit officielle", url: "https://www.salesforce.com/agentforce/operations/", category: "Ressources Externes" },
      { title: "Announcement newsroom", url: "https://www.salesforce.com/news/stories/agentforce-operations-announcement/", category: "Ressources Externes" },
      { title: "#help-sell-agentforce-operations", category: "Canal Slack" }
    ]
  },
  {
    id: 'qualified',
    name: 'Qualified',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-600',
    elevatorPitch: "Qualified est la plateforme de pipeline generation IA de Salesforce. Elle identifie les visiteurs à fort potentiel sur votre site web, engage les acheteurs en temps réel via des agents IA conversationnels, et génère des opportunités directement dans votre CRM. GA dans Org62 depuis août 2025, Qualified est nativement intégré à la motion de vente Agentforce.",
    differenciation: [
      "vs Drift / Intercom : Qualified est nativement intégré à Salesforce CRM — les données, le scoring et les alertes s'appuient sur le Customer 360 en temps réel, sans silo",
      "Pipeline generation IA : identification des comptes cibles en temps réel via le scoring ABM et les signaux d'intent",
      "Agent conversationnel autonome : engage les visiteurs 24/7, qualifie et route vers le bon AE sans intervention humaine",
      "GA dans Org62 depuis août 2025 — Customer Zero avec données réelles",
      "Inclus dans la motion de vente Agentforce — synergies naturelles avec CoWorker et Momentum"
    ],
    casUsages: [
      { title: "Identification des visiteurs à fort potentiel", description: "Qualified identifie en temps réel quels comptes cibles visitent votre site et déclenche des alertes proactives aux AEs responsables" },
      { title: "Engagement conversationnel en temps réel", description: "L'agent IA engage les visiteurs qualifiés instantanément — qualification, réponses aux questions produit et routing vers le bon commercial" },
      { title: "Pipeline generation automatisée", description: "Création d'opportunités CRM directement depuis les conversations — les leads chauds ne passent plus entre les mailles du filet" },
      { title: "ABM & Account-Based Marketing", description: "Orchestration des campagnes ABM avec personnalisation du message en fonction du profil du compte visiteur et de son historique CRM" }
    ],
    storyClient: {
      client: "Salesforce (Customer Zero — Org62)",
      resultats: [
        "GA dans Org62 depuis août 2025 — utilisé en production par les équipes Salesforce",
        "Pipeline generation nativement intégré à la motion Agentforce",
        "Qualification automatique des visiteurs salesforce.com",
        "Routing intelligent vers les AEs avec contexte CRM complet"
      ],
      citation: "Qualified transforme notre site en machine à pipeline — chaque visiteur qualifié est identifié, engagé et routé vers le bon AE avec le contexte complet de son compte."
    },
    pricing: [
      "Inclus dans la motion de sell Agentforce",
      "Licensing Qualified standard — se renseigner auprès de l'équipe produit pour les détails",
      "GA dans Org62 depuis août 2025"
    ],
    faq: [
      { question: "Quelle est la différence avec Drift ou Intercom ?", reponse: "Qualified est nativement intégré à Salesforce CRM — les données, le scoring et les alertes s'appuient sur le Customer 360 en temps réel. Pas de silo, pas de sync bidirectionnelle fragile." },
      { question: "Qualified fonctionne-t-il sans Salesforce CRM ?", reponse: "Non — Qualified est conçu pour fonctionner nativement avec Salesforce. C'est précisément sa différenciation vs les solutions point du marché." },
      { question: "Comment Qualified s'intègre-t-il à la motion Agentforce ?", reponse: "Qualified génère le pipeline, CoWorker le prépare et qualifie, Momentum capture les interactions. Ensemble, ils forment la stack complète de productivité commerciale Agentforce." },
      { question: "Où trouver les ressources enablement ?", reponse: "Le canal Slack #qualified-gtm-faq est le point d'entrée principal. Le Qualified Resources Canvas centralise tous les matériaux d'enablement." }
    ],
    visuels: [],
    convictionsFrance: (<>Qualified est notre play pipeline generation natif — particulièrement pertinent pour les clients avec un site web à fort trafic BtoB et une motion ABM.<br/><br/>🎯 <strong>Key play</strong> : Positionner Qualified comme le moteur de pipeline generation qui alimente les agents Agentforce — CoWorker pour la productivité, Momentum pour l'intelligence conversationnelle, Qualified pour le top-of-funnel.<br/><br/>📊 <strong>Customer Zero</strong> : GA dans Org62 depuis août 2025 — démontrable en live sur salesforce.com avec nos propres équipes.</>),
    ressources: [
      { title: "FY27 Corporate Pitch — External (GSlides)", url: "https://docs.google.com/presentation/d/1rQmpC4QK9eZjjBD1qywgPEUSYN1H4Us94OUJF6oodpA/edit?slide=id.p#slide=id.p", category: "First Call Deck" },
      { title: "Channel Agent FAQ (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AQNTURPFW", category: "FAQ & Knowledge" },
      { title: "Qualified Resources Canvas — all enablement materials", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AQNTURPFW", category: "FAQ & Knowledge" },
      { title: "5-Min Overview Video (Vidyard)", url: "https://salesforce.vidyard.com/watch/Shuy2q6pceoTFyjxtc9Xs7", category: "Démonstrations & Vidéos" },
      { title: "#qualified-gtm-faq", category: "Canal Slack" }
    ]
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
    ressources: [
      { title: "NEW FCD FY27 — Agentforce Voice (GSlides)", url: "https://docs.google.com/presentation/d/15IKl4Hz8vHg_y1V6o3fH2a4TP7A4C22H3JU1aYXrsKc/edit?slide=id.g3eaa5629e7a_178_6322#slide=id.g3eaa5629e7a_178_6322", category: "First Call Deck" },
      { title: "Sales Play Deck — Dynamic Voice Routing (GSlides)", url: "https://docs.google.com/presentation/d/1bEQa1BK1u0A1Ip8ToCz7-puelpcZiWyMxAXVaqrUmwc/edit?slide=id.g39bc1274144_3_0#slide=id.g39bc1274144_3_0", category: "First Call Deck" },
      { title: "Agentforce Voice Seller Guide — SSOT (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0A2TCEME11", category: "FAQ & Knowledge" },
      { title: "FAQ Voice for Digital Channels / Web+Mobile (Google Doc)", url: "https://docs.google.com/document/d/1HUvk5SQ7CV6qFGRgluQsjvv8nNDA2HGqgVY9L2j8thQ/edit?tab=t.0", category: "FAQ & Knowledge" },
      { title: "FAQ Dynamic Voice Routing — EMEA (Google Doc)", url: "https://docs.google.com/document/d/1AnLi85JQcxE2nFf52-_m2p8pySB_Ci9FG4UF7OQwh_c/edit?tab=t.0", category: "FAQ & Knowledge" },
      { title: "FAQ Language Support (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0AP0RVKTHR", category: "FAQ & Knowledge" },
      { title: "Canvas FR — Agentforce Voice/ContactCenter TeamFR (Manuel Rouzé)", url: "https://salesforce.enterprise.slack.com/docs/T024BE7LD/F0A2FUATB4N", category: "FAQ & Knowledge" },
      { title: "CCaaS Partners supportés (Canvas Slack)", url: "https://salesforce.enterprise.slack.com/docs/T01G0063H29/F0AP2GM1R8W", category: "Pricing" },
      { title: "CCaaS providers list — Dynamic Routing (GSheets)", url: "https://docs.google.com/spreadsheets/d/1ywGE4_64NIMtUxFckmOMqHufeK3EOX4Fv6dUrGOH8Vs/edit?gid=0#gid=0", category: "Pricing" },
      { title: "Demo GA Web/Mobile (Vidyard)", url: "https://salesforce.vidyard.com/watch/bT64KgHd6ngmKr6A8V2Bwn", category: "Démonstrations & Vidéos" },
      { title: "Pitch Audio — Josh Rosenstrauch walkthrough (Google Drive)", url: "https://drive.google.com/file/d/1n6sUGiZTeCO9hO4dueznlmoJFlaWatiB/view?usp=sharing", category: "Démonstrations & Vidéos" },
      { title: "Demo Guide — Web/Mobile NTO scenario (Google Doc)", url: "https://docs.google.com/document/d/1rh2r8bg8nuZ9scTCQdfvPTbj0G2i8s_Kv4u9h72ZZlQ/edit?tab=t.0#heading=h.61xywn1f1xwt", category: "Démonstrations & Vidéos" },
      { title: "Live Demo Number — +1 855-302-7007", url: "tel:+18553027007", category: "Démonstrations & Vidéos" },
      { title: "Product Decoded AF Voice — Replay (IBM Video, juin 2026)", url: "https://secure.video.ibm.com/channel/24382606/video/134855292", category: "Product Decoded" },
      { title: "Product Decoded AF Voice — Episode Deck (GSlides)", url: "https://docs.google.com/presentation/d/1yKaLogg4u4o-x6xuusNm9BKlg2k-OPc7MZ218gEpIM4/edit?usp=sharing", category: "Product Decoded" },
      { title: "Road to TDX — AF Voice Deck + Recording (GSlides)", url: "https://docs.google.com/presentation/d/1fk-yaMIhb-4Wzg6Tk5dkJ72EeqbOL1Of4-3N9zF8Tww/edit?slide=id.g3d7df79e832_0_1191#slide=id.g3d7df79e832_0_1191", category: "Product Decoded" },
      { title: "#help-sell-ai", category: "Canal Slack" }
    ]
  }
]


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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Gagner ensemble avec Agentforce 🇫🇷</h1>
            <p className="text-white/50 text-sm mt-1">Meeting Managers — Juillet 2026</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Executive Summary</h2>
          <p className="text-white/60 text-lg max-w-3xl">L'ère de l'entreprise agentique est là. Agentforce transforme chaque équipe avec des agents IA autonomes qui travaillent aux côtés de vos collaborateurs — 24/7, à grande échelle.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <p className="text-white/50 text-sm mt-1">CoWorker s&apos;active en 2 clics. Help Agent déployé en 30 jours. AFO opérationnel en heures. Pas de projet à 18 mois.</p>
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
                <p className="text-white/50 text-sm mt-1">Momentum remplace Gong ($100-150/user/mois). Voice remplace les IVR rigides. AFO remplace les BPM à 18 mois de setup.</p>
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

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
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


  if (view === 'summary') {
    return (
      <>
        <ExecutiveSummary onEnter={() => setView('products')} onSelectProduct={(id) => { setActiveProduct(id); setView('products') }} />
      </>
    )
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
              <h1 className="text-3xl font-bold text-white tracking-tight">Gagner ensemble avec Agentforce 🇫🇷</h1>
              <p className="text-white/50 text-sm mt-1">Présentation Interactive Managers</p>
            </div>
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
            <div className="text-white/80 leading-relaxed">{product.convictionsFrance || "Contenu à venir..."}</div>
          </div>
        </div>

        {product.ressources && product.ressources.length > 0 && (
          <Section title="📚 Ressources clés" icon={<Link2 className="w-5 h-5" />} defaultOpen={true}>
            <div className="space-y-5">
              {Object.entries(product.ressources.reduce((acc, r) => {
                if (!acc[r.category]) acc[r.category] = []
                acc[r.category].push(r)
                return acc
              }, {} as Record<string, Resource[]>)).map(([category, items]) => {
                const getCategoryIcon = (cat: string) => {
                  if (cat.includes('First Call') || cat.includes('Pitch')) return <Presentation className="w-4 h-4 text-yellow-400" />
                  if (cat.includes('Démo') || cat.includes('Vidéo')) return <Video className="w-4 h-4 text-red-400" />
                  if (cat.includes('Canal Slack')) return <MessageSquare className="w-4 h-4 text-purple-400" />
                  if (cat.includes('FAQ') || cat.includes('Knowledge')) return <FileText className="w-4 h-4 text-blue-400" />
                  if (cat.includes('Product Decoded')) return <Play className="w-4 h-4 text-orange-400" />
                  if (cat.includes('Pricing') || cat.includes('Promo')) return <DollarSign className="w-4 h-4 text-emerald-400" />
                  if (cat.includes('Playbook') || cat.includes('Activation')) return <Target className="w-4 h-4 text-indigo-400" />
                  if (cat.includes('Customer')) return <Users className="w-4 h-4 text-pink-400" />
                  if (cat.includes('Externe') || cat.includes('Ressource')) return <Globe className="w-4 h-4 text-cyan-400" />
                  return <Link2 className="w-4 h-4 text-white/40" />
                }
                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(category)}
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{category}</span>
                    </div>
                    <div className="space-y-1.5 pl-6">
                      {items.map((r, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                          <div className="flex-1 min-w-0">
                            {r.url ? (
                              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-white font-medium text-sm hover:text-[#1B96FF] transition-colors">
                                {r.title} <ExternalLink className="w-3 h-3 inline ml-1 opacity-50" />
                              </a>
                            ) : (
                              <span className="text-white/70 text-sm">{r.title}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

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
