export default function Button({ type, onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-800 hover:bg-green-700 text-gray-100 py-2 px-4 my-2 rounded"
    >
      {children}
    </button>
  );
}
