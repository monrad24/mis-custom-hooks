import { useState, useEffect, useRef } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {


        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                } else {
                    console.log('setState no se llamo, componente desmontado antes de tiempo');
                }
            })
            .catch(() => {
                setState({ data: null, loading: false, error: 'No se pudo cargar la informacion' })
            })

        return (
            setState({ data: null, loading: true, error: null })
        )

    }, [url]);

    return state;

}
