import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const NavBar = ({ state, toggle }) => {
  const [dropdown, setDropdown] = useState({
    phoneNumbers: false,
    importantLinks: false,
  });

  const dropdownChange = (n) => {
    const { id } = n.target;
    setDropdown({ dropdown: false, [id]: !dropdown[id] });
    // clicking out
    if (!dropdown.phoneNumbers || !dropdown.importantLinks) {
      document.body.addEventListener("click", dropdownChange);
    }
  };

  let popup = null;

  if (state.copied) {
    popup = (
      <span className="bottom-5 left-1/3 right-1/3 absolute z-100 bg-green-100 text-green-800 text-sm text-center font-medium mr-2 px-2.5 py-0.5 rounded bg-green-300">
        Copied to Clipboard!
      </span>
    );
  }

  return (
    <nav className="w-full text-white bg-neutral-900 border-gray-200 bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between p-4">
        <h2 className="pl-3 pr-4 pb-2 self-center text-2xl font-semibold whitespace-nowrap">
          Easy Notes
        </h2>
        {popup}
        <div className="w-full md:block md:w-auto" id="navbar-dropdown"></div>
      </div>
    </nav>
  );
};

export default NavBar;
