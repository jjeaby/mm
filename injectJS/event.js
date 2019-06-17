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
                // const url = "http://13.209.89.105:18181/trans";
                // const url = "http://70.50.34.231:10801/tranlate";

                try {
                    if(e.target.textContent != null || e.target.textContent != '' || e.target.textContent.length > 0)
                    {
                        // alert(e.target.textContent )
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
                                e.target.textContent = data.message;

                        })
                    }
                } catch (e) {
                    alert(e);
                }

                // alert(e.target.textContent);
                longpress = true;
                void (0);
            }, 500);
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
