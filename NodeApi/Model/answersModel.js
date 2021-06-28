class Answers{
    constructor(data){
        this.question_id = data.question_id;
        this.answertext = data.answertext;
        this.answerscore = data.answerscore;
    }

    getAnswersDetails(){
        return [{"id" : this.id,"question_id" : this.question_id,"answertext":this.answertext}];
    }

}

module.exports = Answers;