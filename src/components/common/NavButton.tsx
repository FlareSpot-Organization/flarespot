import { NavButtonProps } from "@/types/public";

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  className = "",
}) => <button className={`custom-btn ${className}`}>{children}</button>;
