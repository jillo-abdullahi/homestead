import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { removeLoggedInUser } from "@/utils/saveLoggedInUser";
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
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full p-2  text-violet-700 hover:text-violet-600">
          <a href="#" className="group block flex-shrink-0">
            <div className="flex items-center justify-start">
              <div>
                <UserCircleIcon className="h-8 w-8 mr-1" aria-hidden="true" />
              </div>
            </div>
          </a>
          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-violet-200">
          <div className="py-1">
            <Menu.Item>
              <div className="flex items-center justify-start px-4 py-3">
                <div className="text-violet-700">
                  <UserCircleIcon className="h-8 w-8 mr-1" aria-hidden="true" />
                </div>
                <div className="ml-2 text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {username}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {userEmail}
                  </p>
                </div>
              </div>
            </Menu.Item>
          </div>
          <div className="rounded-b-md overflow-hidden">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={removeLoggedInUser}
                  className={classNames(
                    active ? "bg-violet-200 text-gray-900" : "text-gray-700",
                    "flex items-center w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <ArrowRightOnRectangleIcon
                    className="h-4 w-4 mr-2"
                    aria-hidden="true"
                  />
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
