const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`py-4 px-8 bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg font-bold cursor-pointer ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
