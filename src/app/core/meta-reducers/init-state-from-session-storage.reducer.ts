// import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

// import { SessionStorageService } from '../session-storage/session-storage.service';
// import { AppState } from '../core.state';

// export function initStateFromSessionStorage(
//   reducer: ActionReducer<AppState>
// ): ActionReducer<AppState> {
//   return function (state, action) {
//     const newState = reducer(state, action);
//     if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
//       return { ...newState, ...SessionStorageService.loadAllState() };
//     }
//     return newState;
//   };
// }
