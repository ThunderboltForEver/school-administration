import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import { deleteTeacher } from '../../redux/teachersSlice';

export default function TeacherHome() {
  const [search, setSearch] = useState('');
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();

  return (
    <div className='container flex flex-col mx-auto gap-4'>
      <div className='flex justify-between flex-col-reverse md:flex-row items-start gap-4 '>
        <NavLink to={'/teachers/create'} className="p-2 border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">
          <span>Add new</span>
        </NavLink>
        <div className='flex gap-2 items-center flex-col'>
          <label>Search by name or address:</label>
          <input
            type="search"
            className='border h-8 p-2 rounded-md outline-none focus:outline-none'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto font-bold">
          <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
            <tr>
              <th className="hidden md:table-cell text-sm font-medium px-6 py-4 text-left">N</th>
              <th className="text-sm font-medium px-2 md:px-6 py-4 text-left">Name</th>
              <th className="text-sm font-medium px-2 md:px-6 py-4 text-left">Birthday</th>
              <th className="text-sm font-medium px-2 md:px-6 py-4 text-left">Address</th>
              <th className="text-sm font-medium px-2 md:px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers
              .filter((teacher) => {
                const nameMatch = teacher.name.toLowerCase().includes(search);
                const addressMatch = teacher.address.toLowerCase().includes(search);
                return nameMatch || addressMatch;
              })
              .map((teacher, index) => (
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={teacher.id}>
                  <td className="hidden md:table-cell px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium">{teacher.id}</td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium">{teacher.name}</td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm">{teacher.birthday}</td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm">{teacher.address}</td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm">
                    <div className='flex gap-2'>
                      <NavLink to={`/teachers/update/${teacher.id}`} title='edit'>
                        <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                      </NavLink>
                      <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => dispatch(deleteTeacher({ id: teacher.id }))} />
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
