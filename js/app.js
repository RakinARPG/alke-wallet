let saldo = 1000;


$("#loginForm").on("submit", function(e) {
  e.preventDefault();
  localStorage.setItem("logged", "true");
  window.location.href = "index.html";
});


$("#btnDepositar").on("click", function() {
const monto = Number($("#montoDeposito").val());
if (monto > 0) {
saldo += monto;
$("#saldo").text(saldo);
alert("Depósito realizado");
}
});

$("#skipLogin").on("click", function () {
  localStorage.setItem("logged", "true");
  window.location.href = "menu.html";
});
