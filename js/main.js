/**
 * Select the document then call the ready function which then checks if DOM content is loaded,
 * then executes the callback.
 */
$(document)
    .ready(function () {

        $(document)
            .on("click", ".next", function () {

                const currentImg = $(".active")
                const nextImg = currentImg.next()

                /**
                 * Check if there is a next image then perform an action
                 */
                if (nextImg.length) {

                    /**
                     * Remove the active class from the current image and hide it behind the next image
                     */
                    currentImg
                        .removeClass("active")
                        .css("z-index", -10)

                    /**
                     * Add the active class to the next image and show it infront of the current image
                     */
                    nextImg
                        .addClass("active")
                        .css("z-index", 10)

                }
            })

        $(".prev").on("click", function () {

            const currentImg = $(".active")
            const prevImg = currentImg.prev()

            /**
             * Check is there is a previous image then perform an action
             */
            if (prevImg.length) {

                currentImg
                    .removeClass("active")
                    .css("z-index", -10)

                prevImg
                    .addClass("active")
                    .css("z-index", 10)

            }

        })

        // Demonstrating use of custom jQuery functions

        /**
         * Select all elements having this class and bold the text
         */
        $('.bold-text').bold()

        /**
         * Select all elements having this class then, change text color to green and change the font size to 15px
         */
        $('.color-text')
            .greenify()
            .size('15px')

        /**
         * Select all elements having this class then, bold and change the text color to green
         */
        $('.bold-and-color-text')
            .bold()
            .greenify()

        /**
         * Select all elements having this class and underline text
         */
        $('.underline-text').underline()

    })

$.get({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    success: data => {
        console.log("First success", data)
    }
})
    .done(data => console.log("Second success", data))
    .fail(e => console.error("Fail", e))
    .always(() => console.log("Always"))
