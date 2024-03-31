import { createContext, useReducer} from 'react';

export const AuthContext = createContext();
// export const AuthDispatchContext = createContext();

// state = previousState, action = { type, payload }
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // return { ...state, isLoggedIn: true };
            return { user: action.payload };

        case 'LOGOUT':
            return { user: null };


        // case 'REGISTER':
        // add user to database here
        // console.log('User registered!');
        // return { ...state, isRegistered: true };
        default:
            return state;
    }
}

// Custom components to wrap our entire application and provide a value from this context
export const AuthContextProvider = ({ children }) => {

    // Register the state using the {useReducer} hook. The reducer function is passed as an argument along with initial state.
    // State is managed by the reducer function
    // The reducer function takes the current state
    // State is an array with two values:

    // const initialState = {user:null}

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    console.log('AuthContext State:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }} >
            {/* <AuthDispatchContext.Provider value={dispatch}> */}
            {children}
            {/* </AuthDispatchContext.Provider> */}
        </AuthContext.Provider>
    )
}



// Custom Hooks for AuthContext
// This custom hook will allow us to pull in the "user" data from the auth context without needing to wrap every component that needs
// export const useAuth = () => {
//     return useContext(AuthContext)
// };

// export const useAuthDispatch = () => {
//     return useContext(AuthDispatchContext)
//   }

// Either keep it here or move it to a another directory called /hooks/useAuth.js

// export const useAuthContext = () => {
//     const context = useContext(AuthContext)

//     if (!context) {
//         throw new Error("useAuthContext must be used within the AuthContext Provider")
//     }

//     return context
// }
