import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainSections from './Components/Sections/MainSections'
import { Home } from './pages/index'
import { Create, Update,StudentHome } from './pages/students/exports'
import { CreateTeacher, UpdateTeacher, TeachersHome } from './pages/teachers/exports';
import { CreateSubject, UpdateSubject, SubjectsHome } from './pages/subjects/exports';
import { CreateMark, MarksIndex, UpdateMark } from './pages/marks/exports'
import { ClassHome, CreateClass, UpdateClass } from './pages/classes/exports'

export default function App() {
    return (
        <BrowserRouter>
            <MainSections>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/students' element={<StudentHome />} />
                    <Route path='/students/create' element={<Create />} />
                    <Route path='/students/update/:id' element={<Update />} />
                    <Route path='/teachers' element={<TeachersHome />} />
                    <Route path='/teachers/create' element={<CreateTeacher />} />
                    <Route path='/teachers/update/:id' element={<UpdateTeacher />} />
                    <Route path='/subjects' element={<SubjectsHome />} />
                    <Route path='/subjects/create' element={<CreateSubject />} />
                    <Route path='/subjects/update/:id' element={<UpdateSubject />} />
                    <Route path='/classes' element={<ClassHome />} />
                    <Route path='/classes/create' element={<CreateClass />} />
                    <Route path='/classes/update/:id' element={<UpdateClass />} />
                    <Route path='/marks' element={<MarksIndex />}/>
                    <Route path='/marks/create' element={<CreateMark />}/>
                    <Route path='/marks/update/:id' element={<UpdateMark />}/>
   
                </Routes>
            </MainSections>
        </BrowserRouter>


    )
}

