import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
    <div>
      <Link
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        to="/dashboard"
      >
        Hem
      </Link>
    </div>
  );
}