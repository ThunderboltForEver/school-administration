import { IoIosPeople, IoMdPeople } from 'react-icons/io'
import { ImBooks } from 'react-icons/im';
import { SiGoogleclassroom } from 'react-icons/si';
import { Box } from '../Components/exports';
import { BsBarChartLine } from 'react-icons/bs';
import TotalBox from '../Components/TotalBox/TotalBox';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const [Students, setStudents] = useState('');
  const [Teachers, setTeachers] = useState('');
  const [Subjects, setSubjects] = useState('');

  const students = useSelector((state) => state.students.students.length)
  const teachers = useSelector((state) => state.teachers.teachers.length)
  const subjects = useSelector((state) => state.subjects.subjects.length)

  useEffect(() => {
    setStudents(students)
    setTeachers(teachers)
    setSubjects(subjects)
  }, [])

  return (
    <div>
      <div className='grid grid-cols-3 max-[991px]:grid-cols-2 max-[991px]:gap-4 max-[550px]:grid-cols-1 gap-20 mb-10'>
        <TotalBox icon={<IoIosPeople />} total={Students} description="Total students" />
        <TotalBox icon={<IoMdPeople />} total={Teachers} description="Total teachers" />
        <TotalBox icon={<ImBooks />} total={Subjects} description="Total subjects" />
      </div>

      <div className='grid grid-cols-2 xl:grid-cols-boxesGrid max-sm:grid-cols-1  text-lg gap-6 '>
        <Box icon={<IoIosPeople />} description="Manage students" link="/students" />
        <Box icon={<IoMdPeople />} description="Manage Teachers" link="/teachers" />
        <Box icon={<ImBooks />} description="Manage Subjects" link="/subjects" />
        <Box icon={<SiGoogleclassroom />} description="Manage Classes" link="/classes" />
        <Box icon={<BsBarChartLine />} description="Manage Marks" link="/marks" />

      </div>
    </div>
  )
}
