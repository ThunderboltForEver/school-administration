import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../redux/studentsSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [clas, setClas] = useState('');
    const [image, setImage] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const studentsData = useSelector((state) => state.students.students);
    const classes = useSelector((state) => state.classes.classes);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (classes.length === 0) {
            setErrorMessage('Add class first');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        if (!name || !birthday || !address || !clas || !image) {
            setShowError(true);
            setErrorMessage('All fields are required')
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }


        dispatch(addStudent({ id: studentsData.length + 1, name, birthday, address, image, clas }));
        navigate('/students');
    };

    const handleSelectChange = (e) => {
        setClas(e.target.value);
    }

    return (
        <div className='max-w-[750px] mx-auto'>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required placeholder="Enter student name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input required type={'date'} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={birthday} onChange={(e) => { setBirthday(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input required type={'text'} id="Address" placeholder='Enter student address' className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="image" className='text-mainBlue'>Image</label>
                    <input type={'file'} id='image' className="block text-sm text-gray-400 font-normal mt-2 file:font-normal file:mr-2 file:py-2 file:px-2 file:rounded-md file:border-solid file:border file:border-gray-200 file:text-sm file:bg-white file:text-gray-400 hover:file:bg-gray-100" onChange={handleImageUpload} />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={handleSelectChange} >
                        <option value="">Choose a class</option>
                        {classes.map((clas, key) => (
                            <option value={clas.className} key={key}>{clas.className}</option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none" onClick={handleSubmit}>Add</button>
                </div>
            </form>

        </div >
    );
}
