import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BiUser } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>Options</MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg transition py-1"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href=""
              className="px-4 pb-1 text-sm text-gray-700 text-black font-semibold flex items-center gap-x-3"
            >
              <BiUser />
              Profile
            </Link>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="w-full px-4 text-left text-sm text-gray-700 text-black font-semibold flex items-center gap-x-3"
              >
                <PiSignOutBold />
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
