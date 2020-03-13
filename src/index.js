import React, { useContext } from "react";
import ReactDOM from "react-dom";

const MyContext = React.createContext();

const App = () => {
    return (
        <MyContext.Provider value="Privet Mirrrr!">
            <Hello />
        </MyContext.Provider>
    );
};

const Hello = () => {
    const value = useContext(MyContext);
    return <p>{value}</p>
};

ReactDOM.render(<App />, document.getElementById("root"));
