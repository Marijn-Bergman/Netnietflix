import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (param) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        let url = `${baseUrl}${param}?api_key=${apiKey}&language=en-US`;

        axios
            .get(url)
            .then((response) => { setData(response.data); })
            .catch((error) => console.log(error));
    }, [param]);

    return data;
};

export default useFetch;
