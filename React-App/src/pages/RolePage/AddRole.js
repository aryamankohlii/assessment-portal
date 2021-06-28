import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {useEffect,useState} from 'react'
import {getrolesByid,AddUpdate} from '../../service/roleservice'
import { Link,useParams,useHistory } from 'react-router-dom'

const AddEditPage = () => {
    
    const [role,setRoleName]=useState({id:0,role:'',isactive:true});
    const [rolenameerrorMessage,seterrorMessage]=useState('');
    const [message, setNotificationMessage] = useState('');
    const { id } = useParams();
    const history = useHistory();

    const handleSubmit =()=>{
        seterrorMessage('');
        setNotificationMessage('');
        if(role.role!="")
        {
          
            AddUpdate(role.id,role.role,role.isactive).then     (
                response => response.json()
                .then(d=>{
                if(d.status==200)
                {
                    if(role.id!=0)
                    {
                        seterrorMessage('Record update successfully');
                    }
                    else
                    {
                        seterrorMessage('Record saved successfully');
                    }
                }
            }))
        }
        else
        {
            seterrorMessage('Role name cannot be left blank');
        }

    }

    const handlechange=(e)=>{
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRoleName({...role,[name]:value})
    }

    const getById=()=>{
        if(id && id!=0)
        {
            getrolesByid(id).then(
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
                            setRoleName(
                                    {
                                        id:data.id,
                                        role:data.role,
                                        isactive:data.isactive
                                    })
                        }
                       
                    })
            )
        }
    }

    useEffect(()=>{
        getById();
    },[])
    

    return(
        <>
        <SidebarComponent/>
        <div className="main-panel">
        <NavbarComponent pagetitle='Role Management'/>
        <div className="content">
        <div className="container-fluid">

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">
                  <Link className="" to="/roles" >
                 Roles
                 </Link> / <span className="small">Add new role</span>
                   </h4>
                </div>
                <div className="col-md-6 text-right">
              
                </div>
                  </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6"> 
                            <div className="form-group">
                                <label for="role">Role</label>
                                <input type="text" maxLength="15" name="role"
                                    className="form-control" 
                                    id="role"
                                    value={role.role}
                                    onChange={handlechange}/>
                                <div className="errormessage">{rolenameerrorMessage}</div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='isactive' type="checkbox"  checked={role.isactive}
                                    onChange={handlechange}/>&nbsp;Status</label>
                                </div>
                            </div>
                            <div className="notifyMessage">{message}</div>
                            <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                          
                          &nbsp;<Link className="btn btn-secondary" to={`/roles`}>
                                    Back
                                </Link>
                        </div>
                        </div>
                    </div>
              </div>
            </div>
         
       
        {/* <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
            
        </div>
        </div> */}
        </div>
        </div>
        
        
        <FooterComponent/>
        </div>
       
        </>
       
       )}

export default AddEditPage
