'use client';

import { useState } from 'react';

interface QuestionOption {
  id: string;
  label: string;
  price: number;
  description?: string;
}

interface Question {
  id: number;
  text: string;
  tip?: string;
  type: 'single' | 'multiple' | 'range';
  options: QuestionOption[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Quel type de site web le client souhaite-t-il ?",
    type: 'single',
    required: true,
    options: [
      { id: "vitrine", label: "Site vitrine simple", price: 800, description: "Présentation de l'entreprise, services, contact" },
      { id: "ecommerce", label: "Site e-commerce", price: 3500, description: "Catalogue produits, panier, paiement" },
      { id: "application", label: "Application web complexe", price: 8000, description: "Fonctionnalités avancées, gestion utilisateurs" },
      { id: "blog", label: "Blog/Portfolio", price: 1200, description: "Articles, galerie, présentation" },
      { id: "corporate", label: "Site corporate", price: 2500, description: "Site institutionnel avec plusieurs sections" }
    ]
  },
  {
    id: 2,
    text: "Combien de pages environ ?",
    tip: "Demander si il a des demandes de pages spécifiques",
    type: 'single',
    required: true,
    options: [
      { id: "1-5", label: "1-5 pages", price: 0, description: "Pages de base incluses" },
      { id: "6-15", label: "6-15 pages", price: 800, description: "Pages supplémentaires facturées" },
      { id: "16-30", label: "16-30 pages", price: 1500, description: "Pack de pages étendu" },
      { id: "30+", label: "Plus de 30 pages", price: 2500, description: "Site volumineux avec gestion de contenu" }
    ]
  },
  {
    id: 3,
    text: "Fonctionnalités de base nécessaires ?",
    type: 'multiple',
    required: true,
    options: [
      { id: "responsive", label: "Design responsive", price: 0, description: "Adaptation mobile/tablette" },
      { id: "seo", label: "Optimisation SEO", price: 0, description: "Méta-tags, sitemap, optimisation" },
      { id: "analytics", label: "Google Analytics", price: 150, description: "Suivi des visiteurs" },
      { id: "contact", label: "Formulaire de contact", price: 0, description: "Formulaire avec validation" },
      { id: "newsletter", label: "Newsletter", price: 100, description: "Inscription et gestion des abonnés" }
    ]
  },
  {
    id: 4,
    text: "Base de données et gestion de contenu ?",
    type: 'multiple',
    required: false,
    options: [
      { id: "cms", label: "CMS (WordPress, etc.)", price: 600, description: "Gestion facile du contenu" },
      { id: "custom-cms", label: "CMS personnalisé", price: 0, description: "Interface sur-mesure" },
      { id: "database", label: "Base de données", price: 0, description: "Stockage des données" },
      { id: "user-management", label: "Gestion des utilisateurs", price: 300, description: "Inscription, connexion, profils" }
    ]
  },
  {
    id: 5,
    text: "Fonctionnalités e-commerce (si applicable) ?",
    type: 'multiple',
    required: false,
    options: [
      { id: "catalog", label: "Catalogue produits", price: 500, description: "Gestion des produits" },
      { id: "cart", label: "Panier d'achat", price: 400, description: "Ajout/suppression produits" },
      { id: "payment", label: "Paiement en ligne", price: 100, description: "Stripe, PayPal, etc." },
      { id: "inventory", label: "Gestion des stocks", price: 600, description: "Suivi des quantités" },
      { id: "shipping", label: "Calcul des frais de port", price: 300, description: "Tarification automatique" }
    ]
  },
  {
    id: 6,
    text: "Intégrations externes ?",
    type: 'multiple',
    required: false,
    options: [
      { id: "social-media", label: "Réseaux sociaux", price: 50, description: "Partage, flux, connexion" },
      { id: "maps", label: "Google Maps", price: 0, description: "Localisation, itinéraires" },
      { id: "calendar", label: "Calendrier/Agenda", price: 400, description: "Réservations, événements" },
      { id: "chat", label: "Chat en ligne", price: 300, description: "Support client en temps réel" },
      { id: "api", label: "API externe", price: 200, description: "Connexion à des services tiers" }
    ]
  },
  {
    id: 7,
    text: "Design et personnalisation ?",
    type: 'single',
    required: true,
    options: [
      { id: "template", label: "Template existant adapté", price: 0, description: "Design standard personnalisé" },
      { id: "custom-design", label: "Design personnalisé", price: 1200, description: "Création graphique sur-mesure" },
      { id: "branding", label: "Identité visuelle complète", price: 1000, description: "Logo, couleurs, typographie" },
      { id: "animations", label: "Animations et interactions", price: 800, description: "Effets visuels avancés" }
    ]
  },
  {
    id: 8,
    text: "Délai de livraison souhaité ?",
    type: 'single',
    required: true,
    options: [
      { id: "normal", label: "Délai normal (4-8 semaines)", price: 0, description: "Développement standard (peut varier en fonction de la complexité du site)" },
      { id: "urgent", label: "Urgent (2-4 semaines)", price: 500, description: "Priorité haute" },
      { id: "tres-urgent", label: "Très urgent (1-2 semaines)", price: 1000, description: "Développement prioritaire" }
    ]
  },
  {
    id: 9,
    text: "Maintenance et support ?",
    type: 'multiple',
    required: false,
    options: [
      { id: "maintenance", label: "Maintenance mensuelle", price: 50, description: "Mises à jour, sécurité" },
      { id: "support", label: "Maintenance + Support", price: 100, description: "Inclus maintenance plus Assistance par email/téléphone" },
      
    ]
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: number, optionId: string, isMultiple: boolean) => {
    if (isMultiple) {
      setAnswers(prev => {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
        return { ...prev, [questionId]: newAnswers };
      });
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: [optionId] }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculatePrice = () => {
    let totalPrice = 0;
    let details: Array<{question: string, options: string[], price: number}> = [];

    questions.forEach(question => {
      const questionAnswers = answers[question.id] || [];
      if (questionAnswers.length > 0) {
        let questionPrice = 0;
        const selectedOptions = question.options.filter(opt => questionAnswers.includes(opt.id));
        
        selectedOptions.forEach(option => {
          questionPrice += option.price;
        });

        totalPrice += questionPrice;
        details.push({
          question: question.text,
          options: selectedOptions.map(opt => opt.label),
          price: questionPrice
        });
      }
    });

    return { totalPrice, details };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const { totalPrice, details } = calculatePrice();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devis estimé terminé !</h1>
              <p className="text-gray-600">Voici l'estimation détaillée pour votre client</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
              <div className="text-4xl font-bold mb-2">{totalPrice.toLocaleString('fr-FR')} €</div>
              <p className="text-blue-100">Prix total estimé</p>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Détail du devis :</h3>
              {details.map((detail, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <p className="text-sm text-gray-600 mb-2 font-medium">{detail.question}</p>
                  <div className="ml-4">
                    {detail.options.map((option, optIndex) => (
                      <p key={optIndex} className="text-sm text-gray-700 mb-1">• {option}</p>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    Prix : {detail.price} €
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Nouveau devis
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Imprimer le devis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswers = answers[currentQ.id] || [];
  const hasAnswer = currentQ.required ? currentAnswers.length > 0 : true;
  const canGoNext = hasAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Estimateur de Prix - Vendeurs</h1>
            <p className="text-gray-600">Questionnaire pour estimer le prix de vente des sites web</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {currentQ.text}
            </h2>
            {currentQ.tip && (
              <p className="text-md text-red-500 mb-6 text-center font-bold">
                {currentQ.tip}
              </p>
            )}
            
            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = currentAnswers.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQ.id, option.id, currentQ.type === 'multiple')}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {currentQ.type === 'multiple' ? (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          ) : (
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          )}
                          <span className="font-medium">{option.label}</span>
                        </div>
                        {option.description && (
                          <p className="text-sm text-gray-500 mt-1 ml-8">{option.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {option.price > 0 ? `+${option.price} €` : 'Inclus'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Précédent
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!canGoNext}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canGoNext
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Voir le devis' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

