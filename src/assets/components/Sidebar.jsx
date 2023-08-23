import { LuLayoutDashboard } from 'react-icons/lu'
import { AiOutlineDown, AiOutlineInbox } from 'react-icons/ai'
import { FiInbox } from 'react-icons/fi'
import { CiPercent } from 'react-icons/ci'
import { RiHandbagLine } from 'react-icons/ri'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCollections } from 'react-icons/md'
import { TbReceiptTax } from 'react-icons/tb'
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div className='content_sidebar'>
            <ul className='sidebar_list'>
                <li className='list_item'>
                    <a href="/"> <LuLayoutDashboard />
                        <span> Dashboard</span>
                    </a>

                </li>
                <li className='list_item'>
                    <a href="/"> <FiInbox />
                        <span className='grow'>
                            <span>Product</span>
                            <AiOutlineDown />
                        </span>
                    </a>
                    <ul className='list_item_child'>
                        <li className='child_item'>
                            <a href="/">
                                <BiCategory />
                                <span>Categories</span>
                            </a>
                        </li>
                        <li className='child_item'>
                            <a href="/">
                                <AiOutlineInbox />
                                <span>Sub Category</span>
                            </a>
                        </li>
                        <li className='child_item'>
                            <a href="/">
                                <MdOutlineCollections />
                                <span>Collections</span>
                            </a>
                        </li>
                        <li className='child_item'>
                            <a href="/">
                                <TbReceiptTax />
                                <span>Tax Rules</span>
                            </a>
                        </li>
                        <li className='child_item'>
                            <a href="/">
                                <AiOutlineInbox />
                                <span>Product</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className='list_item'>
                    <a href="/">
                        <CiPercent />
                        <span className='grow'>
                            <span>Flash Sales</span>
                        </span>
                    </a>
                </li>
                <li className='list_item'>
                    <a href="/">
                        <RiHandbagLine />
                        <span className='grow'>
                            <span>Orders</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
