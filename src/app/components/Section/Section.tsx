export type SectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <div className="section p-12 rounded-lg shadow-md bg-white">
      {children}
    </div>
  );
}
