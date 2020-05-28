import { AppState } from '../../core.state';
import { auth } from 'firebase/app';

// enum USER_TYPE {
//   RESEARCHER = 'RESEARCHER'
// }

export interface User {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  emailVerified: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User;
  error: any;
}

export interface State extends AppState {
  auth: AuthState;
}
