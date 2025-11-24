import { useState } from "react";
import { rotateCcw } from "lucid-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎨 Calculateur de Peinture
          </h1>
          <p className="text-gray-600 mb-6">
            Calculez la quantité de peinture nécessaire pour votre pièce
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longueur (m) *
                </label>
                <input
                  type="number"
                  name="longueur"
                  value={formData.longueur}
                  onChange={handleChange}
                  placeholder="Ex: 4"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Largeur (m) *
                </label>
                <input
                  type="number"
                  name="largeur"
                  value={formData.largeur}
                  onChange={handleChange}
                  placeholder="Ex: 3"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hauteur sous plafond (m) *
                </label>
                <input
                  type="number"
                  name="hauteur"
                  value={formData.hauteur}
                  onChange={handleChange}
                  placeholder="Ex: 2.5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de portes/fenêtres
                </label>
                <input
                  type="number"
                  name="ouvertures"
                  value={formData.ouvertures}
                  onChange={handleChange}
                  placeholder="Ex: 2"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rendement (m²/litre) *
                </label>
                <input
                  type="number"
                  name="rendement"
                  value={formData.rendement}
                  onChange={handleChange}
                  placeholder="Ex: 9"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de couches *
                </label>
                <select
                  name="couches"
                  value={formData.couches}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="1">1 couche</option>
                  <option value="2">2 couches</option>
                  <option value="3">3 couches</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={calculer}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Calculer
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Réinitialiser
              </button>
            </div>
          </div>

          {results && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Résultats
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Surface au sol</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.surfaceSol.toFixed(2)} m²
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Périmètre</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.perimetre.toFixed(2)} m
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Surface des murs (brute)
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.surfaceMurs.toFixed(2)} m²
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Surface à déduire</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.surfaceOuvertures.toFixed(2)} m²
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Surface finale à peindre
                </p>
                <p className="text-3xl font-bold text-indigo-600 mb-4">
                  {results.surfaceFinale.toFixed(2)} m²
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  ({results.couches} couche{results.couches > 1 ? "s" : ""})
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Peinture nécessaire
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {results.quantitePeinture.toFixed(2)} L
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  📦 Suggestion de pots :
                </p>
                <p className="text-lg text-blue-700 font-semibold">
                  {getSuggestionsPots(results.quantitePeinture)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
