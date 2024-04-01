export default function Button({ name, onChange }: ButtonProps) {
    return <button
        className="bg-indigo-700 px-4 py-2 text-white border rounded-md shadow-lg transform active:scale-y-90 transition-transform hover:bg-indigo-800"
        onClick={onChange}
    >
        {name}
    </button>
}