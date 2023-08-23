import { AiOutlineCloseCircle, AiOutlineDown } from 'react-icons/ai'
import './Body.css'
const Body = () => {
    return (
        <div className="body_content">
            <p className="content_desc">
                <b>Important</b>
                We have used an advance caching system. If you change anything in the admin panel, please, make sure to clear the cache from here. Setting

                <button className="btn_close">
                    <AiOutlineCloseCircle />
                </button>
            </p>
            <div className='content_right'>
                <div className="content_orderBy">
                    <ul className='orderBy_list'>
                        <p>Order By</p>
                        <li className='orderBy_item'>
                            <div className='custom_dropdown'>
                                <span>
                                    Date
                                    <AiOutlineDown size={14} className='icon_content' />
                                </span>
                            </div>
                            <div className='custom_dropdown'>
                                <span>
                                    DESC
                                    <AiOutlineDown size={14} className='icon_content' />
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div className="oderBy_search">
                        <form action="" className='search_input'>
                            <input type="text" placeholder='Search here' />
                            <button className='btn_primary'>Search</button>
                        </form>
                        <a href="/" className='link_orderBy'>
                            <span>Add Category</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body
