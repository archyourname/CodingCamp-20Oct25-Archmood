/* ===================================================== 
   INDEX PAGE 
===================================================== */ 

function openHome() { 

    sessionStorage.setItem(
        "fromComputer",
        "true"
    );

    document
        .querySelector(".computer-scene")
        .classList.add("zoom-out");

    document
        .querySelector(".instruction")
        .classList.add("hide");

    setTimeout(() => {

        window.location.href =
            "./home.html";

    }, 1200);

}
