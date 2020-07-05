console.clear();
let barUrl = window.location.search.split("=")[1];
const cartUrl = "https://5eeba96c5e298b0016b69331.mockapi.io/cart";
const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
const mainImg = $('#product-preview')
const productTitle = $('#product-title')
const productBrand = $('#product-brand')
const para = $('#para');
const productPrice = $('#product-price');
const prevDiv = $('#preview-images');
const button = $('#addCart-button');
let photos;
let borderEle;
let thisDetail ;
let cartCount = 0;
let checkItems = 0;

$('#right-logo').attr({"src":window.localStorage.getItem("webAvatar")})
$.get("https://5eeba96c5e298b0016b69331.mockapi.io/cart",(e)=>{
    for(var i=0; i<e.length; i++){
        if(e[i].userId === window.localStorage.getItem("webLaneId")){
            cartCount++
        }
    }
    $('#cart-count').text(cartCount)
})
const promise = new Promise((resolve, reject)=>{
    $.get(`${url}/${barUrl}`,(response)=>{
        resolve(response)
    }).fail((err)=>{
        reject(new Error(" DATA Not Found"))
    })
})
promise
.then((e)=>{
    thisDetail = e;
    mainImg.attr({"src" : e.preview})
    productTitle.text(e.name)
    productBrand.text(e.brand)
    para.text(e.description)
    productPrice.text(e.price)
    let photos = e.photos
    for(var i=0; i<photos.length; i++){
        prevDiv.append(createPrevCards(photos[i]))
    } 
    borderEle = $('#preview-images').get(0).firstElementChild
    borderEle.classList.add("active")
})
.catch((error)=>{
    console.log(error)
})

console.log(borderEle)
function createPrevCards(img){
    const card = $('<div>').addClass("images-card");
    card.append($('<img>').addClass('p-img').attr({"src":img}));

    card.click(()=>{
        mainImg.attr({"src": img})
        if(card.get(0) === borderEle){
            console.log("Same Element")
        }
        else {
            card.get(0).classList.add("active")
            borderEle.classList.remove("active")
            borderEle = card.get(0)
        }
    })
    return card;
}

button.click(()=>{
    button.addClass("popup")
    let pos = -1;
    let obj = {
        "productId": thisDetail.id,
        "productName": thisDetail.name,
        "productBrand": thisDetail.brand,
        "productPrice": thisDetail.price,
        "productPreview": thisDetail.preview,
        "productIsAccessory": thisDetail.isAccessory,
        "productTimes": 1,
        "userId": window.localStorage.getItem("webLaneId")
    }
    $.get(cartUrl,(e)=>{

        for(var i=0; i<e.length; i++){
            if(e[i].userId === window.localStorage.getItem("webLaneId")){
                checkItems++;
                button.removeClass("popup")
            }
        }
        if(checkItems === 0){
            $.post(cartUrl,obj,(e)=>{
                console.log(e)
                ++cartCount;
                $('#cart-count').text(cartCount)
            })
        }
        
        else {
            for(var i=0; i<e.length; i++){
                if(e[i].userId === window.localStorage.getItem("webLaneId"))
                    if(e[i].productId === obj.productId){
                        pos = i+1;
                        break;
                    }
            }
            if(pos != -1){
                $.ajax({ 
                    type: "PUT",  
                    url: `${cartUrl}/${pos}`,
                    data: {
                        "productTimes":Number(e[pos-1].productTimes) + 1,
                    },   
                    success: function(response) {  
                            $('#added').css({"display":"block"});
                            $('#cart-increased').text("x"+response.productTimes);
                        setTimeout(()=>{
                            $('#added').css({"display":"none"})
                        },1000);
                        console.log(response)  
                        pos = -1;
                        console.log(pos)
                    },   
                    error: function(request,status,errorThrown) {       
                        console.log(status)
                    }	
              })
              button.removeClass("popup")
            }
            else {
                $.post(cartUrl,obj,(e)=>{
                    console.log(e)
                    ++cartCount;
                    $('#cart-count').text(cartCount)
                })
              button.removeClass("popup")
            }
        }
        
    })
})