import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addSubject } from '../../redux/subjectsSlice';

export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState('');

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers);
    const subjects = useSelector((state) => state.subjects.subjects);

    return (
        <div>

            <div className="max-w-[750px] mx-auto flex flex-col gap-4"  >
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required placeholder="Enter subject name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setTeacher(e.target.value) }} >
                        <option value="" >choose a teacher</option>

                        {

                            teachers.length > 0 &&
                            (

                                teachers.map((teacher, key) => (
                                    <option key={key} value={teacher.name}>{teacher.name}</option>

                                ))

                            )


                        }
                    </select>
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none" onClick={() => { dispatch(addSubject({ id: subjects.length + 1, name,teacher }));navigate('/subjects') }}>Add</button>
                </div>

            </div>

        </div >
    )
}
