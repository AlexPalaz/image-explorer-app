import Route from "./Route/Route";

export default function Header() {
  return (
    <div className="header h-14 w-full flex items-center px-4 bg-yellow-300 font-semibold">
      <div className="flex gap-4">
        <Route name="Home" href="/" />
      </div>
    </div>
  );
}
