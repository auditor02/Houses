import { useNavigate, useLocation } from "react-router-dom"
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonalOutlineIcon} from '../assets/svg/personOutlineIcon.svg'


export default function Navbar() {
    
    const navigate = useNavigate()
    const location = useLocation() 


    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
            <li className="navbarListItem"
                onClick={() => navigate('/')}> 
                <ExploreIcon fill={pathMatchRoute('/') ? '#2c2d2d' :
                '#8f8f8f'} width='30px'
                 height='30px' />
                 <p
                 className={pathMatchRoute('/')
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                 >
                    Explore</p>
            </li>
            <li className="navbarListItem"
                onClick={() => navigate('/offers')}>
                <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2d2d' :
                '#8f8f8f'} width='30px'
                 height='30px' />
                 <p
                 className={pathMatchRoute('/offers')
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                 >
                    Offer</p>
            </li>
            <li className="navbarListItem"
                onClick={() => navigate('/profile')}>
                <PersonalOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2d2d' :
                '#8f8f8f'} width='30px'
                 height='30px' />
                 <p
                 className={pathMatchRoute('/profile')
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                 >
                    Profile</p>
            </li>
        </ul>
      </nav>
    </footer>
  )
};
