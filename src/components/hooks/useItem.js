import { useState } from "react"

// get specific data/service

const useItem = (id) => {
    const [item, setItem] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/:${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, []);
    return item;
}
export default useItem;