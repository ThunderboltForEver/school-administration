import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteStudent } from '../../redux/studentsSlice';

export default function StudentHome() {
    const studentsData = useSelector((state) => state.students.students);
    const [searchQuery, setSearchQuery] = useState('');
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setFirstDate('');
        setSecondDate('');
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleFirstDateChange = (e) => {
        setSearchQuery('');
        setFirstDate(e.target.value);
    };

    const handleSecondDateChange = (e) => {
        setSearchQuery('');
        setSecondDate(e.target.value);
    };

    const filteredStudents = studentsData.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery);
        const isWithinDateRange = (firstDate && secondDate) ?
            (student.birthday >= firstDate && student.birthday <= secondDate) :
            true;
        return matchesSearch && isWithinDateRange;
    });

    return (
        <div className='container flex flex-col gap-4 mx-auto w-screen md:w-full'>
            <div className='flex justify-between flex-wrap flex-col-reverse gap-4 md:flex-row'>
                <NavLink to={'/students/create'} className="w-fit p-[6px] self-start border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">
                    <span>Add new</span>
                </NavLink>
                <div className='flex flex-col gap-4 md:flex-row'>
                    <div className='mr-4'>
                        <span className='mr-2'>Filter by name:</span>
                        <input type="text" className="border py-2 px-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={searchQuery} onChange={handleSearchChange} />
                    </div>
                    <div className='flex gap-4'>
                        <span className='self-center'>Dates between:</span>
                        <div>
                            <input type="date" className="border py-2 px-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={firstDate} onChange={handleFirstDateChange} />
                            <input type="date" className="border py-2 px-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={secondDate} onChange={handleSecondDateChange} />
                        </div>

                    </div>
                </div>
            </div>
            <div className="overflow-x-auto max-w-full">
                <table className="min-w-full w-full font-bold">
                    <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
                        <tr>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                N
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Birthday
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Address
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Image
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Class
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.name}</td>
                                <td className="text-sm px-6 py-4 whitespace-nowrap">{student.birthday}</td>
                                <td className="text-sm px-6 py-4 whitespace-nowrap">{student.address}</td>
                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                    <img src={student.image} alt="" className='w-12 h-12 rounded-[50%]' />
                                </td>
                                <td className="text-sm px-6 py-4 whitespace-nowrap">{student.clas}</td>
                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                    <div className='flex gap-2'>
                                        <NavLink to={`/students/update/${student.id}`} title='edit'>
                                            <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                                        </NavLink>
                                        <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => dispatch(deleteStudent({ id: student.id }))} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
