import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateStudent } from "../../redux/studentsSlice";
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Update() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const students = useSelector((state) => state.students.students);
    const classes = useSelector((state) => state.classes.classes);
    const oldStudentInfo = students.find((student) => student.id == id);
    const { name: oldName, birthday: oldBirthday, address: oldAddress, image: oldImage, clas: oldClass } = oldStudentInfo;

    const [updatedName, setUpdatedName] = useState(oldName);
    const [updatedBirthday, setUpdatedBirthday] = useState(oldBirthday);
    const [updatedAddress, setUpdatedAddress] = useState(oldAddress);
    const [updatedImage, setUpdatedImage] = useState(oldImage);
    const [updatedClass, setUpdatedClass] = useState(oldClass);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updatedName || !updatedBirthday || !updatedAddress || !updatedClass || !updatedImage) {
            setShowError(true);
            setErrorMessage('All fields are required')
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        dispatch(updateStudent({ id, name: updatedName, birthday: updatedBirthday, address: updatedAddress, image: updatedImage, clas: updatedClass }));
        navigate('/students');
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className='h-12'>
                {showError && <ErrorAlert message={errorMessage} />}
            </div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input type={'text'} value={updatedName} onChange={(e) => { setUpdatedName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input type={'date'} value={updatedBirthday} onChange={(e) => { setUpdatedBirthday(e.target.value) }} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input type={'text'} value={updatedAddress} onChange={(e) => { setUpdatedAddress(e.target.value) }} id="Address" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="image" className='text-mainBlue'>Image</label>
                    <input type={'file'} id='image' onChange={handleImageChange} className="block text-sm text-gray-400 font-normal mt-2 file:font-normal file:mr-2 file:py-2 file:px-2 file:rounded-md file:border-solid file:border file:border-gray-200 file:text-sm file:bg-white file:text-gray-400 hover:file:bg-gray-100" />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={updatedClass} onChange={(e) => setUpdatedClass(e.target.value)}>
                        <option value="">Choose a class</option>
                        {classes.map((item, key) => (
                            <option key={key} value={item.name}>{item.className}</option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>
            </form>
        </div>
    );
}
