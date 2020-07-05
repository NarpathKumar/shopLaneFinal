console.clear();

let dataArray = []
let arrayId = []
let localId = window.localStorage.getItem("webLaneId")

$('#right-logo').attr({"src":window.localStorage.getItem("webAvatar")})
const promise = new Promise((resolve, reject)=>{
    $.get("https://5eeba96c5e298b0016b69331.mockapi.io/cart",(response)=>{
        resolve(response)
    }).fail((err)=>{
        reject(new Error(" DATA Not Found"))
    })
})
promise
.then((resp)=>{
    for(var i=0; i<resp.length; i++){
        if(resp[i].userId === localId){
            var xml = new XMLHttpRequest();
            xml.open('delete',"https://5eeba96c5e298b0016b69331.mockapi.io/cart/"+(resp[i].id),false)
            xml.send();
            xml.onreadystatechange=(e)=>{
                if(e.readyState == 4){
                    console.log(e.response)
                }
            }
            dataArray.push(resp[i])
        }
    }
    let obj = {
        userId : window.localStorage.getItem("webLaneId"),
        objectData : dataArray
    }
    $.post("https://5eeba96c5e298b0016b69331.mockapi.io/orderPlaced",obj,(e)=>{
        console.log(e)
    })
})


setTimeout(()=>{
    window.location.assign('./shopLane.html')
},1500)
