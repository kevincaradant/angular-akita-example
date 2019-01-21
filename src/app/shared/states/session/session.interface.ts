export interface Session {
  readonly token: string;
  readonly user: UserDetails;
}

export interface UserDetails {
  readonly firstname: string;
  readonly lastname: string;
  readonly age: string;
}
