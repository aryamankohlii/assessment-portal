class Role{
    constructor(data){
        this.id = data[0].id;
        this.role = data[0].role;
        this.isActive = data[0].isactive;
    }

    getRoleDetails(){
        return [{"id" : this.id,"role" : this.role,"isactive" : this.isactive}];
    }

}

module.exports = Role;