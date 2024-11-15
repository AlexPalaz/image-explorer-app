"use client";

export type SearchProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function SearchBar({ onChange, value }: SearchProps) {
  return (
    <input
      className="search w-full px-4 bg-transparent border h-8 rounded-full text-sm"
      placeholder="Search images"
      onChange={onChange}
      value={value}
    />
  );
}
