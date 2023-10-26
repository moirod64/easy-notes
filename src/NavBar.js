import data from "./data.json";
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
        <div className="w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex font-medium md:p-0 flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-neutral-900">
            <li className="pr-3 pl-3">
              <button
                onClick={dropdownChange}
                id="phoneNumbers"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between text-white w-full rounded md:border-0 hover:text-indigo-400 md:p-0 md:w-auto hover:scale-105"
              >
                Phone numbers
              </button>
              <div
                id="dropdownNavbar"
                className={`z-10 w-fit font-normal bg-indigo-300 divide-y divide-gray-100 rounded-lg shadow absolute ${
                  dropdown.phoneNumbers ? "" : "hidden"
                }`}
              >
                <ul
                  className="w-fit p-2 text-sm text-gray-800"
                  aria-labelledby="dropdownLargeButton"
                >
                  {data.phoneNumbersList.map((i, arr) => (
                    <li className="font-bold w-full" key={arr}>
                      <CopyToClipboard
                        id="copied"
                        key={i}
                        className="block w-full px-3 py-2 hover:bg-indigo-500 rounded-lg"
                        text={i}
                      >
                        <button onClick={toggle} key={arr + 1}>
                          {data.phoneNumberNames[arr]}
                        </button>
                      </CopyToClipboard>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="pr-3">
              <button
                onClick={dropdownChange}
                id="importantLinks"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between text-white w-full rounded md:border-0 hover:text-indigo-400 md:w-auto hover:scale-105"
              >
                Important Links
              </button>
              <div
                id="dropdownNavbar"
                className={`z-10 w-fit font-normal bg-indigo-300 divide-y divide-gray-100 rounded-lg shadow absolute ${
                  dropdown.importantLinks ? "" : "hidden"
                }`}
              >
                <ul
                  className="w-fit p-2 text-sm text-gray-800"
                  aria-labelledby="dropdownLargeButton"
                >
                  {data.importantLinks.map((i, arr) => (
                    <li key={arr} className="font-bold w-full">
                      <a
                        className="block w-full px-3 py-2 hover:bg-indigo-500 rounded-lg"
                        href={i}
                      >
                        {data.importantLinksNames[arr]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
