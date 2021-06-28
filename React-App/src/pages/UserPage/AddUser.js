import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {useEffect,useState} from 'react'
import { Link,useParams,useHistory } from 'react-router-dom'
import {getuserByid,AddUpdate} from '../../service/userservice'
import {getActiveRoles} from '../../service/roleservice'

const AddEditUserPage = () =>{

    const [user,setUser]=useState({
        id:0,
        name:'',
        email:'',
        password:'',
        isEmailVerified:0,
        isActive:true,
        roleid:0
    });

    const [Validateuser,setValidation]=useState({
        name:'',
        email:'',
        password:''
    });

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );

    const[roles,setroles]=useState([]);
   
    const [message, setNotificationMessage] = useState('');
    const { id } = useParams();
    const history = useHistory();

    const handleSubmit =()=>{
        setNotificationMessage("");
        if(Validateuser.name =="" && Validateuser.email=="" && Validateuser.password=="")
        {
            
            AddUpdate(user.id,user.name,user.email,user.password,user.isEmailVerified,user.isActive,user.roleid).
            then(r=>r.json().then(d=>{
                if(d.status==200)
                {
                    if(user.id!=0)
                    {
                        setNotificationMessage('Record update successfully');
                    }
                    else
                    {
                        setNotificationMessage('Record saved successfully');
                    }
                }
            }))
        }
    }

    const handlechange=(e)=>{
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        switch (name) {
            case 'name': 
            Validateuser.name = 
                value.length < 5
                  ? 'Name must be at least 5 characters long!'
                  : '';
              break;
            case 'email': 
            Validateuser.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'password': 
            Validateuser.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
        setUser({...user,[name]:value})
    }

    const getById=()=>{
        if(id && id!=0)
        {
            getuserByid(id).then(
                    response => response.json()
                    .then(data=>{
                        if(data.status=='401')
                        {
                            setNotificationMessage('Session expired..!')
                            setTimeout(() => {
                                history.push('/')
                            }, 3000);
                        }
                        else
                        {
                            setUser(
                                    {
                                        id:data.id,
                                        name:data.name,
                                        email:data.email,
                                        password:data.password,
                                        isEmailVerified:data.isEmailVerified,
                                        isActive:data.isActive,
                                        roleid:data.roleid
                                    }
                                    
                                    )
                        }
                       
                    })
            )
        }
    }
   
    const getrolelist = ()=>{
        getActiveRoles(1).then(response => response.json()
        .then(data=>{
           
          if(data.status==401)
          {
            history.push('/');
          }
          setroles(()=>{return data});
        }),x=>{
        
        })
        
      }
  
    useEffect(()=>{
        getById();
        getrolelist();
      
    },[])

    return (
        <>
        <SidebarComponent/>
        <div className="main-panel">
        <NavbarComponent pagetitle='User Management'/>
        <div className="content">
        <div className="container-fluid">

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">
                  <Link className="" to="/users" >
                 Users  
                 </Link> / <span className="small">Add new user</span>
                   </h4>
                </div>
                <div className="col-md-6 text-right">
                    Hello &nbsp;
              {user.name}
                </div>
                  </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6"> 
                            <div className="form-group">
                                <label for="user">Username</label>
                                <input maxLength='20' required type="text" maxLength="60"
                                    name="name"
                                    className="form-control" 
                                    id="user"
                                    value={user.name}
                                    onChange={handlechange}
                                    />
                                <div className="errormessage">{Validateuser.name}</div> 
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input  type="email" maxLength="80" name="email"
                                    className="form-control" 
                                    id="email"
                                    value={user.email}
                                    onChange={handlechange}
                                    />
                                <div className="errormessage">{Validateuser.email}</div> 
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input required maxLength='12' type="text" maxLength="20" name="password"
                                    className="form-control" 
                                    id="password"
                                    value={user.password}
                                    onChange={handlechange}
                                    />
                               <div className="errormessage">{Validateuser.password}</div> 
                            </div>
                            <div className="form-group">
                                <label for="roles">Roles</label>
                                <select  className="form-control" name="roleid"  onChange={handlechange}>
                                {roles.map(({ id, role }) => (
                                   
                                        <option key={id} value={id}>{role}
                                        </option>
                                    
                                ))}
                                </select>
                               
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='isActive' type="checkbox"  
                                    checked={user.isActive}
                                    onChange={handlechange}
                                    />&nbsp;Status</label>
                                </div>
                            </div>
                            <div className="notifyMessage">{message}</div>
                            <button type="Submit" className="btn btn-primary" 
                            onClick={()=>handleSubmit()}
                            >Submit</button>
                          
                          &nbsp;<Link className="btn btn-secondary" to={`/users`}>
                                    Back
                                </Link>
                        </div>
                        </div>
                    </div>
              </div>
            </div>
         
       
       
        </div>
        </div>
        
        
        <FooterComponent/>
        </div>
       
        </>
        
    )
}

export default AddEditUserPage