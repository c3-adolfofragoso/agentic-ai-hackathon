import React from 'react';
import { Menu } from '@headlessui/react';
import { User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#2563EB]">ResourceHub</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex items-center max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#profile"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#settings"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#signout"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}