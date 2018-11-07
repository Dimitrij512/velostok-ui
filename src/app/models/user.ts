export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  role: string;
  name: string;

  constructor(id?: string, email?: string, password?: string, firstName?: string,
              lastName?: string, role?: string, photoUrl?: string, name?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = name;
    this.role = role;
    this.photoUrl = photoUrl;
  }
}
