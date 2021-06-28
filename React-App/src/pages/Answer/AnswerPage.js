import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {getQuestions} from '../../service/questionanswereservice';
import { Link,useHistory } from 'react-router-dom'
import {useEffect,useState} from 'react'

const AnswerPage = () => {
    const history = useHistory();
    const[questionList,setquestion]=useState([]);
    
  
      const getQuestionlist = ()=>{
          getQuestions().then(response => response.json()
        .then(data=>{
          if(data.status==401)
          {
            history.push('/');
          }
          setquestion(data);
        }),x=>{
        
        })
        
      }
  
      
      useEffect(()=>{
          getQuestionlist();
        },[])
        let count=1;

        return(
            <>
            <SidebarComponent/>
            <div className="main-panel">
            <NavbarComponent pagetitle='Answer Management '/>
            <div className="content">
            <div className="container-fluid">
    
            
    
            <div className="col-md-12">
                  <div className="card">
                    <div className="card-header card-header-primary">
                     <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title ">Answer the following questions:-</h4>
                    </div>
                   
                      </div>
                    </div>
 
                    <div className="text-center">
                        {
                        
                        questionList.map((item) => (
                            
                        <>
                        <div class="center">
                            <br></br>
                            
                       <strong ><u>Question No: {count++}</u></strong>   
                        </div>
                        <br></br>
                        <div  class="font-weight-bold">
                          <strong> {item.questiontext} </strong>
                        </div>
                        <br></br>
                        <div>
                          <strong>  The total no of marks for the question are: {item.score} </strong>
                        </div>
                        <br></br>
                        <div>
                          <strong> Please Note:-{item.comment} </strong>
                        </div>
                        <br></br>
                        <strong>Answer the question below:-</strong>
                        
                        <div>
                            <br></br>
                        <textarea placeholder="Enter your answer....." rows="5" cols="150"/>
                        </div>
                        </>
                        
                        
                        
                        ))
}
</div>

                        
                        </div>
                        <Link className="btn btn-primary" to={`/dashboard`}>
                                    Submit
                                </Link>
                        </div>
                        </div>
                        </div>
                        <FooterComponent/>
                        </div>
                        </>
                        )}
                        export default AnswerPage;
                    
  
  