import { useState } from "react"

// get all users

const useUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);
    return users;
}
export default useUsers;