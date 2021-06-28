class Question{
    constructor(data){
        
        this.questiontext = data.questiontext;
        this.controllid = data.controllid;
        this.isactive = data.isactive;
        this.score = data.score;
        this.minrate = data.minrate;
        this.maxrate = data.maxrate;
        this.subtrackid = data.subtrackid;
        this.assesment_area_id = data.assesment_area_id;
        this.comment = data.comment;
    }

    getQuestionDetails(){
        return [{
                "questiontext" : this.questiontext,
                "controllid" : this.controllid,
                "isactive":this.isactive,
                "score":this.score,
                "minrate":this.minrate,
                "maxrate":this.maxrate,
                "subtrackid":this.subtrackid,
                "assesment_area_id":this.assesment_area_id,
                "comment":this.comment
            }];
    }

}

module.exports = Question;