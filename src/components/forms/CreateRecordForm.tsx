import { formatDate } from '@/lib/dataUtils';
import getInvestmentRecordsForUser from '@/lib/fetchers/getInvestmentRecordsForUser';
import { useEscapeKey } from '@/lib/functionUtils';
import { InvestmentRecord } from '@/types';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import AsyncSelect from 'react-select/async';
import useSWR from 'swr';
import * as Yup from 'yup';

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

/**
 * This form creates an investment record for user.
 * It's wrapped inside AnimatePresence, as it's required to
 * add animation when form is closed (framer motion)
 *
 * The form has _ fields:
 * - ticker: Company's Ticker Symbol
 * - amount: Investment Amount (USD)
 * - startDate: Date the decision was made
 */

const CreateRecordForm = ({ showModal, setShowModal }: Props) => {
  const { data: session } = useSession();

  // handle state change after mutation is done
  // after new record is created, we can mutate the list of investment records
  // which will trigger a re-render of the list, showing the newly-added one.
  // https://swr.vercel.app/docs/mutation
  const { data: investmentRecords, mutate } = useSWR<InvestmentRecord[]>(
    session?.user
      ? { url: '/api/investmentRecords/', args: session?.user.email }
      : null,
    getInvestmentRecordsForUser
  );

  const formik = useFormik({
    initialValues: {
      /* start user input fields */
      tickerSymbol: '',
      amount: '',
      startDate: formatDate(new Date()),
      didInvest: 'true',
      notes: '',
      /* end user input fields */

      /* start derived fields */
      email: session?.user?.email,
      companyDomain: '',
      companyName: '',
      /* end derived fields */
    },

    validationSchema: Yup.object({
      tickerSymbol: Yup.string().required('Ticker is required'),
      amount: Yup.number().required('Amount is required'),
      startDate: Yup.date().required('Start Date is required'),
      didInvest: Yup.boolean().required('This is a required field'),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const companyInfoResponse = await fetch(
          `/api/companyInfo?ticker=${values.tickerSymbol}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const companyInfoResponseRawData = await companyInfoResponse.json();

        const createRecordResponse = await fetch('/api/investmentRecords/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            notes: values.notes.length ? values.notes : 'No notes recorded.',
            companyDomain: companyInfoResponseRawData.data.companyDomain,
            companyName: companyInfoResponseRawData.data.companyName,
          }),
        });
        const createRecordResponseRawData = await createRecordResponse.json();
        investmentRecords?.push(
          createRecordResponseRawData.data as InvestmentRecord
        );
      } catch (error) {
        console.log(error);
      } finally {
        resetForm();
        setShowModal(false);
        setSubmitting(false);
        mutate(investmentRecords);
      }
    },
  });

  const handleFormClose = () => {
    formik.resetForm();
    setShowModal(false);
  };

  useEscapeKey(handleFormClose);

  // fetch filteres search results for dropdown
  const loadOptions = (userInput: string) => {
    return fetch(`/api/search?ticker=${userInput}`).then(async (res) => {
      const rawData = await res.json();
      return rawData.data;
    });
  };

  return (
    <AnimatePresence>
      {showModal ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleFormClose()}
          className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80 z-10 p-5 md:p-0'
        >
          <form
            onSubmit={formik.handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className='bg-white flex rounded-lg'
          >
            <div className='flex-1 text-black p-10'>
              <h1 className='text-xl pb-2'>
                Let's record your investment decision 📈
              </h1>
              <div className='mt-6 '>
                {/* Ticker input field */}
                <div className='pb-2'>
                  <label
                    htmlFor='tickerSymbol'
                    className={`block text-sm pb-2 ${
                      formik.touched.tickerSymbol && formik.errors.tickerSymbol
                        ? 'text-red-400'
                        : ''
                    } `}
                  >
                    {formik.touched.tickerSymbol && formik.errors.tickerSymbol
                      ? formik.errors.tickerSymbol
                      : 'Ticker'}
                  </label>
                  <p className='text-sm text-red-400 '></p>

                  <AsyncSelect
                    className='border-2 border-gray-500 rounded-md w-full focus:border-teal-500 focus:ring-teal-500 '
                    cacheOptions
                    name='tickerSymbol'
                    isMulti={false}
                    onBlur={formik.handleBlur}
                    loadOptions={loadOptions}
                    onChange={(event: any) => {
                      formik.setFieldValue(
                        'tickerSymbol',
                        event.value.toUpperCase()
                      );
                    }}
                    placeholder='AAPL'
                    noOptionsMessage={() => 'Search for ticker'}
                  />
                </div>
                {/* Amount input field */}
                <div className='pb-2'>
                  <label
                    htmlFor='amount'
                    className={`block text-sm pb-2 ${
                      formik.touched.amount && formik.errors.amount
                        ? 'text-red-400'
                        : ''
                    }`}
                  >
                    {formik.touched.amount && formik.errors.amount
                      ? formik.errors.amount
                      : 'Amount'}
                  </label>
                  <input
                    className='border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500'
                    type='number'
                    name='amount'
                    placeholder='$1000'
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {/* Start Date field */}
                <div className='pb-2'>
                  <label
                    htmlFor='startDate'
                    className={`block text-sm pb-2 ${
                      formik.touched.startDate && formik.errors.startDate
                        ? 'text-red-400'
                        : ''
                    }`}
                  >
                    Start Date
                  </label>
                  <input
                    type='date'
                    className='border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500'
                    name='startDate'
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  />
                </div>

                {/* Notes field */}
                <div className='pb-2'>
                  <label
                    htmlFor='notes'
                    className={`block text-sm pb-2 ${
                      formik.touched.notes && formik.errors.notes
                        ? 'text-red-400'
                        : ''
                    }`}
                  >
                    Investment Notes
                  </label>
                  <textarea
                    rows={5}
                    className='border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500'
                    name='notes'
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                    placeholder='Enter your investment notes :)'
                  />
                </div>

                {/* Did Invest field */}
                <div className='pb-2 flex flex-row items-center'>
                  <input
                    type='checkbox'
                    className='border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500'
                    name='didInvest'
                    onChange={(event) => {
                      formik.setFieldValue(
                        'didInvest',
                        event.target.value === 'true' ? 'false' : 'true'
                      );
                    }}
                    defaultChecked={formik.values.didInvest === 'true'}
                    value={formik.values.didInvest}
                  />
                  <label
                    htmlFor='didInvest'
                    className={`block text-sm ml-2 ${
                      formik.touched.didInvest && formik.errors.didInvest
                        ? 'text-red-400'
                        : ''
                    }`}
                  >
                    I invested in this asset.
                  </label>
                </div>

                <div className='flex flex-row items-center justify-between'>
                  <button
                    type='button'
                    onClick={() => handleFormClose()}
                    className='bg-gray-500 text-sm text-white py-3 mt-6 rounded-lg w-full'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='flex items-center justify-center ml-2 bg-teal-500 text-sm text-white py-3 mt-6 rounded-lg w-full'
                  >
                    {formik.isSubmitting ? (
                      <ThreeDots
                        ariaLabel='three-dots-loading'
                        color='#ffffff'
                        height={20}
                        width={20}
                        visible={true}
                      />
                    ) : (
                      'Create Record!'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CreateRecordForm;
