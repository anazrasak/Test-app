import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';
import {ENDPOINT} from './Endpoints';
import {initialState, authReducer, CONSTANT} from './UserContext.js';
import * as NavigationRef from '../navigation/NavigationRef';
import * as Keychain from 'react-native-keychain';

export const UserContext = createContext();

export const UserProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  // let cancelTokenSource = axios.CancelToken.source();

  /** Show toast message */
  const showToast = msg => {
    setMessage(msg);
    setVisible(true);
  };

  /** Hide toast */
  const onDismissSnackBar = () => setVisible(false);

  /** Store token securely */
  const saveTokenToKeychain = async token => {
    try {
      await Keychain.setGenericPassword('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  /** Retrieve stored token */
  const GetTokenKeychain = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  };

  /** Delete stored token */
  const deleteCredentials = async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error deleting credentials:', error);
    }
  };

  const apiCall = async (method, url, data = null, isFormData = false) => {
    try {
      const token = await GetTokenKeychain();
      const headers = {
        Accept: 'application/json',
        ...(token && {Authorization: `Token ${token}`}),
        ...(isFormData && {'Content-Type': 'multipart/form-data'}),
      };

      // Cancel any existing request before making a new one
      // if (cancelTokenSource) {
      //   console.log('cancellingggg');
      //   cancelTokenSource.cancel('Previous request cancelled');
      // }
      // cancelTokenSource = axios.CancelToken.source();

      console.log(`${ENDPOINT}${url}`);

      const response = await axios({
        method,
        url: `${ENDPOINT}${url}`,
        data,
        headers,
        timeout: 10000,
        // cancelToken: cancelTokenSource.token, // Attach cancel token here
      });

      if (response.status === 200) {
        // if (
        //   response.data.success === 'False' &&
        //   response.data.reason === 'TXN_PASS_EXPIRED'
        // ) {
        //   NavigationRef.navigate('Enterpin');
        // }
        return response;
      }
      return null;
    } catch (error) {
      // if (axios.isCancel(error)) {
      //   console.log('API call cancelled:', error.message);
      // } else {
      console.log('API error:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        userContext.signOut();
      }
      // }

      return null;
    }
  };

  /** Function to cancel API calls manually when needed */
  // const cancelApiCall = () => {
  //   if (cancelTokenSource) {
  //     cancelTokenSource.cancel('User navigated away, API call cancelled');
  //   }
  // };

  /** Define user context */
  const userContext = useMemo(
    () => ({
      getToken: GetTokenKeychain,

      signOut: async () => {
        await deleteCredentials();
        dispatch({type: 'SIGN_OUT'});
        await AsyncStorage.removeItem('@userData');
      },

      SetGuestView: () => {
        dispatch({type: CONSTANT.set_guestview, user_type: 'guest'});
      },

      getData: url => apiCall('get', url),

      postData: (url, data) => apiCall('post', url, data),

      postFormData: (url, data) => apiCall('post', url, data, true),

      // cancelApiCall: cancelApiCall(),

      getPasscode: data =>
        userContext.postData('/user/authenticate-for-txn/', data).then(res => {
          if (res) {
            const response = res.data;
            if (response.success) {
              dispatch({
                type: CONSTANT.fetch_passcode_succes,
              });
              userContext.changeLanguage(response.langcode);
              NavigationRef.navigate('TabNav');
            } else {
              showToast(response.reason);
            }
            return response;
          }
          // showToast('Something went wrong');
          return null;
        }),

      onSuccess: (data, terminalid) => {
        userContext.changeLanguage(data.langcode);
        saveTokenToKeychain(data.token);
        dispatch({type: CONSTANT.sign_in, payload: data, terminalid});
      },

      createTicket: (trans_id, subject, message) => {
        const formData = new FormData();
        formData.append('trans_id', trans_id);
        formData.append('subject', subject);
        formData.append('message', message);

        return userContext
          .postFormData('/helpdesk/create-ticket/', formData)
          .then(res => {
            if (!res?.data?.success) showToast(res?.data?.reason);
            return res;
          });
      },

      DeleteTicket: ticketid => {
        const formData = new FormData();
        formData.append('id', ticketid);

        return userContext
          .postFormData('/helpdesk/delete-ticket/', formData)
          .then(res => {
            if (!res?.data?.success) showToast(res?.data?.reason);
            return res;
          });
      },
    }),
    [state],
  );

  /** Restore user data from storage */
  useEffect(() => {
    console.log('usereffect');
    const initialize = async () => {
      try {
        const userData = await AsyncStorage.getItem('@userData');
        dispatch({
          type: 'RESTORE_TOKEN',
          state: userData ? JSON.parse(userData) : {},
        });
      } catch (e) {
        console.error('Error restoring token:', e);
      }
    };

    if (state.isLoading) {
      initialize();
    } else {
      AsyncStorage.setItem('@userData', JSON.stringify(state));
    }
  }, [state]);

  return (
    <UserContext.Provider value={{...userContext, ...state, showToast}}>
      {props.children}
      <Snackbar
        visible={visible}
        duration={1000}
        style={{borderRadius: 10}}
        onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </UserContext.Provider>
  );
};
