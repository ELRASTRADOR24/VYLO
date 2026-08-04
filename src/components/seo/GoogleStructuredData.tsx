import React from "react";

export function GoogleStructuredData() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VYLO — Application de Jeux de Soirée & Société",
    "operatingSystem": "All (Web, Android, iOS, Windows, macOS)",
    "applicationCategory": "GameApplication",
    "genre": "Party Game, Board Game, Multiplayer",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "24800",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "VYLO est la plateforme n°1 de jeux de soirée, de société et de famille. Jouez à Undercover, Loup-Garou, Blind Test, Action ou Vérité, Tu Préfères et Le Saboteur en ligne et en local."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quelle est la meilleure application de jeux de soirée gratuite ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VYLO est l'application ultime et 100% gratuite de jeux de soirée entre amis et en famille. Elle réunit des jeux cultes comme Undercover, Loup-Garou, Blind Test, Action ou Vérité et Tu Préfères sans aucun téléchargement."
        }
      },
      {
        "@type": "Question",
        "name": "Comment jouer à Undercover en ligne avec ses amis ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sur VYLO, créez un salon de jeu gratuit en 1 clic, partagez le code à 6 chiffres ou le QR Code avec vos amis. Chacun joue depuis son propre smartphone !"
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on jouer au Loup-Garou et au Blind Test sur téléphone ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! VYLO propose des versions multijoueurs de Loup-Garou, Blind Test musical, Devine le Drapeau et Action ou Vérité adaptées pour smartphone et ordinateur."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
