import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMark } from '../../redux/marksSlice';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Create() {
    const navigate = useNavigate();
    const [mark, setMark] = useState('');
    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const students = useSelector((state) => state.students.students);
    const subjects = useSelector((state) => state.subjects.subjects);
    const marks = useSelector((state) => state.marks.marks);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!mark || !student || !subject) {
            setShowError(true);
            setErrorMessage('All fields are required');

            setTimeout(() => {
                setShowError(false);
            }, 5000);

            return;
        }

        dispatch(addMark({ id: marks.length + 1, mark, student, subject }));
        navigate('/marks');
    };

    return (
        <div>
            <div className='max-w-[750px] mx-auto'>
                <div className='h-12'>
                    {showError && <ErrorAlert message={errorMessage} />}
                </div>
                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="Marks" className='text-mainBlue'>Mark</label>
                        <input required type={'number'} min='1' max='100' id="Marks" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" placeholder='Enter student mark' value={mark} onChange={(e) => { setMark(e.target.value) }} />
                    </div>
                    <div>
                        <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setStudent(e.target.value) }} >
                            <option value="" >choose a student</option>
                            {students.map((student, key) => (
                                <option key={key} value={student.name}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setSubject(e.target.value) }} >
                            <option value="" >choose a subject</option>
                            {subjects.map((subject, key) => (
                                <option key={key} value={subject.name}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none" onClick={handleSubmit}>Add</button>
                    </div>
                </form>
            </div>
        </div >
    );
}
