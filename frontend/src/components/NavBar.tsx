import { isAuthenticated } from "@/utils/auth";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Cart", to: "/cart" },
    { name: "Orders", to: "/orders" },
    { name: "Account", to: "/account", requiresAuth: true },
    { name: "Login", to: "/login", requiresAuth: false },
  ];

  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isAuthenticatedStatus = await isAuthenticated();
      setAuthStatus(isAuthenticatedStatus);
    };

    checkAuthStatus();
  }, []);

  const renderNavItems = navItems.map((item) => {
    // Show Account only when authenticated
    if (item.requiresAuth && !authStatus) {
      return null;
    }
    
    // Show Login only when not authenticated
    if (item.name === "Login" && authStatus) {
      return null;
    }

    return (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }) =>
          isActive
            ? "text-gray-700 font-bold rounded-lg transition-all duration-300 px-2 bg-gray-300 py-1"
            : "text-gray-600 font-medium hover:text-primary hover:bg-gray-200 transition-all duration-300 px-2 rounded-lg py-1"
        }
      >
        {item.name}
      </NavLink>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between p-10">
        {renderNavItems}
      </div>
    </div>
  );
};

export default NavBar;