import {Component, createRef, RefObject} from "react";
import './resumePhone.scss';
import Header from "../../header/header.tsx";
import PieChart from "./components/PieChart/PieChart.tsx";
import Project from "./components/Project/Project.tsx";
type StateT ={
    filter:string,
}
export default class ResumePhone extends Component<unknown,StateT> {
    ref:RefObject<PieChart>
    constructor(props: unknown) {
        super(props);
        this.state = {
            filter:''
        };
        this.ref = createRef<PieChart>();
    }
    getDuring(time:string,needDecimalPoint?:boolean):number{
        const [year,month] = time.split('-');
        const now = new Date();
        // @ts-expect-error use implicit conversation
        let result = now.getFullYear() - year;
        if(needDecimalPoint){
            // @ts-expect-error ditto
            result += Math.round((now.getMonth() - month)/1.2) / 10;
        }
        return result;
    }
    chartClick=(val:string)=>{
       this.setState({
           filter:this.state.filter === val ? '' : val
       })
    }
    openWx(){

        window.open('weixin://');
    }
    render() {
        return (
            <>
                <Header/>
                <main className="resumePhone">
                    <div className="userInfo">
                            <div className="avatar">
                                <img src="https://ts1.cn.mm.bing.net/th/id/R-C.5e832f19ebfd6b5d1cb3f6a780a799f6?rik=RsG6%2bI7lMx1olg&riu=http%3a%2f%2fwww.puhuajia.com%2fdata%2fattachment%2fportal%2f202001%2f21%2f104621kso1f0suww6fqwnz.jpg&ehk=nuaJ3QFHiuGbcjCvlllFMAzzVlRy%2beNAGryqKsw0D8w%3d&risl=&pid=ImgRaw&r=0" alt="avatar"/>
                            </div>
                            <div className="info">
                                <h2 className="name">JuneT</h2>
                                <div className="age">{this.getDuring('2002')}</div>
                                <div className="degree">Bachelor</div>
                                <div className="workExp">{this.getDuring('2022-3', true)}</div>
                            </div>
                        </div>
                    <p className="introduction">
                            Hi, I'm JuneT, a web developer with a passion for creating beautiful and functional websites. I have a strong background in HTML, CSS, and JavaScript, and I'm always looking for new challenges and opportunities to improve my skills.
                    </p>
                    <PieChart ref={this.ref} chartClick={this.chartClick} />
                    <Project filter={this.state.filter} setFilter={this.chartClick} />
                    <button className="contact" onClick={this.openWx}>
                        添加微信好友
                    </button>
                    <div className="dialog">
                        复制微信号成功
                    </div>
               </main>
            </>
        )
    }
}