import React, { useState ,useEffect} from 'react';
import { Link,useHistory } from 'react-router-dom'


const SidebarComponent = () => {
const history = useHistory();
//const[selectedMenu,setselectedmenu]=useState(window.location.pathname.replace("/",""));


const menuhandler=(e)=>{
  history.push('/'+e);
}

return(<>
<div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
     <div className="logo"><a href="#" className="simple-text logo-normal">
     <div class="logo_sidebar"><img src={'/logo6.png'} /></div>
       </a></div>
     <div className="sidebar-wrapper">
       <ul className="nav">
         <li className={window.location.pathname.indexOf('dashboard')>0?'nav-item active':'nav-item'} name="dashboard"  onClick={()=>menuhandler('dashboard')}>
           <Link className="nav-link" >
             <i className="material-icons">dashboard</i>
             <p>Dashboard</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('roles')>0?'nav-item active':'nav-item'} name="roles"  onClick={()=>menuhandler('roles')}>
           <Link className="nav-link" >
             <i className="material-icons">Role</i>
             <p>User Role</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('users')>0?'nav-item active':'nav-item'} name="users" onClick={()=>menuhandler('users')}>
           <Link className="nav-link" >
             <i className="material-icons">User</i>
             <p>Users</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('assesmentArea')>0?'nav-item active':'nav-item'} name="assesmentArea" onClick={()=>menuhandler('assesmentArea')}>
           <Link className="nav-link" >
             <i className="material-icons">Assesmentarea</i>
             <p>Assessment Area</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('subtrack')>0?'nav-item active':'nav-item'}  name="subtrack" onClick={()=>menuhandler('subtrack')}>
           <Link className="nav-link" >
             <i className="material-icons">Subtrack</i>
             <p>Subtrack</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('question')>0?'nav-item active':'nav-item'} name="question" onClick={()=>menuhandler('question')}>
           <Link className="nav-link" >
             <i className="material-icons">Question</i>
             <p>Questions</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('answer')>0?'nav-item active':'nav-item'} name="answer" onClick={()=>menuhandler('answer')}>
           <Link className="nav-link" >
             <i className="material-icons">Answer</i>
             <p>Answers</p>
           </Link>
         </li>
         <li className={window.location.pathname.indexOf('mark')>0?'nav-item active':'nav-item'} name="mark" onClick={()=>menuhandler('mark')}>
           <Link className="nav-link" >
             <i className="material-icons">Mark</i>
             <p>Marks</p>
           </Link>
         </li>
       </ul>
     </div>
   </div>
        </>
    )
}

export default SidebarComponent