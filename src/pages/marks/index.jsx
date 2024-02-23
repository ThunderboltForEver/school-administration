import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteMark } from '../../redux/marksSlice';

export default function TeacherHome() {
  const marks = useSelector((state) => state.marks.marks);
  const subjects = useSelector((state) => state.subjects.subjects);
  const dispatch = useDispatch();
  const [subjectFilter, setSubjectFilter] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [bestTeacher, setBestTeacher] = useState(null);

  useEffect(() => {
    const teacherSubjectCounts = subjects.reduce((acc, subject) => {
      const count = marks.filter(mark => mark.subject === subject.name).length;
      acc[subject.teacher] = (acc[subject.teacher] || 0) + count;
      return acc;
    }, []);

    const best = Object.keys(teacherSubjectCounts).reduce((a, b) => teacherSubjectCounts[a] > teacherSubjectCounts[b] ? a : b, null);
    setBestTeacher(best);
  }, [marks, subjects]);

  const filteredMarks = marks.filter((mark) => {
    const subjectMatch = !subjectFilter || mark.subject === subjectFilter;
    const statusMatch =
      studentStatusFilter === 'All' ||
      (studentStatusFilter === 'passed' && mark.mark >= 50) ||
      (studentStatusFilter === 'failed' && mark.mark < 50);

    const studentMatch = !studentFilter || mark.student.toLowerCase().includes(studentFilter.toLowerCase());

    return subjectMatch && studentMatch && statusMatch;
  });

  const handleSubjectFilterChange = (event) => {
    setSubjectFilter(event.target.value);
    setStudentStatusFilter('All');
  };

  const handleStudentFilterChange = (event) => {
    setStudentStatusFilter('All');
    setStudentFilter(event.target.value);
    setSubjectFilter('');
  };

  const handleStatusFilterChange = (event) => {
    setStudentFilter('');
    setStudentStatusFilter(event.target.value);
    setSubjectFilter('');
  };

  return (
    <div className='flex flex-col gap-4 mx-auto'>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:items-center md:flex-wrap md:justify-between'>
        <NavLink
          to={'/marks/create'}
          className='w-fit p-[6px] border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none'
        >
          <span>Add new</span>
        </NavLink>
        <div className='flex gap-4 flex-col md:flex-row md:items-center max-w-full md:flex-wrap'>
          <label htmlFor='subjectFilter'>Filter by subject:</label>
          <select
            id='subjectFilter'
            value={subjectFilter}
            onChange={handleSubjectFilterChange}
            className='py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          >
            <option value=''>All</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
          <label htmlFor='studentFilter'>Filter by student:</label>
          <input
            type='text'
            id='studentFilter'
            value={studentFilter}
            onChange={handleStudentFilterChange}
            className='border h-8 p-2 rounded-md outline-none focus:outline-none'
            placeholder='Search student'
          />
          <label htmlFor='statusFilter'>Filter by status:</label>
          <select
            id='statusFilter'
            value={studentStatusFilter}
            onChange={handleStatusFilterChange}
            className='py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          >
            <option value='All'>All</option>
            <option value='passed'>Passed</option>
            <option value='failed'>Failed</option>
          </select>
        </div>
      </div>
      <div className='max-w-full overflow-x-auto'>
        <h2 className='mx-auto w-fit p-2 my-4 bg-mainGray'>Best Teacher:
          {filteredMarks.length > 0 && bestTeacher ? (
            bestTeacher
          ) : 'No best Teacher'}
        </h2>
        <table className='w-full font-bold'>
          <thead className='bg-[#F3F4F6] border-b text-mainBlue font-bold'>
            <tr>
              <th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
                N
              </th>
              <th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
                Mark
              </th>
              <th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
                Student
              </th>
              <th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
                Subject
              </th>
              <th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.map((mark) => (
              <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]' key={mark.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>{mark.id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>{mark.mark}</td>
                <td className='text-sm px-6 py-4 whitespace-nowrap'>{mark.student}</td>
                <td className='text-sm px-6 py-4 whitespace-nowrap'>{mark.subject}</td>
                <td className='text-sm px-6 py-4 whitespace-nowrap'>
                  <div className='flex gap-2'>
                    <NavLink to={`/marks/update/${mark.id}`} title='edit'>
                      <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                    </NavLink>
                    <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => dispatch(deleteMark({ id: mark.id }))} />
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
