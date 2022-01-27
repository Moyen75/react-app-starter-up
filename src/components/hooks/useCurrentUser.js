import { useState } from "react"

// get current user

const useCurrentUser = (email) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/user?email=${email}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);
    return user;
}
export default useCurrentUser;