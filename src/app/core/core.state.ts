import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

// import { initStateFromSessionStorage } from './meta-reducers/init-state-from-session-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { RouterStateUrl } from './router/router.state';
import { clearState } from './meta-reducers/clear-state.reducer';
import { storeFreeze } from 'ngrx-store-freeze';

export const reducers: ActionReducerMap<AppState> = {
	router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [
	// initStateFromSessionStorage,
	clearState,
];

if (!environment.production) {
	metaReducers.unshift(debug);
	metaReducers.unshift(storeFreeze);
}

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
	router: RouterReducerState<RouterStateUrl>;
}
