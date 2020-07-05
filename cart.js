console.clear();
const mainDiv = $('#cards-div');
const totAmount = $('#total-amount')
const cartUrl = "https://5eeba96c5e298b0016b69331.mockapi.io/cart";
let cartCount = 0;
$('#right-logo').attr({"src":window.localStorage.getItem("webAvatar")})
$.get("https://5eeba96c5e298b0016b69331.mockapi.io/cart",(e)=>{
    for(var i=0; i<e.length; i++){
        if(e[i].userId === window.localStorage.getItem("webLaneId")){
            cartCount++
        }
    }
    $('#cart-count').text(cartCount)
    $('#item-no').text(cartCount)
    let sum = 0;
    for(var i=0; i<e.length; i++){
        if(e[i].userId === window.localStorage.getItem("webLaneId")){
            sum +=Number(e[i].productTimes) * Number(e[i].productPrice);
            mainDiv.append(createCard(e[i]));
            console.log(createCard(e[i]))
        }
    }
    totAmount.text(sum)
})
function createCard(e){
    const card = $('<div>').addClass("item");
    card.get(0).id = e.id;

    card.append($('<img>').addClass("item-image").attr({"src":e.productPreview}));

    const iDiv = $('<div>').addClass("item-desc");
        iDiv.append($("<h4>").text(e.productName));
        iDiv.append($("<p>").text(`x${e.productTimes}`));
        iDiv.append($('<p>').text("Amount: Rs ").append($('<span>').addClass("price").text(e.productPrice)));
    card.append(iDiv)

    return card
}