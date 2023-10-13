import { Fragment, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Exo } from "next/font/google";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DeletionProgress } from "@/components/deleteListing/types";
import PrimaryButton from "../buttons/PrimaryButton";

/**
 * Modal component to show deletion progress for a listing
 * @param open - boolean to show/hide modal
 * @param setOpen - function to set open state
 * @param deletionProgress - boolean to show/hide deletion progress
 * @param handleDeleteListing - function to handle deletion of listing
 * @returns - JSX.Element
 */

interface DeleteListingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deletionProgress: DeletionProgress;
  handleDeleteListing: () => void;
}
const exo = Exo({ subsets: ["latin"] });

const DeleteListingModal: React.FC<DeleteListingModalProps> = ({
  open,
  setOpen,
  deletionProgress,
  handleDeleteListing,
}) => {
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${exo.className}`}
        initialFocus={cancelButtonRef}
        onClose={(open) => {
          return;
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* Confirm deletion  */}
                {deletionProgress === DeletionProgress.NOT_STARTED && (
                  <>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete listing
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Are you sure you want to delete this listing? It
                            will be permanently removed from our servers
                            forever. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDeleteListing}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {/* Deletion in progress  */}
                {deletionProgress === DeletionProgress.DELETING && (
                  <>
                    <div className="sm:flex sm:items-start">
                      <div className="relative mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <div className="absolute inset-x-0 inset-y-0">
                          <Image
                            src="/progressIcons/spinner.svg"
                            width={100}
                            height={100}
                            alt="spinner"
                          />
                        </div>
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deleting listing
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Please wait while we delete your listing. This may
                            take a few moments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Deletion complete  */}
                {deletionProgress === DeletionProgress.DELETED && (
                  <>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Listing deleted
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Your listing has been deleted. Click the button
                            below to go back to the home page.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 flex w-full items-center justify-end">
                      <div className="w-24">
                        <PrimaryButton onClick={goHome}>Go home</PrimaryButton>
                      </div>
                    </div>
                  </>
                )}

                {/* Deletion failed  */}
                {deletionProgress === DeletionProgress.ERROR && (
                  <>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deletion failed
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Something went wrong while deleting your listing.
                            Please try again later.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 flex w-full items-center justify-end">
                      <div className="w-24">
                        <PrimaryButton onClick={() => setOpen(false)}>
                          Close
                        </PrimaryButton>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteListingModal;
