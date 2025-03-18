
const banner = document.querySelector(".banner");
const bannerMain = document.querySelector(".banner-main");
const bannerItems = document.querySelectorAll(".banner-item");
const nextBtn = document.querySelector(".banner-next");
const preBtn = document.querySelector(".banner-pre");
let bannerItemWidth = bannerItems[0].offsetWidth;
let bannerLength = bannerItems.length;
let positionX = 0;
let index = 0;
console.log("bannerItemWidth", bannerItemWidth);

function dot() {
    var s="";
    s+='<li class="banner-dot-item active" data-index="0"></li>';
    for(i=1;i<bannerLength;i++) {
        s+='<li class="banner-dot-item" data-index="'+i+'"></li>';
    } 
    document.getElementById("list").innerHTML=s;
}

window.onload = function() {
    dot();
    const dotItems = document.querySelectorAll(".banner-dot-item");

    [...dotItems].forEach((item) =>
        item.addEventListener("click", function(e) {
            [...dotItems].forEach(el=>el.classList.remove("active"));
            e.target.classList.add("active");
            const bannerIndex= parseInt(e.target.dataset.index);
            index=bannerIndex;
            positionX=-index*bannerItemWidth;
            bannerMain.style = 'transform: translateX('+positionX+'px)';
            
        })
    );

    function autoColorClick(){
        handleChangeslide(1);
        active_dot();
    }
    setInterval(autoColorClick,10000);

    function active_dot() {
        [...dotItems].forEach(el=>el.classList.remove("active"));
        dotItems[index].classList.add("active");
    }

    nextBtn.addEventListener("click", function () { 
        handleChangeslide(1);
        active_dot();
    });

    preBtn.addEventListener("click", function () { 
        handleChangeslide(-1);
        active_dot();
    });

    function handleChangeslide (direction) {
        if (direction==1) {
            index++;
            if (index >= bannerLength) {
                index=0;
                positionX = 0;    
            } else positionX = positionX - bannerItemWidth;    
            bannerMain.style = 'transform: translateX('+positionX+'px)';
        } else if (direction == -1) {
            index--;
            if (index < 0) {
                index=bannerLength-1;
                positionX = -((bannerLength-1)*bannerItemWidth);    
            } else positionX = positionX + bannerItemWidth;    
            bannerMain.style = 'transform: translateX('+positionX+'px)';
        }
    }
}


window.addEventListener("resize", function() {
    bannerItemWidth = bannerItems[0].offsetWidth;
    bannerLength = bannerItems.length;
    positionX=-index*bannerItemWidth;
    bannerMain.style = 'transform: translateX('+positionX+'px)';
});
