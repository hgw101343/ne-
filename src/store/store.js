import { createStore } from 'redux'

let counter = (state = {
    shoplist: '',
    name: 'wuge',
    age: 18,
    searchlist: ''
}, action) => {
    switch (action.type) {
        //第一次传入值
        case 'setShoplist':
            return {
                shoplist: action.shoplist
            }
        //获取值
        case 'getShoplist':
            return {
                shoplist: state.shoplist
            }
        //删除
        case 'delShoplist':
            state.shoplist.splice(action.num, 1);
            return {
                shoplist: state.shoplist
            }
        //编辑
        case 'setsearch':
            return {
                searchlist: action.searchlist
            }
        case 'getsearch':
            return {
                searchlist: state.searchlist
            }
        default:
            return { ...state }

    }
}

let store = createStore(counter);
export default store