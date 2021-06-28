import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {useEffect,useState} from 'react'
import { Link,useParams,useHistory } from 'react-router-dom'
import {getassesmentAreaByid,AddUpdate} from '../../service/assesmentAreaservice'

const AddEditAssesmentPage = () =>{
   
    const [assesmentArea,setAssesmentAreaName]=useState(
            {
                id:0,
                name:'',
                isactive:true,
                isprivate:false,
                minrate:1,
                maxrate:5,
                comment: "",
                commentenable:true,
                imageupload:true
            });
        
            const [ValidateassesmentArea,setValidation]=useState({
                name:''
            });
        

    
    const [message, setNotificationMessage] = useState('')
    const { id } = useParams();
    const history = useHistory();

    const handleSubmit =()=>{
        setNotificationMessage('');
        if(ValidateassesmentArea.name=="")
        {
            AddUpdate(assesmentArea).then(
                response => response.json()
                .then(d=>{
                if(d.status==200)
                {
                    if(assesmentArea.id!=0)
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
        else
        {
            setNotificationMessage('Assesment Area name cannot be left blank');
        }

    }

    const handlechange=(e)=>{
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        switch (name) {
            case 'name': 
            ValidateassesmentArea.name = 
                value.length < 5
                  ? 'Name must be at least 5 characters long!'
                  : '';
              break;
        }
        setAssesmentAreaName({...assesmentArea,[name]:value})

    }

    const getById=()=>{
        if(id && id!=0)
        {
            getassesmentAreaByid(id).then(
                    response => response.json()
                    .then(data=>{
                        if(data.status=='401')
                        {
                            //setNotificationMessage('Session expired..!')
                            setTimeout(() => {
                                history.push('/')
                            }, 3000);
                        }
                        else
                        {
                            setAssesmentAreaName(
                                    {
                                        id:data.id,
                                        name:data.name,
                                        isactive:data.isactive,
                                        isprivate:data.isprivate,
                                        minrate:data.minrate,
                                        maxrate:data.maxrate,
                                        comment:data.comment,
                                        commentenable:data.commentenable,
                                        imageupload:data.imageupload
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
        <NavbarComponent pagetitle='Assesment Area Management'/>
        <div className="content">
        <div className="container-fluid">

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">
                  <Link className="" to="/assesmentArea" >
                 Assesment Area
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
                                <label for="AssesmentArea">Assesment Area</label>
                                
                                <input type="text" maxLength="60"
                                     name="name"
                                    className="form-control" 
                                    value={assesmentArea.name}
                                    onChange={handlechange}
                                    />
                                    <div className="errormessage">{ValidateassesmentArea.name}</div> 
                                 
                            </div>
                            <div className="form-group">
                                    <label for="direction">Best Practices</label>

                                    <input type="text" maxLength="500"
                                        name="comment"
                                        className="form-control" 
                                        value={assesmentArea.comment}
                                        onChange={handlechange}
                                        />
                                    <div className="errormessage"></div> 
                                    
                            </div>
                            <div className="form-group">
                                <label for="minrate">Minimum Rate</label>
                                
                                <input type="text" maxLength="5"
                                     name="minrate"
                                    className="form-control" 
                                    value={assesmentArea.minrate}
                                    onChange={handlechange}
                                    />
                                 
                            </div>
                            <div className="form-group">
                                <label for="maxrate">Maximum Rate</label>
                                
                                <input type="text" maxLength="5"
                                     name="maxrate"
                                    className="form-control" 
                                    value={assesmentArea.maxrate}
                                    onChange={handlechange}
                                    />
                                     
                                 
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input name='isactive' type="checkbox"  checked={assesmentArea.isactive}
                                    onChange={handlechange}/>&nbsp;Status
                                    </label>
                                </div>

                            </div>

                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='commentenable' type="checkbox"  
                                    checked={assesmentArea.commentenable}
                                    onChange={handlechange}
                                    />&nbsp;Enable comment</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='imageupload' type="checkbox"  
                                    checked={assesmentArea.imageupload}
                                    onChange={handlechange}
                                    />&nbsp;Can upload Image</label>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input name='isprivate' type="checkbox"  checked={assesmentArea.isprivate}
                                    onChange={handlechange}/>&nbsp;Private
                                    </label>
                                </div>
                            </div> */}
                            <div className="notifyMessage">
                                {message}
                                </div>
                            <button  className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                          
                          &nbsp;<Link className="btn btn-secondary" to={`/assesmentArea`}>
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
       
       )
}
export default AddEditAssesmentPage