import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {useEffect,useState} from 'react'
import {getsubtrackByid,addUpdate} from '../../service/subtrackservice'
import {getActiveassesmentArea} from '../../service/assesmentAreaservice'
import { Link,useParams,useHistory } from 'react-router-dom'

const AddEditSubtrackPage = () => {
    
    const [subtrack,setSubtrackName]=useState({id:0,name:'',isactive:true,assesment_area_id:0});
    const [subtracknameerrorMessage,seterrorMessage]=useState('');
    const [message, setNotificationMessage] = useState('');
    const { id } = useParams();
    const history = useHistory();
    const[activeassesmentArea,setassesmentArea]=useState([]);


    const handleSubmit =()=>{
        seterrorMessage('');
        setNotificationMessage('');
        if(subtrack.name!="" && subtrack.assesment_area_id != 0)
        {
            console.log(subtrack);
            addUpdate(subtrack.id,subtrack.name,subtrack.isactive,subtrack.assesment_area_id).then(
                response => response.json()
                .then(d=>{
                if(d.status==200)
                {
                    if(subtrack.id!=0)
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
            seterrorMessage('Subtrack name and Assesment area cannot be left blank');
        }

    }

    const handlechange=(e)=>{
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setSubtrackName({...subtrack,[name]:value})
    }

    const getById=()=>{
        if(id && id!=0)
        {
            getsubtrackByid(id).then(
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
                            setSubtrackName(
                                    {
                                        id:data.id,
                                        name:data.name,
                                        isactive:data.isactive,
                                        assesment_area_id:data.assesment_area_id
                                    })
                        }
                       
                    })
            )
        }
    }

    const getActiveAssesmentArealist = ()=>{
        getActiveassesmentArea(1).then(response => response.json()
        .then(data=>{
           
          if(data.status==401)
          {
            history.push('/');
          }
          setassesmentArea(()=>{return data});
        }),x=>{
        
        })
        
    }

    useEffect(()=>{
        getById();
        getActiveAssesmentArealist();
    },[])
    

    return(
        <>
        <SidebarComponent/>
        <div className="main-panel">
        <NavbarComponent pagetitle='Subtrack Management'/>
        <div className="content">
        <div className="container-fluid">

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">
                  <Link className="" to="/subtrack" >
                  Subtrack
                 </Link> / <span className="small">Add new </span>
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
                                <label for="subtrack">Subtrack</label>
                                <input type="text" maxLength="15" name="name"
                                    className="form-control" 
                                    id="name"
                                    value={subtrack.name}
                                    onChange={handlechange}/>
                                
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input name='isactive' type="checkbox"  checked={subtrack.isactive}
                                    onChange={handlechange}/>&nbsp;Status</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="assesmentAreaId">Assesment Area</label>
                                <select  className="form-control" name="assesment_area_id"  value={subtrack.assesment_area_id}  onChange={handlechange}>
                                <option key="0" value="0">Select one
                                        </option>
                                {activeassesmentArea.map(({ id,name }) => (
                                   
                                        <option key={id} value={id} >{name}
                                        </option>
                                    
                                ))}
                                </select>
                                <div className="errormessage">{subtracknameerrorMessage}</div>
                            </div>
                            <div className="notifyMessage">{message}</div>
                            <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                          
                          &nbsp;<Link className="btn btn-secondary" to={`/subtrack`}>
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

export default AddEditSubtrackPage
