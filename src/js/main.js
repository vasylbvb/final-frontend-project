$.getJSON("js/database/databaseTables.json", function (dani) {
    $('#data-table').DataTable({
        data: dani,
        columns: [
            {data: "Name"},
            {data: "Country"},
            {data: "City"},
            {data: "Phone"},
            {data: "ID"},
            {data: "CardNumber"}
        ]
    });
});

(function () {
    var form = document.querySelector(".validate-this");
    var textFn = form.firstName,
        textLn = form.lastName,
        textEmail = form.eMail,
        textMsg = form.message;

    form.addEventListener("submit", validate);

    function validate(e) {
        e.preventDefault();

        var form = this,
            inputs = form.querySelectorAll("[data-error]");

        clear(inputs, function () {
            checkIsEmpty(inputs);
        });

        function checkIsEmpty(inputs) {
            var isEmpty = false;

            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];

                if (input.value.trim() === "") {
                    isEmpty = true;
                    markInput(input);
                }
            }

            if (!isEmpty) {
                setTimeout(function () {
                    alert("checking is complete");
                    form.submit();
                }, 300);
            }

        }

        function markInput(input) {
            input.classList.add("error");
            var text = input.getAttribute("data-error");

            if (!text) return;

            var div = document.createElement("div");

            div.textContent = text;
            div.className = "error-text";
            input.parentNode.appendChild(div);
        }

        function clear(inputsItem, callback) {
            for (var i = 0; i < inputsItem.length; i++) {
                var input = inputsItem[i],
                    parent = input.parentNode,
                    messagerr = parent.querySelector(".error-text");

                input.classList.remove("error");
                if (messagerr) parent.removeChild(messagerr);
            }

            if (callback) callback();
        }
    }
}());

var sbmtBtn = document.getElementById("sbmBtn");

sbmBtn.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/feedback");
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function(){
        if(this.readyState !==4){
            return;
        }
        var out = document.createElement("div");
        var jsonString = this.responseText;
        out.innerText = jsonString;
        document.body.appendChild(out);
    };
    var data ={
        firstName: "",
        lastName: "",
        emailAddress: "",
        message: ""
    };
    var str = JSON.stringify(data);
    xhr.send(str);
});