onload = function (){
  initOrder();
  userOrder = JSON.parse(localStorage.getItem('orderList'));
  displayOrder();
}

function emptyOrder() {
  if (userLogin === "") {
      document.getElementById("order-empty-message").innerHTML = "You need to login to view order history!!!";
      return true;
  }

  if (userOrder.length === 0) {
      document.getElementById("order-empty-message").innerHTML = `You have not placed any orders yet.!!!`;
      return true;
  }
  return false;
}

function displayOrder() {
    if (emptyOrder()) {        
        $('#order-list').css("display", "none");
        return;
    }
    $('#order-empty').css("display", "none");    

    let display = "";
    let userOrder = JSON.parse(localStorage.getItem("orderList")) || [];

    for (let i = 0; i < userOrder.length; i++) {
        let order = userOrder[i];
      let totalPrice = order.total;
if (order.discountValue) {
    totalPrice = Math.max(0, order.total - order.discountValue); // Đảm bảo giá không âm
}

        let discountCode = order.discountCode ? `(${order.discountCode})` : "";

        for (let j = 0; j < order.order.length; j++) {
            if (j === 0) {
                display += `        
                    <tr style="padding: 0px">
                        <td>
                            <img src="${order.order[j].img}" alt="" width="80%">
                        </td>
                        <td>${order.order[j].name}<br>Số lượng: ${order.order[j].amount}</td>
                        <td rowspan="${order.order.length}">${getGia(totalPrice)} ${discountCode}</td>
                        <td rowspan="${order.order.length}">${order.date}</td>
                        <td rowspan="${order.order.length}">${order.status}</td>
                `;

                if (order.status === "Chờ xác nhận") {
                    display += `
                        <td rowspan="${order.order.length}">
                            <button class="btn btn-danger" onclick="checkHuy(${i})">Hủy</button>
                        </td>
                    </tr>`;  
                } else {
                    display += `
                        <td rowspan="${order.order.length}">
                            <button class="btn btn-danger disable">Hủy</button>
                        </td>
                    </tr>`;
                }
            } else {
                display += `        
                    <tr style="padding: 0px">
                        <td>
                            <img src="${order.order[j].img}" alt="" width="80%">
                        </td>
                        <td>${order.order[j].name}<br>Số lượng: ${order.order[j].amount}</td>
                    </tr>`;
            }
        }
    }
    document.getElementById("order-body").innerHTML = display;
}



function checkHuy(index) {
    document.getElementById("cancelModal").innerHTML = `    
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cancelModalLabel">Xác nhận</h5>
                </div>
                <div class="modal-body">
                    Bạn có muốn hủy hàng?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" onclick="huyDonHang(${index})">Yes</button>
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    `;
    new bootstrap.Modal(document.getElementById("cancelModal")).show();
}

function huyDonHang(index) {
  deleteOrder(userOrder[index].date,userLogin);
  successMessage("Order Cancellation Successful", 1500);
  setTimeout(() => location.reload(), 1500);
}
