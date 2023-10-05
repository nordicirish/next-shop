export default function Input({ type, value, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-1 w-80"
    />
  );
}
