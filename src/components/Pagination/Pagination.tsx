import { ChevronLeftIcon, ChevronRightIcon } from "../Icons/Icons";

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  pages,
  onPageChange,
}: PaginationProps) {
  const maxPages = 200; // FIXME: Limit to 200 pages max because Unsplash is not showing contents after page 200
  const totalPages = Math.min(pages, maxPages);

  if (!totalPages) return null;

  if (totalPages <= 1) return "That's it!";

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex gap-2">
      {page > 1 && (
        <button
          className={`border rounded p-1 mr-4 hover:bg-black hover:text-white transition-all`}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeftIcon />
        </button>
      )}
      {visiblePages.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">
            . . .
          </span>
        ) : (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`border p-1 rounded min-w-8 font-semibold ${
              pageNumber === page ? "bg-yellow-300 text-black" : "bg-white"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}
      {page < totalPages && (
        <button
          className={`border rounded p-1 ml-4 hover:bg-black hover:text-white transition-all`}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  const firstPages = [1, 2, 3];
  const lastPage = total;

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [...firstPages, "...", lastPage];
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", lastPage];
}
