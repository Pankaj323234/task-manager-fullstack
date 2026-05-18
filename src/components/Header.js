import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="bg-dark">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark ">

          <div className="container-fluid">

            <Link className="navbar-brand fw-bold" to="/">
              📋 Task Manager
            </Link>

            {/* Hamburger Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarContent">

              <div className="navbar-nav ms-auto align-items-center">

                <Link className="nav-link" to="/">
                  Home
                </Link>

                <Link className="nav-link" to="/about">
                  About
                </Link>

                <Link className="nav-link" to="/contact">
                  Contact
                </Link>

                <button
                  className="btn btn-light ms-lg-3 mt-2 mt-lg-0"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>

              </div>

            </div>

          </div>

        </nav>
      </div>
    </header>
  );
}

export default Header;