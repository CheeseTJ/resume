import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import routes from './routes.tsx';
export default function RouterView(){
    return(
        <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    )
}
