export class UserDTO {
    userName: string;
    password: string;

    constructor(username: string= "", password: string = "") {
        this.userName = username;
        this.password = password;
    }
}