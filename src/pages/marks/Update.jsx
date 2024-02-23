import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateMark } from '../../redux/marksSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const subjects = useSelector((state) => state.subjects.subjects);
    const students = useSelector((state) => state.students.students);
    const marks = useSelector((state) => state.marks.marks);
    const oldMark = marks.find(mark => mark.id == id);
    const { mark: oldMarkValue, student: oldStudent, subject: oldSubject } = oldMark;

    const [updatedMark, setUpdatedMark] = useState(oldMarkValue);
    const [updatedStudent, setUpdatedStudent] = useState(oldStudent);
    const [updatedSubject, setUpdatedSubject] = useState(oldSubject);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!updatedMark || !updatedStudent || !updatedSubject) {
            setShowError(true);
            setErrorMessage('All fields are required');

            setTimeout(() => {
                setShowError(false);
            }, 5000);

            return;
        }

        const updatedMarkData = {
            id,
            mark: Number(updatedMark),
            student: updatedStudent,
            subject: updatedSubject
        };
        dispatch(updateMark(updatedMarkData));
        navigate('/marks');
    }

    return (
        <div>
            <div className='max-w-[750px] mx-auto'>
                <div className='h-12'>
                    {showError && <ErrorAlert message={errorMessage} />}
                </div>
                <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="mark" className='text-mainBlue'>Mark</label>
                        <input type={'number'} min='1' max='100' id="mark" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" placeholder='Enter student mark' value={updatedMark} onChange={(e) => setUpdatedMark(e.target.value)} />
                    </div>
                    <div>
                        <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={updatedStudent} onChange={(e) => setUpdatedStudent(e.target.value)} >
                            <option value="" >choose a student</option>
                            {students.map((student, key) => (
                                <option key={key} value={student.name}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={updatedSubject} onChange={(e) => setUpdatedSubject(e.target.value)} >
                            <option value="" >choose a subject</option>
                            {subjects.map((subject, key) => (
                                <option key={key} value={subject.name}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
