import SidebarComponent from '../../components/sidebar'
import NavbarComponent from '../../components/navbar'
import FooterComponent from '../../components/footer'

const Dashboard = () => {
    return(
        <>
        <SidebarComponent/>
        <div className="main-panel">
            <NavbarComponent pagetitle='Dashboard'/>
            <div className="content">
                <div className="container-fluid">
                <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">About the AssessMasters Portal</h4>
                  </div>
                  
                  </div>
                  </div>
                  <div className="card-body">
                <div class="font-weight-bold">Assessment is the key of any education and training system. For participation in any kind of such assessments, candidates look for mock tests and self evaluation.
                  Thus,AssessMasters is an assessment portal that helps teachers prepare questions by choosing a particular assessment area,it's subtrack and assign those questions.
                  Later on,students can be added to the database and come and attempt the test after they receive the permission mail. Furthermore,marks can be assigned to all the students by entering them in the database which would be reflected in the "Marks" page 
                                                          of the Web App.
                                                          As a software developer ,this portal is a full stack application that provides user profiling and track record with smooth and automated support from the backend.
                                                      
</div>
                      </div>
                      <br></br>

                     
                 
                     
                  </div>
                </div>
                <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">A note for the admin</h4>
                  </div>
                  </div>
                  
                  </div>
                  <div className="card-body">
                      <div class="font-weight-bold">
                          Kindly follow the below instructions after logging into the Portal :-
                          <ul>
                              <li> Go to the assessment area to enter the desired subject </li>
                              <li>Go to the subtrack area to choose the assessment area the subtrack would be a part of</li>
                              <li> Go to the question area to fill in all the questions and clearly enter the respective subtrack and assessment area the question is a part of along with other details</li>
                              <li>To add a new role,go to the "User Role" section</li>
                              <li>To add in students,enter their details in the database,so that a mail can be sent to verify them</li>
                              <li>After a student has attempted the question paper,assess his answers and enter his marks in the database section accordingly.</li>
                              <li>Results can be viewed in the "Marks" section</li>
                              
                          </ul>
                      </div>
                      </div>
                      </div>
                      <div className="card">
                <div className="card-header card-header-primary">
                 <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title ">A note for all the students</h4>
                  </div>
                  </div>
                  
                  </div>
                  <div className="card-body">
                      <div class="font-weight-bold">
                          Kindly follow the below instructions after logging into the Portal :-
                          <ul>
                             <li>Go to the "Answers" section to answer all the questions</li>
                             <li>After answering all the questions,click on the "Submit" button that shall redirect you to the dashboard page.Logout from here.</li>
                             <li>Malpractice of any kind is strictly prohibited</li>
                              
                          </ul>
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

export default Dashboard;