console.clear();

$(()=>{
    const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
    const clothing = $('#clothing-div')
    const accessory = $('#accessory-div');
    let cartCount = 0;
    
      
    $('#right-logo').attr({"src":window.localStorage.getItem("webAvatar")})
$.get(url, (e)=>{
    for(var i=0; i<e.length; i++){
        if(!(e[i].isAccessory)){
        console.log(createProductCard(e[i]).get(0))
        clothing.append(createProductCard(e[i]))
        }
        else accessory.append(createProductCard(e[i]))
    }
})
function createProductCard(cardData){
    const card = $('<div>').addClass('product-card');
    card.get(0).id = cardData.id;
    card.append($('<a>').attr({href : `./product.html?=${card.get(0).id}`}).append($('<img>').addClass('preview-image').attr({src: cardData.preview, alt: ""})));
    const cardDesc = $('<div>').addClass('card-desc');
    cardDesc.append($('<h4>').text(cardData.name));
    cardDesc.append($('<h5>').text(cardData.brand));
    cardDesc.append($('<p>').text("Rs  ").append($('<span>').text(cardData.price)));
    card.append(cardDesc);

    return card;
} 


// $("#right-logo").click(()=>{
//     if($("#mobo").get(0).style.width === ""){
//         $("#mobo").get(0).style.width = "400px"
//     }
//     else if($("#mobo").get(0).style.width === "400px"){
//         $("#mobo").get(0).style.width = ""
//     }
// })
$('#single-item').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
});

})
