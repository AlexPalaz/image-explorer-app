export type SubmitButtonProps = {
  label: string | React.ReactNode;
  disabled?: boolean
};

export default function SubmitButton({ label, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="rounded text-sm bg-yellow-300 w-max px-4 py-2 font-semibold hover:text-white hover:bg-black transition-all disabled:bg-gray-50 disabled:text-gray-500"
      disabled={disabled || false}
    >
      {label}
    </button>
  );
}
