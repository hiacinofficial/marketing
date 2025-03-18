function filterProduct(filter)  {
    let foundProduct = getProductList();

    let i = 0;
    if (filter.searchString !== undefined && filter.searchString !== null && filter.searchString !== "") {
        filter.searchString = filter.searchString.toLowerCase();
        while (i < foundProduct.length) {
            if (!foundProduct[i].name.toLowerCase().includes(filter.searchString))
                foundProduct.splice(i--, 1);
            ++i;
        }
    }
    
    i = 0;
    if (!(filter.priceMin === 0 && filter.priceMax === 0))
        while (i < foundProduct.length) {
            let temp = Number(foundProduct[i].price);
            if (temp < filter.priceMin || temp > filter.priceMax)
                foundProduct.splice(i--, 1);
            ++i;
        }

    i = 0;
    if (filter.searchBrand.length > 0)
        while (i < foundProduct.length) {
            if (!filter.searchBrand.includes(foundProduct[i].brand))
                foundProduct.splice(i--, 1);
            ++i;
        }

    i = 0;
    if (filter.searchType.length > 0)
        while (i < foundProduct.length) {
            if (!filter.searchType.includes(foundProduct[i].type))
                foundProduct.splice(i--, 1);
            ++i;
        }

    i = 0;
    if (filter.checked)
        while (i < foundProduct.length) {
            if (foundProduct[i].remain === 0)
                foundProduct.splice(i--, 1);
            ++i;
        }

    if (filter.index > 0) {
        if (filter.index === 1 || filter.index === 2) {
            for (i = foundProduct.length - 1; i>0; i--)
                for (let j=0; j<i; j++) {
                    let price1 = Number(foundProduct[j].price);
                    let price2 = Number(foundProduct[j+1].price);
                    if((filter.index === 1 && price1 > price2) || (filter.index === 2 && price1 < price2))
                        [foundProduct[j], foundProduct[j+1]] = [foundProduct[j+1], foundProduct[j]];
                }
        }
        else {        
            for (i = foundProduct.length - 1; i>0; i--)
                for (let j=0; j<i; j++) {
                    let letter1 = foundProduct[j].name.toLowerCase();
                    let letter2 = foundProduct[j+1].name.toLowerCase();
                    if((filter.index === 3 && letter1 > letter2) || (filter.index === 4 && letter1 < letter2))
                        [foundProduct[j], foundProduct[j+1]] = [foundProduct[j+1], foundProduct[j]];
                }
        }
    }
    localStorage.setItem('productsList', JSON.stringify(foundProduct));
}

function initCart(){
    if (localStorage.getItem('cartList') === null) {
        let initCart = [];
        localStorage.setItem('cartList',JSON.stringify(initCart));
    }
}

function initOrder() {
    let initOrder = getOrderList(userLogin);
    localStorage.setItem('orderList',JSON.stringify(initOrder));
}