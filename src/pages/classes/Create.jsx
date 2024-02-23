import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addClass } from "../../redux/classesSlice";
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const classes = useSelector((state) => state.classes.classes);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setShowError(true);
            setErrorMessage('Class name is required')
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        dispatch(addClass({ id: classes.length + 1, className: name }));
        navigate('/classes');
    };

    return (
        <>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4">
                <div>
                    <label htmlFor="Class" className='text-mainBlue'>Class</label>
                    <input required placeholder="Enter class name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="Class" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none" onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </>
    )
}
