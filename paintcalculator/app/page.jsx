"use client";

import { useState } from "react";

export default function PaintCalculator() {
  const [formData, setFormData] = useState({
    longueur: "",
    largeur: "",
    hauteur: "",
    ouvertures: "",
    rendement: "9",
    couches: "2",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculer = () => {
    const longueur = parseFloat(formData.longueur);
    const largeur = parseFloat(formData.largeur);
    const hauteur = parseFloat(formData.hauteur);
    const ouvertures = parseFloat(formData.ouvertures);
    const rendement = parseFloat(formData.rendement);
    const couches = parseFloat(formData.couches);

    if (!longueur || !largeur || !hauteur || !rendement) {
      alert("Veuillez remplir tout les champs requis");
      return;
    }

    const surfaceSol = longueur * largeur;
    const perimetre = (longueur + largeur) * 2;
    const surfaceMurs = perimetre * hauteur;
    const surfaceOuvertures = ouvertures * 2;
    const surfaceFinale = surfaceMurs - surfaceOuvertures;
    const quantitePeinture = (surfaceFinale * couches) / rendement;

    setResults({
      surfaceSol,
      perimetre,
      surfaceMurs,
      surfaceOuvertures,
      surfaceFinale,
      quantitePeinture,
      couches,
    });
  };

  const resetForm = () => {
    setFormData({
      longueur: "",
      largeur: "",
      hauteur: "",
      ouvertures: "",
      rendement: "9",
      couches: "2",
    });
    setResults(null);
  };

  const getSuggestionsPots = (quantite) => {
    if (quantite <= 1) return "1 pot de 1 litre";
    if (quantite <= 2) return "1 pot de 2.5 litres";
    if (quantite <= 5) return "1 pot de 5 litres";

    const pots5l = Math.floor(quantite / 5);
    const reste = quantite % 5;

    if (reste > 0) {
      return `${pots5l} pot(s) de 5L + 1 pot de ${reste.toFixed(1)}L`;
    }
    return `${pots5l} pot(s) de 5 litres`;
  };

  return (
    <div className="paint-calculator">
      <div className="paint-calculator__container">
        <div className="paint-calculator__card">
          <header className="paint-calculator__header">
            <h1 className="paint-calculator__title">🎨 Calculateur de Peinture</h1>
            <p className="paint-calculator__subtitle">
              Calculez la quantité de peinture nécessaire pour votre pièce
            </p>
          </header>

          <div className="paint-calculator__form">
            <div className="paint-calculator__grid">
              <div className="paint-calculator__field">
                <label className="paint-calculator__label">Longueur (m) *</label>
                <input
                  type="number"
                  name="longueur"
                  value={formData.longueur}
                  onChange={handleChange}
                  placeholder="Ex: 4"
                  step="0.1"
                  className="paint-calculator__input"
                />
              </div>

              <div className="paint-calculator__field">
                <label className="paint-calculator__label">Largeur (m) *</label>
                <input
                  type="number"
                  name="largeur"
                  value={formData.largeur}
                  onChange={handleChange}
                  placeholder="Ex: 3"
                  step="0.1"
                  className="paint-calculator__input"
                />
              </div>

              <div className="paint-calculator__field">
                <label className="paint-calculator__label">
                  Hauteur sous plafond (m) *
                </label>
                <input
                  type="number"
                  name="hauteur"
                  value={formData.hauteur}
                  onChange={handleChange}
                  placeholder="Ex: 2.5"
                  step="0.1"
                  className="paint-calculator__input"
                />
              </div>

              <div className="paint-calculator__field">
                <label className="paint-calculator__label">Nombre de portes/fenêtres</label>
                <input
                  type="number"
                  name="ouvertures"
                  value={formData.ouvertures}
                  onChange={handleChange}
                  placeholder="Ex: 2"
                  min="0"
                  className="paint-calculator__input"
                />
              </div>

              <div className="paint-calculator__field">
                <label className="paint-calculator__label">Rendement (m²/litre) *</label>
                <input
                  type="number"
                  name="rendement"
                  value={formData.rendement}
                  onChange={handleChange}
                  placeholder="Ex: 9"
                  step="0.5"
                  className="paint-calculator__input"
                />
              </div>

              <div className="paint-calculator__field">
                <label className="paint-calculator__label">Nombre de couches *</label>
                <select
                  name="couches"
                  value={formData.couches}
                  onChange={handleChange}
                  className="paint-calculator__input paint-calculator__input--select"
                >
                  <option value="1">1 couche</option>
                  <option value="2">2 couches</option>
                  <option value="3">3 couches</option>
                </select>
              </div>
            </div>

            <div className="paint-calculator__actions">
              <button
                onClick={calculer}
                className="paint-calculator__button paint-calculator__button--primary"
              >
                Calculer
              </button>
              <button
                onClick={resetForm}
                className="paint-calculator__button paint-calculator__button--secondary"
              >
                <span className="paint-calculator__button-icon">↻</span>
                Réinitialiser
              </button>
            </div>
          </div>

          {results && (
            <section className="paint-results">
              <h2 className="paint-results__title">Résultats</h2>

              <div className="paint-results__grid">
                <div className="paint-results__card">
                  <p className="paint-results__label">Surface au sol</p>
                  <p className="paint-results__value">
                    {results.surfaceSol.toFixed(2)} m²
                  </p>
                </div>
                <div className="paint-results__card">
                  <p className="paint-results__label">Périmètre</p>
                  <p className="paint-results__value">
                    {results.perimetre.toFixed(2)} m
                  </p>
                </div>
                <div className="paint-results__card">
                  <p className="paint-results__label">Surface des murs (brute)</p>
                  <p className="paint-results__value">
                    {results.surfaceMurs.toFixed(2)} m²
                  </p>
                </div>
                <div className="paint-results__card">
                  <p className="paint-results__label">Surface à déduire</p>
                  <p className="paint-results__value">
                    {results.surfaceOuvertures.toFixed(2)} m²
                  </p>
                </div>
              </div>

              <div className="paint-results__highlight paint-results__highlight--primary">
                <p className="paint-results__label">Surface finale à peindre</p>
                <p className="paint-results__value paint-results__value--xl">
                  {results.surfaceFinale.toFixed(2)} m²
                </p>
                <p className="paint-results__hint">
                  ({results.couches} couche{results.couches > 1 ? "s" : ""})
                </p>
              </div>

              <div className="paint-results__highlight paint-results__highlight--success">
                <p className="paint-results__label">Peinture nécessaire</p>
                <p className="paint-results__value paint-results__value--xxl">
                  {results.quantitePeinture.toFixed(2)} L
                </p>
              </div>

              <div className="paint-results__suggestion">
                <p className="paint-results__suggestion-label">📦 Suggestion de pots :</p>
                <p className="paint-results__suggestion-value">
                  {getSuggestionsPots(results.quantitePeinture)}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
