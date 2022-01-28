import { useState } from "react"

// get current user

const useCurrentUser = (email) => {
    const token = localStorage.getItem('userToken')
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/person?email=${email}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);
    return user;
}
export default useCurrentUser;
useCurrentUser()