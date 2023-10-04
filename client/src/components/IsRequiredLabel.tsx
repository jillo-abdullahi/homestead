/**
 * Label to indicate that a field is required
 * @param {string} label - label text
 */
interface IsRequiredLabelProps {
  label: string;
}

const IsRequiredLabel: React.FC<IsRequiredLabelProps> = ({ label }) => {
  return (
    <span>
      {label} <span className="text-violet-600 text-xs">(required)</span>
    </span>
  );
};

export default IsRequiredLabel;
