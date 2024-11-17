export type SectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <div className="section p-8 rounded-lg shadow-md bg-white max-w-[1920px] m-auto">
      {children}
    </div>
  );
}
