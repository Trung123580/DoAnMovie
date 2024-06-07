function BoxSolid({ value, className, icon, onClick }: { value?: string; className?: string; icon?: React.ReactNode; onClick?: func }) {
  return (
    <span onClick={onClick} className={` text-white border leading-none text-xs py-1 px-[.625rem] rounded-sm flex-center ${className}`}>
      {icon}
      {value}
    </span>
  );
}
export default BoxSolid;
