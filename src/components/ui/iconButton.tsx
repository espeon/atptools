import clsx from "clsx";
interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  Icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export const IconButton = (props: IconButtonProps) => {
  const Icon = props.Icon;
  return (
    // tailwindcss button
    <button
      className={clsx(
        props.className,
        "flex items-center justify-center w-10 h-10 p-3 rounded-full transition-colors duration-150 bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700",
        "disabled:cursor-default disabled:bg-gray-200 disabled:dark:bg-gray-800",
      )}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      {Icon}
    </button>
  );
};
