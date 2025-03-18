onload = () => {
    displayCart();
}

function emptyCart() {
    if (userLogin === "") {
        document.getElementById("cart-empty-message").innerHTML = "You need to login to shop!!!";
        return true;
    }
    selectCart()
    if (userCart.length === 0) {
        document.getElementById("cart-empty-message").innerHTML = `You need to add <a href="./san-pham.html" style="text-decoration:none;">product</a> to cart!!!`;
        return true;
    }
    return false;
}

function getTotal() {
    let total = 0;
    for (let i=0; i<userCart.length; i++)
        if (userCart[i].checked) total += Number(userCart[i].total);
    return total;
}

function displayCart() {
    if (emptyCart()) {
        $('#cart-list').css("display", "none");
        $("#cart-action").css("display", "none");
        return;
    }
    document.getElementById("cart-body").innerHTML = "";
    $('#cart-empty').css("display", "none");
    let display = "";
    for (let i=0; i<userCart.length; i++) {
        let item = userCart[i];
        display += `        
            <tr class="p-0">
                <td>
                    <input type="checkbox" class="check" onclick="checkChanged(${i})">
                </td>
                <td>
                    <img src="${item.img}" alt="" width="80%">
                </td>
                <td>${item.name}</td>
                <td>
                    <input type="number" class="text-center" value="${item.amount}" min="1" max="" style="width: 60px" onchange="tinhTong(this, ${i})" onkeyup="checkKey(this, event);">
                </td>
                <td>${getGia(item.total)}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCart(${i})">delete</button>
                </td>
            </tr>        
        `;
    }
    document.getElementById("cart-body").innerHTML = document.getElementById("cart-body").innerHTML + display + `
        <tr style="padding: 0px;font-size: 20px;">
            <th colspan="4" class="text-end">TỔNG:</th>
            <th colspan="2" id="tong-hang">${getGia(getTotal())}</th>
        </tr>
    `;
    $("#cart-action").css("display", "initial");
    for (let i=0; i<userCart.length; i++)
        document.querySelectorAll(".check")[i+1].checked = userCart[i].checked;

    autoCheckAll();
}

function tinhTong(input, i) {
    if (input.value === "") {
        input.value = cartList[i].amount;
        return
    }
    const index = cartList.findIndex(cart => cart === userCart[i]);
    cartList[index].amount = Number(input.value);
    cartList[index].total = Number(cartList[index].price) * cartList[index].amount;
    localStorage.setItem('cartList',JSON.stringify(cartList));
    displayCart();
}

function checkChanged(index) {
    userCart[index].checked = !userCart[index].checked;
    autoCheckAll();
    document.getElementById("tong-hang").innerHTML = getGia(getTotal());
    localStorage.setItem('cartList',JSON.stringify(cartList));
}

function checkAllChanged() {
    const status = document.getElementById("check-all").checked;
    for (let i=0; i<userCart.length; i++) {
        document.querySelectorAll(".check")[i+1].checked = status;
        userCart[i].checked = status;
    }
    document.getElementById("tong-hang").innerHTML = getGia(getTotal());
    localStorage.setItem('cartList',JSON.stringify(cartList));
}

function autoCheckAll() {
    for (let i=0; i<userCart.length; i++)
        if (!userCart[i].checked) {
            document.getElementById("check-all").checked = false;
            return;
        }
    document.getElementById("check-all").checked = true;
}

function makeOrder() {
    let order = [];
    let warning = true;
    let total = getTotal();
    const length = userCart.length;
    for (let i=0; i < length; ++i) {
        if (userCart[i].checked) {
            if (userCart[i].amount > userCart[i].remain) {
                dangerMessage(`Bạn đang đặt sản phẩm ${userCart[i].name} với số lượng nhiều hơn tồn kho (${userCart[i].remain})`);
                return
            }
            if (userCart[i].amount == 0) {
                dangerMessage(`Vui lòng thêm số lượng cho ${userCart[i].name}`);
                return
            }
            delete userCart[i].username;
            delete userCart[i].checked;
            order.push(userCart[i]);
            let index = cartList.findIndex(cart => cart === userCart[i]);
            if (index !== -1) cartList.splice(index,1);
            warning = false;
        }
    }
    if (warning) dangerMessage("Vui lòng chọn 1 món để đặt hàng");
    else { 
        themDonHang(new Date().toLocaleString("fr-FR"), userLogin, order, total);
        successMessage("Đặt hàng thành công", 1500);
        setTimeout(() => location.reload(), 1500);
        localStorage.setItem('cartList',JSON.stringify(cartList));
    }
}

function checkKey(input, event) {
    if (event.key === "Backspace" || event.key === "Enter") return;
    if (isNaN(event.key)) input.value = input.min;
}