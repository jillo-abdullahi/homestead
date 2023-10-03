import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
/**
 * avatar component to show logged in user.
 * @prop {string} userEmail - email of the logged in user
 * @prop {string} username - name of the logged in user
 * @returns
 */

interface AvatarProps {
  userEmail: string;
  username: string;
}
const Avatar: React.FC<AvatarProps> = ({ userEmail, username }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full p-2 bg-gray-100 text-gray-400 hover:text-gray-600">
          <a href="#" className="group block flex-shrink-0">
            <div className="flex items-center justify-start">
              <div>
                <Image
                  width={36}
                  height={36}
                  className="inline-block rounded-full"
                  src="/avatar.svg"
                  alt="avatar"
                />
              </div>
              <div className="ml-2 text-left">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {username}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {userEmail}
                </p>
              </div>
            </div>
          </a>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Avatar;
