import React from "react";

type ButtonProps = {
  isLoading: boolean;
  label: string;
  action?: () => void;
  type: "submit" | "button";
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  isLoading,
  type,
  action,
  label,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={action}
    >
      {isLoading ? (
        <div className="spinner scale-[.3] mx-auto " />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};
export default Button;
