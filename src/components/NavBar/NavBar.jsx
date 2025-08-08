import { Link } from 'react-router-dom'
import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg'

const NavBar = (props) => {

  return (
    <nav className={styles.container}>
        <Link to='/'><img src={Logo} alt="A cute owl" /></Link>
        {props.user && (
          <ul>
            <li>Welcome {props.user.username}</li>
          </ul>
        )}
        
    <ul>
      <li><Link to="/"> Home </Link></li>
      <li><Link to="/hoots"> Hoots </Link></li>
      
    {props.user ? (
      <>
        <li><Link to='/hoots/new'>New Hoot</Link></li>
        <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
      </>
      ) : (
        <>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </>
        ) }
      </ul>
  </nav>
  )
}

export default NavBar 