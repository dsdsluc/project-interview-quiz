import Answer from "../Pages/Answer";
import Home from "../Pages/Home";
import LayoutDefault from "../Pages/Layout/LayoutDefault";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Question from "../Pages/Question";
import Register from "../Pages/Register";
import Result from "../Pages/Result";
import Topic from "../Pages/Topic";
import Private from "../components/Private";

export const routes = [
    {
        path : "/",
        element : <LayoutDefault/>,
        children : [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/logout",
                element: <Logout/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                element: <Private/>,
                children: [
                    {
                        path:"/topic",
                        element: <Topic/>
                    },
                    {
                        path:"/question/:id",
                        element: <Question/>
                    },
                    {
                        path:"/result/:id",
                        element: <Result/>
                    },
                    {
                        path:"/answer",
                        element: <Answer/>
                    }
                ]
            }
        ]
    }
]