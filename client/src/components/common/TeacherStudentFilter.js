const TeacherStudentFilter = (studentList, filters, setFilters) => {
  // const [studentList, setStudentList] = useState([])

  const handleChange = (e) => {
    const studentName = e.target.value
    const newFilters = { ...filters, student: studentName }
    setFilters(newFilters)
  }

  // const identifyStudent = () => {
  //   const newList = [...new Set(studentWork?.map(day => day.progress[0].owner.username))].sort()
  //   console.log('new list', newList)
  //   setStudentList(newList)
  // }

  return (
    <div className='filter'>
      <select name='filter-daily' id='filter-daily' value={filters.student} onChange={handleChange}>
        <option key='selectstudent' value='selectstudent'>Select a student</option>
        <option key='Lucy' value='Lucy'>Lucy</option>
        {studentList.length > 0 ?
          studentList.map((student) => {
            console.log('student', student)
            return <option key={student} value={student}>{student}</option>
          })
          :
          <option key='add' value='add'>Add your class</option>
        }
      </select>
    </div>
  )
}

export default TeacherStudentFilter