import './header.scss'
import Menu from "../../assets/lottie/menuLottie.tsx";
import Back from '../../assets/lottie/backLottie.tsx'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
export default function Header(){
    const navigate = useNavigate();
    const [open,setOpen] = useState(false)
    const menuList = [{
        name:'Home',
        link:'/',
    },{
        name:'About',
        link:'/'
    }]
    const handleClick = ()=>{
        setOpen(!open);
    }
    document.addEventListener('scroll', ()=>{
        open && setOpen(false);
    });
    return(
        <>
            <header className="header">
                <div className="back btn" onClick={()=>setTimeout(()=>navigate(-1),300)}>
                    <Back/>
                </div>
                <div className="menu btn">
                    <Menu open={open} handleClick={handleClick}/>
                </div>
                <ul className={open ? 'active' : ''}>
                    {menuList.map((i,inx)=>{
                        return <li key={inx} onClick={()=>{navigate(i.link);setOpen(false)}}>{i.name}</li>
                    })}
                </ul>
            </header>
            {/*<Outlet/>*/}
        </>
    )
}

