import { useState } from "react";
import { useAuthContext } from "./use-auth-context";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const { dispatch } = useAuthContext();

    async function signup({ email, password }) {
        if (!email || !password) throw new Error("Email and Password are required");
        try {
            setIsLoading(true);
            setError(null)
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) // Pass the EMAIL and PASSWORD as an object in json format
            })
            //When we get a response in order to get the json data we have to use response.json a josn method
            const jsonData = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(jsonData.error)
            }
            if (response.ok) {
                // Save the user to local storage
                // localStorage.setItem('token', jsonData.token);
                localStorage.setItem('user', JSON.stringify(jsonData));

                // Update the  Auth context with this new user information
                dispatch({ type: 'LOGIN', payload: jsonData })
                return jsonData;

                // window.location.href = "/"
            }
            else throw new Error('Something went wrong!');

        } catch (err) {
            console.log('ERROR:', err);
            setError(err?.message ?? 'An error occurred while trying to create an account');
        }
        finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        signup
    };
};
