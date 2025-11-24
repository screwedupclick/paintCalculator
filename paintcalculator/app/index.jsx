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
  };
}
