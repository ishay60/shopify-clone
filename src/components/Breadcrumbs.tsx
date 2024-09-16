import * as React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <nav className="text-sm mb-4">
      <ul className="flex space-x-2">
        <li>
          <Link to="/" className="text-blue-500">
            Home
          </Link>
        </li>
        <li>/</li>
        <li className="text-gray-500">Products</li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
