import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
const Header = () => {
  return (
    <p
      style={{color:"#E8C1C5",fontSize:'4.5rem'}}
      className="h-1/5 sm:h-1/3 flex gap-2 items-center justify-center font-bold">
        <FontAwesomeIcon icon={faLink} />
        Wallet
    </p>
  )
}

export default Header
