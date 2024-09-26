import store from "../../store";
import ResumePhone from "./resumePhone/ResumePhone.tsx";
import ResumeWeb from './resumeWeb/ResumeWeb.tsx'
import {observer} from "mobx-react";
const Resume = observer(()=>{
    return(
        <>
            {store.isWeb?<ResumeWeb/>:<ResumePhone/>}
        </>
    )
})
export default Resume