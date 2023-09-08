import { AiOutlineCloseCircle, AiOutlineDown } from 'react-icons/ai'
import './Body.css'
import ProductRender from './Product/ProductRender'
import { NavLink } from 'react-router-dom'
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
                        <NavLink to={'/Add'} className='link_orderBy'>
                            Add Product
                        </NavLink>
                    </div>
                </div>
            </div>
            <ProductRender></ProductRender>
        </div>
    )
}

export default Body
