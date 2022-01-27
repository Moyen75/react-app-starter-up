import { useState } from "react"

// get all data/services 

const useData = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('')
            .then(res => res.json())
            .then(data => setData(data))
    }, []);
    return data;
}
export default useData;