import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [count, setCount] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setCount(v => v + 1);
                    }}
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setVisible(false);
                    }}
                >
                    hide
                </button>
                <PlanetInfo id={count} />
            </div>
        );
    } else {
        return (
            <button
                type="button"
                onClick={() => {
                    setVisible(true);
                }}
            >
                show
            </button>
        );
    }
};

const getPlanet = id => {
    return fetch(`https://swapi.co/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
};

const useRequest = request => {
    const [dataState, setDataState] = useState({
        data: null,
        loading: true,
        error: null
    });
    useEffect(() => {
        setDataState({
            data: null,
            loading: true,
            error: null
        });
        let cancelled = false;
        request()
            .then(
                data =>
                    !cancelled &&
                    setDataState({
                        data,
                        loading: false,
                        error: null
                    })
            )
            .catch(
                error =>
                    !cancelled &&
                    setDataState({
                        data: null,
                        loading: false,
                        error
                    })
            );
        return () => {
            cancelled = true;
        };
    }, [request]);

    return dataState;
};

const usePlanetInfo = id => {
    const request = useCallback(() => getPlanet(id), [id]);
    return useRequest(request);
};

const PlanetInfo = ({ id }) => {
    const { data, loading, error } = usePlanetInfo(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something going wrong...</div>;
    }
    return (
        <div>
            {id} - {data.name}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
