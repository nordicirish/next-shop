export default function Input({ type }) {
  return (
    <div className="flex flex-col mb-4">
      <input type={type} className="border rounded px-3 py-1 w-80" />
    </div>
  );
}
