import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData, setModalState } from '../redux/action/appActions';
import { isEmpty } from 'lodash';

const ContactvalidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("The field is required.")
    .matches(/^[A-Za-z ]+$/, "No numbers or special characters are allowed."),
  lastName: Yup.string()
    .required("The field is required.")
    .matches(/^[A-Za-z ]+$/, "No numbers or special characters are allowed."),
  email: Yup.string()
    .required("The field is required.")
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/, "Email is invalid."),
  status: Yup.string()
    .required("The field is required.")
});

const ContactForm = () => {
  const { contactList, selectedUser, title } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const defaultValues = {
    firstName: selectedUser?.firstName as string || '',
    lastName: selectedUser?.lastName as string || '',
    email: selectedUser?.email as string || '',
    status: selectedUser?.status as string || '',
  };

  const {
    handleSubmit,
    formState,
    control
  } = useForm({
    defaultValues,
    resolver: yupResolver(ContactvalidationSchema),
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = (data: any) => {
    let newData;
    if (!isEmpty(selectedUser) && title.startsWith('Edit')) {
      const updateData = contactList;
      updateData[selectedUser?.id] = data;
      newData = updateData;
    } else {
      newData = [...contactList, data];
    }
    dispatch(setContactData(newData));
    dispatch(setModalState(false));
  };

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="rounded-lg p-6 w-full">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">First Name</label>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <input type="text" className="w-full px-4 py-2 border rounded" placeholder="Enter your first name" {...field} />
                )}
              />
              <p className='text-red-500 h-7'>
                {errors?.firstName ? errors?.firstName?.message : ''}
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name</label>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <input type="text" className="w-full px-4 py-2 border rounded" placeholder="Enter your last name" {...field} />
                )}
              />
              <p className='text-red-500 h-7'>
                {errors?.lastName ? errors?.lastName?.message : ''}
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <input type="text" className="w-full px-4 py-2 border rounded" placeholder="Enter your email" {...field} />
                )}
              />
              <p className='text-red-500 h-7'>
                {errors?.email ? errors?.email?.message : ''}
              </p>
            </div>
            <div className="mb-4">
              <span className="block mb-2">Status</span>
              <Controller
                name='status'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <>
                    <label className="inline-flex items-center" >
                      <input type="radio" className="form-radio" name="status" value="Active" checked={field.value === 'Active'} onChange={() => field.onChange('Active')} />
                      <span className="ml-2">Active</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input type="radio" className="form-radio" name="status" value="Inactive" checked={field.value === 'Inactive'} onChange={() => field.onChange('Inactive')} />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </>
                )}
              />
              <p className='text-red-500 h-7'>
                {errors?.status ? errors?.status?.message : ''}
              </p>
            </div>
            <button type="submit" className="w-full rounded-full py-1 px-3 bg-white hover:opacity-75 text-black font-bold uppercase">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm;