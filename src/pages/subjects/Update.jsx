import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateSubject } from '../../redux/subjectsSlice';

export default function Update() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const subjects = useSelector((state) => state.subjects.subjects);
    const teachers = useSelector((state) => state.teachers.teachers);
    const oldSubjectInfo = subjects.find((subject) => subject.id == id);
    const { name: oldName, teacher: oldTeacher } = oldSubjectInfo;

    const [updatedName, setUpdatedName] = useState(oldName);
    const [updatedTeacher, setUpdatedTeacher] = useState(oldTeacher);

    const handleUpdateSubject = (e) => {
        e.preventDefault();
        dispatch(updateSubject({ id, name: updatedName, teacher: updatedTeacher }));
        navigate('/subjects');
    }

    return (
        <div>
            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={handleUpdateSubject}>
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required type={'text'} value={updatedName} onChange={(e) => { setUpdatedName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={updatedTeacher} onChange={(e) => { setUpdatedTeacher(e.target.value) }}>
                        <option value="">Choose a teacher</option>
                        {teachers.map((teacher, key) => (
                            <option key={key} value={teacher.name}>{teacher.name}</option>
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
