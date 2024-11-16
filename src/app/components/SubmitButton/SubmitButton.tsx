export type SubmitButtonProps = {
  label: string;
};

export default function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="rounded text-sm bg-yellow-300 w-max px-4 py-2 font-semibold hover:text-white hover:bg-black transition-all"
    >
      {label}
    </button>
  );
}
