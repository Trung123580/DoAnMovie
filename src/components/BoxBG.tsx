function BoxBG({ value, className }: { value?: string; className?: string }) {
  return (
    <span className={`bg-white text-black border leading-none border-transparent text-sm py-1 px-[.625rem] rounded-sm  flex-center ${className}`}>
      {value}
    </span>
  );
}
export default BoxBG;
