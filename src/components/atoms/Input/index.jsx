const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`border p-4 text-xl rounded-lg ${className}`}
    />
  );
};

export default Input;
