import { Link } from "react-router-dom";
import imageLink from "../../img/profilePic.png";

export default function UserButton() {
  return (
    <div>
      <Link
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        to="/user"
      >
        <img src={imageLink} width={40} height={40}></img>
      </Link>
    </div>
  );
}
