// Satori calcule l'avance de l'espace à partir du glyphe précédent : selon la dernière
// lettre du mot, l'intermotif devient 2 à 3 fois trop large. En découpant la ligne en mots
// séparés par un gap, aucun caractère espace n'est rendu et l'espacement redevient régulier.
// \s+ et non " " : les prix formatés en fr-FR contiennent une espace insécable fine (U+202F).
type Props = { text: string; gap: number };

export function OgLine({ text, gap }: Props) {
  return (
    <span style={{ display: "flex", flexWrap: "wrap", gap }}>
      {text.split(/\s+/).map((word, index) => (
        <span key={`${word}-${index}`}>{word}</span>
      ))}
    </span>
  );
}
