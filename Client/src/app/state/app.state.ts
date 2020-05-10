import { CaseState } from '../case/state/case.reducer';
import { UserState } from '../user/state/user.reducer';

// Representation of the entire app state
export interface AppState {
  case: CaseState,
  user: UserState
}
