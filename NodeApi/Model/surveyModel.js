class Survey{

    constructor(data){
        this.id = data[0].id;
        this.name = data[0].name;
        this.isActive = data[0].isActive;
        this.createdbyuser = data[0].createdbyuser;
        this.isPrivate = data[0].isPrivate;
    }

    getSurveyDetails(){
        return [{"id" : this.id,"name" : this.name,"isActive" : this.isActive,"createdbyuser" : this.createdbyuser,"isPrivate" : this.isPrivate}];
    }

}

module.exports = Survey;