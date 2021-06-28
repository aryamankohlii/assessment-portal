import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {useEffect,useState} from 'react'
import { Link,useParams,useHistory } from 'react-router-dom'
import {getActiveassesmentArea} from '../../service/assesmentAreaservice'
import {getsubtrackByAssesmentid} from '../../service/subtrackservice'
import {getQuestionsById,saveQuestions,updateQuestion} from '../../service/questionanswereservice'


const AddQuestion = () =>{

    const [question,setQuestion]=useState(
        {
            id: 0,
            questiontext: "",
            controllid: 1,
            isactive: 1,
            score: 0,
            minrate: 1,
            maxrate: 5,
            subtrackid: 0,
            subtrack: "",
            assesment_area_id: 0,
            assesmentarea: "",
            comment: "",
            commentenable:true,
            imageupload:true
        });

   
const [assesmentArea,setassesmentArea]=useState([]);

const [subtrack,setsubTrack]=useState([]);

        
    const [ValidateQuestion,setValidation]=useState({
        questionText: "",
        rate:"",
        comment:"",
        assesment_area_id:"",
        subtrackid:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        option5:"",
        option6:"",
    });

    const [message, setNotificationMessage] = useState('')

    const [warningmessage,setWarningMessage]=useState('You have not selected any subtrack.')

    const { Qid } = useParams();
    const history = useHistory();
           
    const getActiveAssesmentArealist = ()=>{
   
        getActiveassesmentArea(1).then(response => response.json()
        .then(data=>{
            setassesmentArea(()=>{return data});
        }),x=>{
        
        })
        
    }

    const getActiveSubtrack = (assesment_area_id)=>{
        //getsubtrackByAssesmentid
        setsubTrack([])
            getsubtrackByAssesmentid(assesment_area_id).then(response => response.json()
            .then(data=>{
                let x = {id:0,name:'Select one',isactive:true,assesment_area_id:0}
                let subtrackData=[];
                subtrackData.push(x);
                if(data && data.length>0)
                {
                  
                   data.forEach(e=>{
                     x={}
                       x.id=e.id;
                       x.assesment_area_id=e.assesment_area_id;
                       x.name=e.name;
                       subtrackData.push(x);
                    })
                    setsubTrack(()=>{return subtrackData});
                }
                else
                {
                    setsubTrack(()=>{return [{
                        id:0,name:'Select one',isactive:true,assesment_area_id:0
                    }]});
                }
            }),x=>{
            
            })
    }
    
   

    const handleSubmit =()=>{
        ValidateQuestion.assesment_area_id="";
     
        setNotificationMessage('')
     if(question.questiontext!="" && question.assesment_area_id!="0" && question.subtrackid != "0")
     {
       
      
        if(Qid>0)
        {
            updateQuestion(question).then(
                response => response.json()
                .then(d=>{
                  
                if(d.status==200)
                {
                    if(question.id!=0)
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
        else{
            saveQuestions(question).then(
                response => response.json()
                .then(d=>{
                  
                if(d.status==200)
                {
                    if(question.id!=0)
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
    else{
        setNotificationMessage("Questiontext,Assessment and subtrack are required ")
        
        
    }
    }

        

    const handlechange=(e)=>{
        
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        switch (name) {
            case 'questiontext': 
            ValidateQuestion.questionText = 
                value.length < 50
                  ? 'Question should be atleast 50 char in length.'
                  : '';
              break;
              case 'assesment_area_id': 
              ValidateQuestion.assesment_area_id = 
                  value =="0"
                    ? 'Please choose a assesment area.'
                    : '';
                break;
            case 'subtrackid': 
                setWarningMessage("");
                break;
                
                
        }
        if(name=="assesment_area_id")
        {
            getActiveSubtrack(value)
        }
       
        setQuestion({...question,[name]:value})
        

    }

  

    const getById=()=>{
        if(Qid && Qid!=0)
        {
            getQuestionsById(Qid).then(
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
                           let Questionobj={
                            id: data.id,
                            questiontext: data.questiontext,
                            controllid: 0,
                            isactive: data.isactive,
                            score: data.score,
                            minrate: data.minrate,
                            maxrate: data.maxrate,
                            subtrackid: data.subtrackid,
                            subtrack: data.subtrack,
                            assesment_area_id: data.assesment_area_id,
                            assesmentarea: data.assesmentarea,
                            comment: data.comment,
                            commentenable: data.commentenable,
                            imageupload: data.imageupload,
                           }
                           getActiveSubtrack(Questionobj.assesment_area_id);
                           
                           if(question.subtrackid == 0){
                            setWarningMessage("You haven't selected any subtrack.");
                           }
                           setQuestion(()=>{
                            return  Questionobj;
                          })
                        }
                       
                    })
            )
        }
    }

    useEffect(()=>{
        //GetAnswersByQuestionId();
        getById();
        getActiveAssesmentArealist();
       
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
                  <Link className="" to="/question" >
                 Question
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
                                    <label for="question">Question</label>
                                    <textarea name="questiontext"
                                        className="form-control" 
                                        value={question.questiontext}
                                        onChange={handlechange}
                                    ></textarea>
                                    <div className="errormessage">{ValidateQuestion.questionText}</div> 
                                    
                            </div>

                            <div className="form-group">
                                    <label for="direction">Enter any additional comment</label>

                                    <input type="text" maxLength="500"
                                        name="comment"
                                        className="form-control" 
                                        value={question.comment}
                                        onChange={handlechange}
                                        />
                                    <div className="errormessage"></div> 
                                    
                            </div>

                            <div className="form-group">
                                    <label for="assesmentAreaId">Assesment Area</label>
                                    <select  className="form-control" name="assesment_area_id"  value={question.assesment_area_id}  onChange={handlechange}>
                                    <option key="0" value="0">Select one
                                            </option>
                                    {assesmentArea.map(({ id,name }) => (
                                    
                                            <option key={id} value={id} >{name}
                                            </option>
                                        
                                    ))}
                                    </select>
                                    <div className="errormessage">{ValidateQuestion.assesment_area_id}</div>
                                </div>

                            <div className="form-group">
                                <label for="subtrackid">Subtrack</label>
                                <select  className="form-control" name="subtrackid"  value={question.subtrackid}  onChange={handlechange}>
                                {subtrack.map(({ id,name }) => (
                                   
                                        <option key={id} value={id} >{name}
                                        </option>
                                    
                                ))}
                                </select>
                                <br></br>
                                <div className="errormessage">{warningmessage}</div>
                            </div>
                        
                        </div>
                        <div className="col-6"> 
                            
                            
                            <div className="form-group">
                                <label for="assesmentAreaId">Range</label>
                              
                               
                                <input className="form-control" size="2" name='minrate' type="number"  value={question.minrate}
                                    onChange={handlechange}/> &nbsp;
                                     <input className="form-control" size="2" name='maxrate' type="number"  value={question.maxrate}
                                    onChange={handlechange}/>
                              
                                
                            </div>

                            <div className="form-group">
                                <label for="assesmentAreaId">Score</label>
                                <input className="form-control" size="2" name='score' type="number"  value={question.score}
                                    onChange={handlechange}/> &nbsp;
                            </div>

                            <div className="form-group">
                                    <label for="direction">Enter the desired answer</label>

                                    <input type="text" maxLength="500"
                                        name="answer"
                                        className="form-control" 
                                        value={question.amswer}
                                        
                                        />
                                    <div className="errormessage"></div> 
                                    
                            </div>

                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='commentenable' type="checkbox"  
                                    checked={question.commentenable}
                                    onChange={handlechange}
                                    />&nbsp;Enable comment</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="checkbox">
                                    <label><input name='imageupload' type="checkbox"  
                                    checked={question.imageupload}
                                    onChange={handlechange}
                                    />&nbsp;Can upload Image</label>
                                </div>
                            </div>
                      
                      
                                    
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                                    <div className="notifyMessage">{message}</div>
                         <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                         <Link className= "btn btn-secondary" to={`/question`}>
                                    Back
                                </Link>
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
export default AddQuestion