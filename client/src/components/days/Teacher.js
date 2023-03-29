// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'




// const Teacher = () => {
//   return (
//     <>
//       <h1>teacher</h1>
//       <FontAwesomeIcon icon={icon({ name: 'user-secret' })} />
//       <FontAwesomeIcon icon={icon({ name: 'coffee', style: 'regular' })} /> 
//       <FontAwesomeIcon icon={icon({ name: 'coffee', family: 'sharp', style: 'solid' })} /> 
//       <FontAwesomeIcon icon={icon({ name: 'twitter', style: 'brands' })} /> 
//     </>
//   )
// }

// export default Teacher

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const Teacher = () => {

  return (
    <>
      <h1>icon page</h1>
      <div>
        <h3>How to use font-awesome in react</h3>
        {/* <FontAwesomeIcon icon={solid("bookmark")} /> */}
        <FontAwesomeIcon icon={faBookmark} />

      </div>
    </>
  )
}

export default Teacher