import { Fragment } from "react";
import Image from "next/image";
import { Exo } from "next/font/google";
import { Dialog, Transition } from "@headlessui/react";
import { ProgressStatus } from "@/components/progressModal/types";
import PrimaryButton from "@/components/buttons/PrimaryButton";
/**
 * modal component to show progress of an operation
 * @param {string} title - title of the modal
 * @param {function} onClose - function to close the modal
 * @param {boolean} open - opens the modal if true
 * @param {ProgressStatus} progressStatus - progress status of the operation
 * @param {string} loadingText - text to show when operation is in progress
 * @param {string} successText - text to show when operation is successful
 * @param {string} errorText - text to show when operation fails
 * @returns
 */

// adding font here because the modal doesn't pick up the font from _app.tsx
// for some reason
// TODO: investigate why
const exo = Exo({ subsets: ["latin"] });

interface ProgressModalProps {
  title: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  onClose: () => void;
  open: boolean;
  progressStatus?: ProgressStatus;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  title,
  onClose,
  open,
  progressStatus,
  loadingText,
  successText,
  errorText,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${exo.className}`}
        onClose={onClose}
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
          <div className="flex min-h-full items-end justify-center py-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div>
                  <div className="text-gray-700 text-lg font-bold border-b border-gray-100 px-4 pb-2">
                    {title}
                  </div>
                  <div className="mt-6 px-6">
                    {progressStatus === ProgressStatus.InProgress && (
                      <div className="space-y-4 mt-10">
                        <div className="relative flex items-center justify-center mb-10">
                          <Image
                            src="/progressIcons/inProgress.svg"
                            alt="loading"
                            width={90}
                            height={90}
                          />
                          <Image
                            src="/progressIcons/spinner.svg"
                            alt="loading"
                            width={130}
                            height={130}
                            className="absolute inset-x-0 inset-y-0 mx-auto my-auto"
                          />
                        </div>
                        <div className="text-gray-700 font-medium w-full text-center mt-6">
                          {loadingText}
                        </div>
                      </div>
                    )}
                    {progressStatus === ProgressStatus.Completed && (
                      <div className="space-y-4 mt-10">
                        <div className="flex items-center justify-center mb-8">
                          <div className="w-[130px] h-[130px] rounded-full border-4 border-green-600 flex items-center justify-center">
                            <Image
                              src="/progressIcons/success.svg"
                              alt="success"
                              width={90}
                              height={90}
                            />
                          </div>
                        </div>
                        <div className="text-gray-700 font-medium w-full text-center">
                          {successText}
                        </div>
                        <div>
                          <PrimaryButton
                            onClick={() => console.log("GOING TO LISTING PAGE")}
                          >
                            <span>View listing</span>
                          </PrimaryButton>
                        </div>
                      </div>
                    )}
                    {progressStatus === ProgressStatus.Error && (
                      <div className="space-y-4 mt-10">
                        <div className="flex items-center justify-center mb-8">
                          <div className="w-[130px] h-[130px] rounded-full border-4 border-red-500 flex items-center justify-center">
                            <Image
                              src="/progressIcons/error.svg"
                              alt="failed"
                              width={90}
                              height={90}
                            />
                          </div>
                        </div>
                        <div className="text-gray-700 font-medium w-full text-center">
                          {errorText}
                        </div>
                        <div>
                          <PrimaryButton
                            onClick={() => console.log("Close Modal")}
                          >
                            <span>Close</span>
                          </PrimaryButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProgressModal;
