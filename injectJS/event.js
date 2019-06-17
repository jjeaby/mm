export function event() {

    let node = window.document;
    let longpress = false;
    let presstimer = null;
    let longtarget = null;

    const cancel = function (e) {
        if (presstimer !== null) {
            clearTimeout(presstimer);
            presstimer = null;
        }

    };

    const click = function (e) {
        if (presstimer !== null) {
            clearTimeout(presstimer);
            presstimer = null;
        }


        if (longpress) {
            void (0);
        }

        // alert("press");

    };


    const start = function (e) {
        if (e.type === "click" && e.button !== 0) {
            void (0);
        }
        // alert(e.target.textContent);

        longpress = false;

        if (presstimer === null) {
            presstimer = setTimeout(function () {
                // alert("long click");


                const url = "https://api.github.com/orgs/nodejs";

                try {


                    fetch(url, {
                        method: "post",
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: 1,
                            src: e.target.textContent,
                            translate_type: "enko",
                            document_type: "test",
                            test_req: "False",
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Prints result from \`response.json()\` in getRequest
                            // alert(data.login)
                            // e.target.textContent = e.target.textContent +  "\\n"  + data.message;
                            e.target.textContent = data.message;

                        })

                } catch (e) {
                    alert(e);
                }

                // alert(e.target.textContent);
                longpress = true;
                void (0);
            }, 130);
        }

        void (0);
    };

    node.addEventListener("mousedown", start);
    node.addEventListener("click", click);
    node.addEventListener("touchstart", start);
    node.addEventListener("mouseout", cancel);
    node.addEventListener("touchend", cancel);
    node.addEventListener("touchleave", cancel);
    node.addEventListener("touchcancel", cancel);

    node.oncontextmenu = function (e) {
        e.preventDefault();
    };
}
