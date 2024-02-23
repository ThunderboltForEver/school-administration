import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteClass } from '../../redux/classesSlice';

export default function TeacherHome() {
  const classes = useSelector((state) => state.classes.classes);
  const dispatch = useDispatch();

  return (
    <div className='container mx-auto'>
      <NavLink to={'/classes/create'} className="w-fit p-2 border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">
        <span>Add new</span>
      </NavLink>

      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto font-bold">
          <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
            <tr>
              <th className="text-sm font-medium px-2 py-4 md:px-6">N</th>
              <th className="text-sm font-medium px-2 py-4 md:px-6">Class</th>
              <th className="text-sm font-medium px-2 py-4 md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((clas) => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={clas.id}>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm font-medium text-center">{clas.id}</td>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm font-medium text-center">{clas.className}</td>
                <td className="px-2 py-4 md:px-6 whitespace-nowrap text-sm text-center">
                  <div className='flex gap-2 justify-center'>
                    <NavLink to={`/classes/update/${clas.id}`} title='edit'>
                      <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                    </NavLink>
                    <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => dispatch(deleteClass({ id: clas.id }))} />
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
