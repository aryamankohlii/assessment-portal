import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {getroles} from '../../service/roleservice';
import { Link,useHistory } from 'react-router-dom'

import {useEffect,useState} from 'react'


const RolePage = () => {
  const history = useHistory();
  const[rolesList,setroles]=useState([]);
  const[searchterm,setsearchterm] =useState("");

    const getrolelist = ()=>{
      getroles().then(response => response.json()
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
        getrolelist();
    
      },[])


    return(
     
        <>
        <SidebarComponent/>
        <div className="main-panel">
        <NavbarComponent pagetitle='Role Management '/>
        <div className="content">
        <div className="container-fluid">
          <br></br>
          <div>
            <input type="text" placeholder="Search..." onChange={(event)=>{ setsearchterm(event.target.value);}}/>
          </div>

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">Roles List</h4>
                </div>
                <div className="col-md-6 text-right">
                <Link className="btn btn-secondary" to="/role/0" >
                  Add New
                 </Link>
                
                </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className=" text-primary">
                        <th className="text-center">
                          ID
                        </th>
                        <th className="text-center">
                          Role
                        </th >
                        <th className="text-center">
                          Status
                        </th>
                        <th className="text-center"> 
                          Action
                        </th>
                      
                      </thead>
                      <tbody>
                        {
                           
                           rolesList.length>0 ? rolesList.filter((val)=>{
                            if(searchterm==""){
                              return val}
                              else if(val.role.toLowerCase().includes(searchterm.toLowerCase())){
                                return val}}).map(item =>(
                                <tr key={item.id}>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">{item.role}</td>
                                <td className="text-center">{item.isactive==1?'Active':'Inactive'}</td>
                                <td className="text-center"> 
                                <Link className="btn btn-primary" to={`/role/${item.id}`}>
                                    Edit
                                </Link>
                                 
                                  </td>
                                </tr>
                            )):
                            <tr>
                              <td colSpan="4" align="center">No record Found</td>
                            </tr>
                       }
                      </tbody>
                    </table>
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

export default RolePage