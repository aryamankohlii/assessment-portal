import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {getassesmentArea} from '../../service/assesmentAreaservice';
import { Link,useHistory } from 'react-router-dom'

import {useEffect,useState} from 'react'

const AssesmentAreaPage = () =>{
    const history = useHistory();
    const[assesmentAreaList,setassesmentArea]=useState([]);
    const[searchterm,setsearchterm] =useState("");
    

    const getassesmentArealist = ()=>{
        getassesmentArea().then(response => response.json()
        .then(data=>{
          if(data.status==401)
          {
            history.push('/');
          }
          setassesmentArea(data);
        }),x=>{
        
        })
    }

    useEffect(()=>{
        getassesmentArealist();
      },[])

     

return(
    <>
    <SidebarComponent/>
    <div className="main-panel">
    <NavbarComponent pagetitle='Assessment Area Management'/>
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
              <h4 className="card-title ">Assessment Area List</h4>
            </div>
            <div className="col-md-6 text-right">
            <Link className="btn btn-secondary" to="/assesmentArea/0" >
              Add New
             </Link>
            
           
           
            </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
               
                <table className="table" >
                  <thead className=" text-primary">
                    <th className="text-center">
                      ID
                    </th>
                    <th className="text-center">
                      Assessment Area
                    </th >
                    <th className="text-center">
                      Status
                    </th >
                    {/* <th className="text-center">
                      Created By User
                    </th > */}
                    {/* <th className="text-center">
                      Private
                    </th > */}
                    <th className="text-center">
                      Rating-Range
                    </th >
                    <th className="text-center">
                      Action
                    </th >
                  </thead>
                  <tbody>
                    {
                 assesmentAreaList.length>0? assesmentAreaList.filter((val)=>{
                  if(searchterm==""){
                    return val}
                    else if(val.name.toLowerCase().includes(searchterm.toLowerCase())){
                      return val}}).map(item =>(
                            <tr key={item.id}>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.name}</td>
                            <td className="text-center">{item.isactive == 1?'Active':'Inactive'}</td>
                            {/* <td className="text-center">{item.username}</td> */}
                            {/* <td className="text-center">{item.isprivate == 1?'Yes':'No'}</td> */}
                            <td className="text-center">{item.minrate} - {item.maxrate}</td>
                            <td className="text-center"> 
                            <Link className="btn btn-primary" to={`/assesmentArea/${item.id}`}>
                                Edit
                            </Link>
                             
                              </td>
                            </tr>
                        ))
                        :
                        <tr>
                        <td colSpan="6" align="center">No record Found</td>
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

export default AssesmentAreaPage