class User{

    constructor(data){
        this.id = data[0].id;
        this.name = data[0].name;
        this.email = data[0].email;
        this.roleid = data[0].roleid;
        this.password = data[0].password;
        this.isActive = data[0].isActive;
        this.isEmailVerified = data[0].isEmailVerified;
        this.role = data[0].role;
    }

    getUserDetails(){
        return [{"id" : this.id,"name" : this.name,"email" : this.email,"roleid" : this.roleid,"role" : this.role}];
    }

}

module.exports = User;