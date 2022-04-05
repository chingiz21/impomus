import axios from "axios";
import { useEffect, useState } from "react";

export default function useYoutube(playlist) {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios
            .get('http://localhost:5000/youtube-auth', playlist)
            .then((response) => {
                console.log('Import successful');
            })
            .catch(e => console.error(e));
    }, []);
}