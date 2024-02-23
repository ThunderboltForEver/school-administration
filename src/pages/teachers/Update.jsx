import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateTeacher } from '../../redux/teachersSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';


export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers)
    const oldTeachersInfo = teachers.filter((teacher) => teacher.id == id);
    const { name, birthday, address } = oldTeachersInfo[0];

    const [updatedName, setUpdatedName] = useState(name);
    const [updatedBirthday, setUpdatedBirthday] = useState(birthday);
    const [updatedAddress, setUpdatedAddress] = useState(address);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updatedName || !updatedBirthday || !updatedAddress) {
            setShowError(true);
            setErrorMessage('All fields are required');
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        dispatch(updateTeacher({ id: id, name: updatedName, birthday: updatedBirthday, address: updatedAddress }));
        navigate('/teachers');

    }

    return (
        <div>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input  placeholder="Enter student name" type={'text'} value={updatedName} onChange={(e) => { setUpdatedName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input  type={'date'} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={updatedBirthday} onChange={(e) => { setUpdatedBirthday(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input  type={'text'} id="Address" placeholder='Enter student address' className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={updatedAddress} onChange={(e) => { setUpdatedAddress(e.target.value) }} />
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>

            </form>

        </div >
    )
}
