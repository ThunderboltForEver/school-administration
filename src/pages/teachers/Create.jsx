import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../redux/teachersSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';


export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !birthday || !address) {
            setShowError(true);
            setErrorMessage('All fields are required');
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        dispatch(addTeacher({ id: teachers.length + 1, name, birthday, address }));
        navigate('/teachers')
    }
    return (
        <div>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit}  >
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input placeholder="Enter teacher name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input type={'date'} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={birthday} onChange={(e) => { setBirthday(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input type={'text'} id="Address" placeholder='Enter teacher address' className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Add</button>
                </div>

            </form>

        </div >
    )
}
