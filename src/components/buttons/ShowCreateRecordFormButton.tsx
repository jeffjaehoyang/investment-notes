import React, { Dispatch, SetStateAction } from 'react';
import { TiDocumentAdd } from 'react-icons/ti';

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ShowCreateRecordFormButton = ({
  showModal,
  setShowModal,
}: Props) => {
  return (
    <button
      className='mt-4 w-full justify-center flex flex-row items-center rounded-md border border-gray-800 bg-teal-300 bg-opacity-10 px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white'
      onClick={() => setShowModal(!showModal)}
    >
      <TiDocumentAdd className='mr-2 text-xl' />
      Create New Record
    </button>
  );
};

export default ShowCreateRecordFormButton;
