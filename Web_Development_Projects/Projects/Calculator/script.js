function calculate() {
    var opr1 = document.getElementById('opr1').value;
    var opr = document.getElementById('opr').value;
    var opr2 = document.getElementById('opr2').value;
    var result;

    if (opr === "+") {
        result = parseInt(opr1) + parseInt(opr2);
    }
    if (opr === "-") {
        result = parseInt(opr1) - parseInt(opr2);
    }
    if (opr === "*") {
        result = parseInt(opr1) * parseInt(opr2);
    }
    if (opr === "/") {
        result = parseInt(opr1) / parseInt(opr2);
    }

    document.getElementById('result').value = result;
}