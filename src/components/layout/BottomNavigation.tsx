
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Heart, PaintBucket, Tag } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path;
  };
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'themes', icon: PaintBucket, label: 'Themes', path: '/themes' },
    { id: 'topics', icon: Tag, label: 'Topics', path: '/topics' },
    { id: 'favorites', icon: Heart, label: 'Favorites', path: '/favorites' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center px-3 py-2 rounded-lg ${
              isActive(item.path) ? 'text-affirm-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className={`h-6 w-6 ${isActive(item.path) ? 'text-affirm-primary' : 'text-gray-500'}`} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
