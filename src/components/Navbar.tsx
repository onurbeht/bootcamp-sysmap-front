import { NavLink, Link } from "react-router-dom";

//icons
import { BsHouseDoorFill, BsSpotify } from "react-icons/bs";

//context
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <nav className="max-w-full h-15 flex flex-row justify-between items-center text-violet-600 border-b-slate-700 border-b-2 font-bold  ">
      <Link to="/" className="p-2">
        <BsSpotify className="w-12 h-12" />{" "}
      </Link>

      {isAuthenticated ? (
        <ul className="flex justify-end flex-row items-baseline w-2/5 gap-5 mr-5 text-lg">
          <li>
            <NavLink to="/">
              <BsHouseDoorFill className="size-5" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-user">Perfil</NavLink>
          </li>
          <li onClick={() => logout()}>
            <Link to="/login">Sair</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row justify-around items-baseline w-2/5 pr-3">
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
      )}
    </nav>
  );
};

export default Navbar;
