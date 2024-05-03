import { NavLink, Link } from "react-router-dom";

//icons
import { BsHouseDoorFill, BsSpotify } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="w-screen h-15 flex flex-row justify-between items-center text-violet-600 border-b-slate-700 border-b-2 font-bold  ">
      <Link to="/" className="p-2">
        <BsSpotify className="w-12 h-12" />{" "}
      </Link>

      <ul className="flex flex-row justify-around items-baseline w-2/5 pr-3">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill className="size-5" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <h1 className="size-4">Login</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            <h1 className="size-4">Cadastro</h1>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
