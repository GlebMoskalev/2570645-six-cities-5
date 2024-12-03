import {store} from '../store';
import { setError } from '../store/app-data/app-data';
import {clearError} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
