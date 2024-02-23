import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateClass } from '../../redux/classesSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const classes = useSelector(state => state.classes.classes);
    const oldClassesInfo = classes.filter((clas) => clas.id == id);
    const { className } = oldClassesInfo[0];
    const [updatedName, setUpdatedName] = useState(className);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updatedName) {
            setShowError(true);
            setErrorMessage('Class name is required')
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        dispatch(updateClass({ id: id, className: updatedName }));
        navigate('/classes');
    }

    return (
        <>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit}  >

                <div>
                    <label htmlFor="Name" className='text-mainBlue'>Name</label>
                    <input type={'text'} id="Student" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={updatedName} onChange={(e) => { setUpdatedName(e.target.value) }} />
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>

            </form>

        </>
    )
}
