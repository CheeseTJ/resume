import {Component} from "react";
import './Project.scss';
import list ,{techs} from '../../../../../assets/project';
type StateT ={
    list:Array<{
        url:string,
        name:string,
        desc:string,
        tags:string[],
        blips:string[],
        techs:string[],
        order:number
    }>,
    actPros:number
}
type PropsT = {
    filter?:string,
    setFilter:(val:string)=>void
}
export default class Project extends Component<PropsT,StateT>{
    private filterEl: Element | undefined;
    constructor(props:PropsT) {
        super(props)
        this.state = {
            list,
            actPros:-1
        }
    }
    toggleAct(inx:number){
        this.setState({
            actPros:this.state.actPros==inx?-1:inx
        })
    }
    handleScroll:()=>void = () =>{
       const top= this.filterEl?.getBoundingClientRect().top || 0;
       this.filterEl!.classList[top > 50?'remove':'add']('fixed');
    }
    // watch
    shouldComponentUpdate(nextProps: Readonly<PropsT>,nextState:Readonly<StateT>): boolean {
        if(nextProps.filter == this.props.filter&&nextState.actPros==this.state.actPros) return false;
        this.setState({
            list:this.state.list.map((i) =>{
                i.order =  i.techs.includes(nextProps.filter ?? '')?-1:0
                return i
            })
        })
        return true;
    }
    // init
    componentDidMount() {
        this.filterEl = document.querySelector('.projectFilter')!;
        document.addEventListener('scroll',this.handleScroll)
    }
    componentWillUnmount() {
        document.removeEventListener('scroll',this.handleScroll)
    }
    render() {
        return(
            <div className="projectWrap" id='project'>
                <div className="projectFilter">
                    <div className="stack hideScrollBar">
                        {techs.map((i, inx) => <span className={i===this.props.filter?'act':''} onClick={()=>this.props.setFilter(i)} key={inx}>{i}</span>)}
                    </div>
                </div>
                {this.state.list.map((i,inx) => (
                    <div style={{order:i.order}} key={inx} className={this.state.actPros == inx ? 'act project' : 'project'}>
                        <div className="title">
                            <div className="name">
                                <a href={i.url} className={i.url ? 'link' : "link disabled"}>{i.name}</a>
                                <div className="tags">({i.tags.join(',')})</div>
                                <span className="iconfont icon-down" onClick={() => this.toggleAct(inx)}></span>
                            </div>
                            <div className="techs">
                                技术栈: {i.techs.map((tech,inx2) => <span key={'tech'+inx+inx2}>{tech}</span>)}
                            </div>
                        </div>
                        <div className="desc">
                            <div className="blip">{i.blips.map((blip,inx3) => <span key={'blip'+inx+inx3}>{blip}</span>)}</div>
                            {i.desc}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}