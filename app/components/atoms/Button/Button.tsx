interface ButtonProps {
  children?: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button
      className="bg-red-600 text-gray-50 rounded-2 py-1 px-4 shadow-sm shadow-red-700 hover:bg-red-500 active:bg-red-700"
      type="button"
    >
      {children}
    </button>
  );
};

export { Button };
