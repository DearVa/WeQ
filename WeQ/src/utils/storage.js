const storage = {
    setToken(value){
        localStorage.setItem("token",JSON.stringify(value))
    },
    getToken(){
        return JSON.parse(localStorage.getItem("token"))
    },
    set(key,value){
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    get(key){
        return JSON.parse(sessionStorage.getItem(key))
    },
    remove(key){
        sessionStorage.removeItem(key)
    }
}