import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/utils/cn";
import { AuthContext } from "@/App";

const Header = ({ onSearch }) => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigation = [
    { name: "Browse Properties", href: "/", icon: "Home" },
    { name: "Saved Properties", href: "/saved", icon: "Heart" }
  ];

  const isActiveRoute = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-display gradient-text">
              EstateView
            </span>
          </Link>
{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActiveRoute(item.href)
                    ? "bg-primary-50 text-primary-600"
                    : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
                )}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.name}
                {item.href === "/saved" && favorites.length > 0 && (
                  <span className="ml-1 bg-secondary-500 text-white text-xs rounded-full px-2 py-0.5">
                    {favorites.length}
                  </span>
                )}
              </Link>
            ))}
            
            {/* User Menu */}
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-neutral-600 hover:text-neutral-800"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 p-0"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <SearchBar onSearch={handleSearch} />
            
{/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActiveRoute(item.href)
                      ? "bg-primary-50 text-primary-600"
                      : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
                  )}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {item.name}
                  {item.href === "/saved" && favorites.length > 0 && (
                    <span className="ml-auto bg-secondary-500 text-white text-xs rounded-full px-2 py-0.5">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              {isAuthenticated && (
                <div className="border-t border-neutral-200 pt-4 mt-4">
                  <div className="px-4 py-2 text-sm text-neutral-600">
                    Welcome, {user?.firstName || user?.name || 'User'}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-neutral-600 hover:text-neutral-800"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;