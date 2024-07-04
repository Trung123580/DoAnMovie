import Link from 'next/link';

export default function Button({
  icon,
  content,
  className,
  onClick,
  href,
  disabled,
}: {
  icon?: React.ReactNode | any;
  content?: string | number;
  className?: string;
  onClick?: funcEvent;
  href?: any;
  disabled?: any;
}) {
  const CheckLink = href ? Link : 'button';
  return (
    <CheckLink disabled={disabled} href={href} className={`${className} btn-disable`} type='submit' onClick={onClick}>
      {icon} {content}
    </CheckLink>
  );
}
