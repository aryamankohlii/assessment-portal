class Controlls{
    constructor(data){
        this.id = data[0].id;
        this.name = data[0].name;
        this.isActive = data[0].isActive;
    }

    getControllsDetails(){
        return [{"id" : this.id,"name" : this.name,"isActive" : this.isActive}];
    }

}

module.exports = Controlls;