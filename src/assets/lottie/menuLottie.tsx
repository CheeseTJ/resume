import Lottie, {AnimationItem} from 'lottie-web'
import {Component} from "react";
// 引入lottie json文件
import * as Menu from './json/menu.json'
type PropsT = {
  handleClick:(arg0: boolean)=>void, 
  open:boolean    
}
type StateT = {
    menuL: AnimationItem|null,
}
export default class MenuLottie extends Component<PropsT,StateT>{
  constructor(props: PropsT) {
    super(props)
    this.state = {
      menuL:null,
    }
  }
  componentDidMount() {
   const menuL = Lottie.loadAnimation({
      //  展示lottie原生的dom
      container: document.getElementById('menu-lottie') as Element,
      // 渲染方式
      renderer: 'svg',
      //  循环
      loop:false,
      //  是否自动播放
      autoplay: false,
      //  lottie json文件
      animationData:Menu,
    })
    menuL.setSpeed(3);
    this.setState({
      menuL
    })
  }
  componentDidUpdate(nProps:PropsT) {
      // 播放哪一部分片段 从下载的地方可以看到
      if(nProps.open!== this.props.open){
          this.state.menuL!.playSegments(this.props.open?[0,70]:[70,140],true);
      }
  }
  openMenu = () =>{
      this.props.handleClick(!this.props.open)
  }
  render() {
      return <div id="menu-lottie" style={{width:'100%',height:'100%'}} onClick={this.openMenu}/>
  }
}