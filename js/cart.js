initCart();
cartList = JSON.parse(localStorage.getItem('cartList')); //danh sách toàn bộ cart của toàn bộ user

function findProduct(id) {
    selectCart(); // Cập nhật userCart trước khi tìm kiếm
    for (let i = 0; i < userCart.length; i++) {
        if (userCart[i].id === id) return i;
    }
    return -1;
}
function insertCart(id, amount) {
    product = getProduct(id);

    let temp = {
        username: userLogin,
        id: id,
        name: product.name,
        img: product.img,
        brand: product.brand,
        amount: amount,
        remain: product.remain,
        price: product.price,
        total: product.price * amount,
        checked: true
    };

    cartList.push(temp);
    localStorage.setItem('cartList',JSON.stringify(cartList));
}

function updateCart(id, amount) {
    selectCart(); // Cập nhật userCart trước khi cập nhật
    for (let i = 0; i < userCart.length; i++) {
        if (userCart[i].id === id) {
            userCart[i].amount = Number(userCart[i].amount) + Number(amount);
            userCart[i].total = Number(userCart[i].total) + Number(userCart[i].price) * Number(amount);
            break;
        }
    }
    // Cập nhật cartList sau khi cập nhật userCart
    for (let i = 0; i < cartList.length; i++){
        if(cartList[i].username === userLogin && cartList[i].id === id){
            cartList[i].amount = userCart[i].amount;
            cartList[i].total = userCart[i].total;
            break;
        }
    }
    localStorage.setItem('cartList', JSON.stringify(cartList));
}

function deleteCart(id) {
    cartList.splice(cartList.findIndex(cart => cart === userCart[id]), 1);
    localStorage.setItem('cartList',JSON.stringify(cartList));
    if (cartList.length === 0) location.reload();
    displayCart();
}

function deleteAllCart() {
    while (true) {
        let index = cartList.findIndex(cart => cart.username === userLogin);
        if (index === -1) break;
        cartList.splice(index);
    }
    localStorage.setItem('cartList',JSON.stringify(cartList));
    location.reload();
    displayCart();
}

//danh sách cart của user đang đăng nhập, chỉ dùng để output
let userCart = [];

function selectCart() {
    userCart = [];
    for (let i=0; i<cartList.length; i++)
        if (cartList[i].username === userLogin)
            userCart.push(cartList[i]);
}
function applyDiscount() {
    let codeInput = document.getElementById("discount-code").value.trim();
    let discountMessage = document.getElementById("discount-message");
    let discountCode = "HIACINOFFCIAL20"; // Mã hợp lệ
    let discountRate = 0.2; // Giảm 20%
    let totalPrice = 0;

    if (codeInput === discountCode) {
        selectCart(); // Đảm bảo userCart được cập nhật

        userCart.forEach(item => {
            let originalPrice = item.price; // Lấy giá gốc từ userCart
            let newPrice = originalPrice * (1 - discountRate);
            item.total = newPrice * item.amount; // Cập nhật tổng tiền trong userCart
            totalPrice += item.total;
        });

        // Cập nhật hiển thị giỏ hàng
        displayCart(); // Giả sử bạn có hàm displayCart() để cập nhật hiển thị

        document.getElementById("tong-hang").innerText = totalPrice.toLocaleString("vi-VN") + "$";

        localStorage.setItem("totalPrice", totalPrice);
        localStorage.setItem("discountCode", codeInput);

        discountMessage.innerText = "Valid coupon code! 20% off applied";
        discountMessage.classList.remove("text-danger");
        discountMessage.classList.add("text-success");
    } else {
        discountMessage.innerText = "Invalid coupon code!";
        discountMessage.classList.remove("text-success");
        discountMessage.classList.add("text-danger");
    }
}

function makeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = userCart.reduce((sum, item) => sum + item.total, 0);
    localStorage.setItem("totalPrice", totalPrice); // Lưu lại giá sau giảm
    
    let discountCode = localStorage.getItem("discountCode") || ""; // Lấy mã giảm giá

    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    let userOrder = JSON.parse(localStorage.getItem("orderList")) || [];

    let newOrder = {
        order: cart,
        total: totalPrice,  // Lưu giá sau giảm
        date: new Date().toLocaleString(),
        status: "Chờ xác nhận",
        discountCode: discountCode // Lưu mã giảm giá
    };

    userOrder.push(newOrder);
    localStorage.setItem("orderList", JSON.stringify(userOrder));

    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi đặt
    localStorage.removeItem("totalPrice"); // Xóa giá giảm để tránh lỗi
    localStorage.removeItem("discountCode");
    
    window.location.href = "order.html"; // Chuyển sang trang lịch sử đơn hàng
}

