import Lottie,{AnimationItem} from 'lottie-web'
import {Component} from "react";
import * as Back from './json/back.json'
type PropT = NonNullable<unknown>
type StateT = {
    backL:AnimationItem|null;
}
export default class BackLottie extends Component<PropT,StateT> {
    constructor(props: PropT) {
        super(props as PropT)
        this.state = {
            backL:null
        }
    }
    componentDidMount() {
        const backL = Lottie.loadAnimation({
            // 获取dom
            container: document.getElementById('back-lottie') as Element,
            // 渲染方式
            renderer: 'svg',
            // 循环
            loop: true,
            // 自动播放
            autoplay: false,
            // lottie信息
            animationData:Back,
        })
        // 播放速度
        backL.setSpeed(2);
        // 播放完成暂停
        backL.addEventListener('loopComplete',()=>backL.pause())
        // 保存dom实例
        this.setState({
            backL
        })
    }
    backFN = () =>{
        this.state.backL!.play()
    }
    render() {
        return <div id="back-lottie" style={{width:'100%',height:'100%'}} onClick={this.backFN}/>
    }
}