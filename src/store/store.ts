import { reducer } from './reducer';
import storage from '../utils/storage';
import { PersistanceKeys } from '../utils/storage';
import { Observers } from '../types/store';

export let emptyState = {
	screen: 'SignIn',
	post: [],
};

export let appState = storage.get({key:PersistanceKeys.STORE, defaultValue: emptyState});

let observers: Observers[] = [];

const persistStore = (state: any) => storage.set({key:PersistanceKeys.STORE, value: state, session: false})



const notifyObeservers = () => 	observers.forEach((o: any) => o.render());


export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState =  reducer(action, clone);
	appState = newState; 
	persistStore(newState)
	notifyObeservers()
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
