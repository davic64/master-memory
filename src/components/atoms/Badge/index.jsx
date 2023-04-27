const Badge = ({ src, points }) => {
  return (
    <div className="flex gap-3 font-bold select-none">
      <img src={src} alt="coin" className="w-6 pointer-events-none" />
      {points}
    </div>
  );
};

export default Badge;
