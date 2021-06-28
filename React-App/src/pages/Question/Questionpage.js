import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'
import {getQuestions} from '../../service/questionanswereservice';
import { Link,useHistory } from 'react-router-dom'
import {useEffect,useState} from 'react'


const Questionpage = () => {
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


    return(
        <>
        <SidebarComponent/>
        <div className="main-panel">
        <NavbarComponent pagetitle='Question Management '/>
        <div className="content">
        <div className="container-fluid">

        

        <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">Question List</h4>
                </div>
                <div className="col-md-6 text-right">
                <Link className="btn btn-secondary" to="/question/0" >
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
                          QuestionText
                        </th >
                        <th className="text-center">
                          Assessment Area
                        </th>
                        <th className="text-center"> 
                        Subtrack
                        </th>
                        <th className="text-center"> 
                        Range
                        </th>
                        <th className="text-center"> 
                        Score
                        </th>
                        <th className="text-center"> 
                        Status
                        </th>
                        <th className="text-center"> 
                        Action
                        </th>
                      
                      </thead>
                      <tbody>
                        {
                    questionList.length>0?      questionList.map(item =>(
                                <tr key={item.id}>
                        <td className="text-center">
                        {item.questiontext}
                        </td >
                        <td className="text-center">
                        {item.assesmentarea}
                        </td>
                        <td className="text-center"> 
                        {item.subtrack}
                        </td>
                        <td className="text-center"> 
                        {item.minrate} - {item.maxrate}
                        </td>
                        <td className="text-center"> 
                        {item.score}
                        </td>
                        <td className="text-center"> 
                        {item.isactive==1?"Active":"Deactive"}
                        </td >
                              <td className="text-center">
                                <Link className="btn btn-primary" to={`/question/${item.id}`}>
                                    Edit
                                </Link>
                                  </td>
                                </tr>
                            )): <tr>
                            <td colSpan="7" align="center">No record Found</td>
                          </tr>
                       }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
         
       
       
        </div>
        </div>
        
        
        <FooterComponent/>
        </div>
       
        </>
       
       )}

export default Questionpage