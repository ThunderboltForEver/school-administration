import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteSubject } from '../../redux/subjectsSlice';

export default function SubjectHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const subjects = useSelector((state) => state.subjects.subjects);
  const dispatch = useDispatch();
  const filteredSubjects = subjects.filter((subject) => {
    const subjectNameIncludesQuery = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const teacherNameIncludesQuery = subject.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return subjectNameIncludesQuery || teacherNameIncludesQuery;
  });

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-start gap-4 flex-col-reverse md:flex-row md:items-center'>
        <NavLink to={'/subjects/create'} className="p-2 border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">
          <span>Add new</span>
        </NavLink>
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mt-2 md:mt-0">Search by subject or teacher:</label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto font-bold">
          <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
            <tr>
              <th className="text-sm font-medium px-2 py-4 md:px-6">N</th>
              <th className="text-sm font-medium px-2 py-4 md:px-6">Name</th>
              <th className="text-sm font-medium px-2 py-4 md:px-6">Teacher</th>
              <th className="text-sm font-medium px-2 py-4 md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={subject.id}>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm font-medium text-center">{subject.id}</td>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm font-medium text-center">{subject.name}</td>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm font-medium text-center">{subject.teacher}</td>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm text-center">
                  <div className='flex gap-2 justify-center'>
                    <NavLink to={`/subjects/update/${subject.id}`} title='edit'>
                      <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                    </NavLink>
                    <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => dispatch(deleteSubject({ id: subject.id }))} />
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
