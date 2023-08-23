import './Header.css'
import { AiOutlineMenu, AiOutlineDown, AiOutlineMail, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
const Header = () => {
    return (
        <div className="container_header">
            <div className="header_logo">
                <button className='btn_menu'>
                    <AiOutlineMenu />
                </button>
                <a href="/" className='link_logo'>
                    <img src="https://bizweb.dktcdn.net/100/191/458/themes/802014/assets/logo.png?1676015117086" alt="" />
                </a>
            </div>
            <div className="header_nav">
                <button className='btn_clear'>
                    <span>Clear cache</span>
                </button>
                <div className="nav_info">
                    <div className="nav_language">
                        <span>English <AiOutlineDown size={12} className='icon' /></span>
                    </div>
                    <div className="nav_message">
                        <button>
                            <AiOutlineMail className='icon' />
                            <span>Message
                                0
                            </span>
                        </button>
                    </div>
                    <div className="nav_right_menu">
                        <button><AiOutlineUser className='icon' /> Profile</button>
                        <button><AiOutlineLogout className='icon' /> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
