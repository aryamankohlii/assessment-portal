import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {getusers} from '../../service/userservice';
import { Link,useHistory } from 'react-router-dom'
import {useEffect,useState} from 'react'

const ResultPage = () => {
    const history = useHistory();
    const[userList,setuser]=useState([]);
    const[searchterm,setsearchterm] =useState("");
    
  
    const getuserlist = ()=>{
        getusers().then(response => response.json()
        .then(data=>{
          if(data.status==401)
          {
            history.push('/');
          }
          setuser(data);
        }),x=>{
        
        })
        
      }
  
      
      useEffect(()=>{
          getuserlist();
        },[])
  
        return(
            <>
            <SidebarComponent/>
            <div className="main-panel">
            <NavbarComponent pagetitle='Result Management '/>
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
                      <h4 className="card-title ">Following are the marks allotted to the students:-</h4>
                    </div>
                    <div className="col-md-6 text-right">
                    
                    
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
                              Candidate Name
                            </th >
                            <th className="text-center">
                              Email
                            </th >
                            <th className="text-center">
                              Marks
                            </th >
                           
                            
                           
                            <th className="text-center">
                              Action
                            </th >
                          </thead>
                          <tbody>
                            {
                               userList.length>0? userList.filter((val)=>{
                                 
                                    if(val.roleid==14){
                                     return val}}).map(item =>(
                                    <tr key={item.id}>
                                    <td className="text-center">{item.id}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">{item.email}</td>
                                    <td className="text-center">{item.marks}</td>
                                   
                                    
                                    
                                    <td className="text-center"> 
                                    <Link className="btn btn-primary" to={`/user/${item.id}`}>
                                        Edit
                                    </Link>
                                     
                                      </td>
                                    </tr>
                                )):
                                <tr>
                                <td colSpan="7" align="center">No record Found</td>
                              </tr>
                           }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Link className="btn btn-primary" to={`/dashboard`}>
                                    Go to Dashboard
                                </Link>
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
       
                        export default ResultPage;
                    
  
  