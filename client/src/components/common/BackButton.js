import { useLocation, useNavigate, useParams } from 'react-router-dom'

const BackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const weekId = useParams()

  const handleClick = () => {
    if (location.pathname === `/report/${weekId.week}`){
      navigate('/profile')
    } else {
      navigate('/days')
    }
  }

  return (
    <button className={location.pathname === '/teacher' ? 'back-button back-button-profile' : ((location.pathname === `/report/${weekId.week}` || location.pathname === '/profile') ? 'back-button back-button-overview' : 'back-button')} onClick={handleClick}>⬅Back</button>
  )
}

export default BackButton