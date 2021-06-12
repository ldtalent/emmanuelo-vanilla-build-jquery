# emmanuelo-vanilla-build-jquery
### How to use vanilla JS to build a basic a cutome jQuery global function

# Usage.

```JavaScript

$(document)
    .ready(function () {

        $(document)
            .on("click", ".next", function () {

                const currentImg = $(".active")
                const nextImg = currentImg.next()

                if (nextImg.length) {
                    currentImg.removeClass("active").css("z-index", -10)

                    nextImg.addClass("active").css("z-index", 10)
                }
            })

        $(".prev").on("click", function () {

            const currentImg = $(".active")
            const prevImg = currentImg.prev()

            if (prevImg.length) {
                currentImg.removeClass("active").css("z-index", -10)

                prevImg.addClass("active").css("z-index", 10)
            }

        })

        // Demonstrating use of custom jQuery functions

        $('.bold-text').bold().size('20px')
        $('.color-text').greenify().size('15px')
        $('.bold-and-color-text').bold().greenify()
        $('.underline-text').underline()

    })

$.get({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    success: data => {
        console.log("First success", data)
    }}).done(data => console.log("Second success", data))
    .fail(e => console.error("Fail", e))
    .always(() => console.log("Always"))

```
