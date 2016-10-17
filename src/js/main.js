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
    if (form) {
        var textFn = form.firstName,
            textLn = form.lastName,
            textEmail = form.eMail,
            textMsg = form.message;

        form.addEventListener("submit", validate);
    }
    function validate(e) {
        e.preventDefault();

        var f = this,
            inputs = f.querySelectorAll("[data-error]");

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
                    f.submit();
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


    if (form) {
        form.addEventListener("submit", function () {
            event.preventDefault();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/feedback");
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) {
                    return;
                }
                var out = document.createElement("div");
                var jsonString = this.responseText;
                out.innerText = jsonString;
                document.body.appendChild(out);
            };
            var data = {
                firstName: "",
                lastName: "",
                emailAddress: "",
                message: ""
            };
            var str = JSON.stringify(data);
            xhr.send(str);
        });
    }
}());

var sbmtBtn = document.getElementById("sbmBtn");

$(".preview-thumbnail").click(function () {
    var res = parseFloat(this.getAttribute("data-index"));
    $('.main-slider').carousel(res);
});

$(function () {
    $.scrollUp({
        scrollName: 'scrollUp',      // Element ID
        scrollDistance: 300,         // Distance from top/bottom before showing element (px)
        scrollFrom: 'top',           // 'top' or 'bottom'
        scrollSpeed: 300,            // Speed back to top (ms)
        easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
        animation: 'slide',           // Fade, slide, none
        animationSpeed: 200,         // Animation speed (ms)
        scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
        scrollText: 'Go up', // Text for element, can contain HTML
        scrollTitle: false,          // Set a custom <a> title if required.
        scrollImg: false,            // Set true to use image
        activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647           // Z-Index for the overlay
    });
});