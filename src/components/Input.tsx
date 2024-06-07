const Input = ({ placeholder, name, defaultValue }: { defaultValue?: string; placeholder?: string; name?: string }) => {
  return (
    <input
      type='text'
      name={name}
      className='w-full h-full bg-transparent px-5 text-black placeholder:text-black text-base md:text-lg font-semibold leading-none outline-none border-none'
      placeholder={placeholder}
      autoComplete='off'
      defaultValue={defaultValue}
      autoFocus={true}
    />
  );
};

export default Input;
