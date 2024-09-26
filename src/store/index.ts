import {makeObservable,observable,action} from "mobx";
class Store {
    isWeb = innerWidth>768;
    constructor() {
        makeObservable(this,{
            isWeb:observable,
            setWebType:action
        })
    }
    setWebType = () => {
        this.isWeb = innerWidth>768;
    }
}
const store = new Store();
onresize=store.setWebType;
export default store;
