import { createContext, useEffect, useState } from 'react';

export const userContext = createContext();

const UserProvider = ({ children }) => {
    // Initialize currentUser with null or parsed user from localStorage
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Update localStorage whenever currentUser changes
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <userContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;
