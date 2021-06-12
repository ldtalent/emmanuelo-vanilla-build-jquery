/**
 * ElementCollection class extends a generic Array class which provides a
 * number of array methods which allows us to encapsulate the array functionalities.
 */

class ElementCollection extends Array {

    /**
     * The ready function is to check if the DOM Elements are loaded before selecting them.
     * It receives a callback function cb which is called when the DOM is already fully loaded.
     * @param {*} cb
     * @returns ElementCollection
     */
    ready(cb) {

        /**
         * The ready function is called on and element like document e.g. $(document).ready(),
         * so we need to check if some of the element in the collection is ready.
         * We are using the some array method which runs through all the elements and
         * ruturns true if some of elements gets ready and false otherwise
         */
        const isReady = this.some(e => {
            return e.readyState != null && e.readyState != "loading"
        })

        if (isReady) {

            /**
             * Call the callback (cb) immediately if DOM content is ready
             */
            cb()

        } else {

            /**
             * Add and event listener of DOMContentLoaded and then call the callback (cb)
             * So let's define the on function?
             */
            this.on("DOMContentLoaded", cb)

        }

        return this

    }

    /**
     * The on function takes in the following parameters
     * @param {*} event this is the event to the element or selector should listen to
     * @param {*} cbOrSelector the second parameter can either be a callback or a selector
     * @param {*} cb the third element is always an optional callback
     * @returns ElementCollection
     */
    on(event, cbOrSelector, cb) {

        /**
         * Check if the second parameter is a function.
         * If yes, then it's a callback
         * else
         * It's a selector
         */
        if (typeof cbOrSelector === "function") {

            /**
             * Run through each individual element and add the event listener with the callback
             */
            this.forEach(e => e.addEventListener(event, cbOrSelector))

        } else {

            /**
             * Again run through each individual element and add the event listener but for this time,
             * for every event listener you add, check if the target which is what's clicked for example matches the selector cbOrSelector,
             * then call the callback (cb) and pass in the even.
             * Example code
             * <code>
             *     $('.table').on('click','.tr-btn', function(e) {})
             * </code>
             * Essentially meaning, for every tr-btn inside the table,
             * check which tr-btn is clicked and call the callback (cb) with the event
             */
            this.forEach(element => {
                element.addEventListener(event, e => {
                    if (e.target.matches(cbOrSelector)) 
                        cb(e)
                })
            })

        }

        return this

    }

    /**
     * The next function returns the next sibling in the collection.
     * In this case it will return the next sibling in $('.active') selector
     *
     * @returns Array
     */
    next() {

        /**
         * Create a new collection with next element siblings and only return to us elements which are not null
         */
        return this
            .map(e => e.nextElementSibling)
            .filter(e => e != null)
    }

    /**
     * The prev function returns the previous sibling in the collection.
     * In this case it will return the previous sibling in $('.active') selector
     *
     * @returns Array
     */
    prev() {

        /**
         * Create a new collection with previous element siblings and only return to us elements which are not null
         */
        return this
            .map(e => e.previousElementSibling)
            .filter(e => e != null)

    }

    /**
     * This function takes in the class name and removes it to the element(s)
     * @param {*} className
     * @returns ElementCollection
     */
    removeClass(className) {

        /**
         * Run through the elements collection and for each element,
         * locate the classList object then remove the class name
         */
        this.forEach(e => e.classList.remove(className))

        return this

    }

    /**
     * This function takes in the class name and adds it to the element(s)
     * @param {*} className
     * @returns ElementCollection
     */
    addClass(className) {

        /**
         * Run through the elements collection and for each element,
         * locate the classList object then add the class name
         */
        this.forEach(e => e.classList.add(className))

        return this

    }

    /**
     * The function takes in the css property to modify and then the value modified
     * NOTE: jQuery accepts the normal css property like font-size, but then
     * the style property of an element accepts camel case style like fontSize,
     * so we need to convert the normal style to camel case before apply the value to it.
     *
     * @param {*} property
     * @param {*} value
     * @returns ElementCollection
     */
    css(property, value) {

        /**
         * Check for anytime there is a an hythen(-) followed any number between a to z,
         * then select the hythen(-) and the first letter after the hythen(-) and return to the group.
         * After this, get the group, replace the hythen(-) with nothing/empty string and
         * then convert the first letter to uppercase
         *
         */
        const camelProp = property.replace(/(-[a-z])/, group => {

            return group
                .replace("-", "")
                .toUpperCase()

        })

        /**
         * Run through the elements and apply the value to the selected property.
         */
        this.forEach(e => (e.style[camelProp] = value))

        return this

    }

    /**
     * A list of all the custom functions with its signatures and implementation
     */

    /**
     * This function gets the color property of the selected element
     * and applies the value of green to.
     * @returns ElementCollection
     */
    greenify() {

        this.css("color", "green")

        return this

    }

    /**
     * This function gets the font-weight property of the selected element
     * and applies the value of bold to it.
     * @returns ElementCollection
     */
    bold() {

        this.css("font-weight", "bold")

        return this

    }

    /**
     *This function gets the font-size property of the selected element
     * and applies the value to it.
     * @param {*} value
     * @returns ElementCollection
     */
    size(value) {

        this.css("font-size", value)

        return this

    }

    /**
     * This function gets the text-decoration property of the selected element
     * and applies the value of underline to it.
     * @returns ElementCollection
     */
    underline() {

        this.css("text-decoration", "underline")

        return this

    }

}

/**
 * AjaxPromise class accepts a promise in it's constructor then performs all the specified
 * function operations to the promise
 */
class AjaxPromise {

    constructor(promise) {
        this.promise = promise
    }

    /**
     * The done function gets the promise and calls the then function to get the data, it then sends it to a callback
     * then returns a new promise
     * @param {*} cb
     * @returns AjaxPromise
     */
    done(cb) {

        this.promise = this
            .promise
            .then(data => {
                cb(data)
                return data
            })

        return this

    }

    /**
     * The fail function gets the promise and calls the catch function to get the error incase of an error,
     * it then sends it to a callback then returns a new promise
     * @param {*} cb
     * @returns AjaxPromise
     */
    fail(cb) {

        this.promise = this.promise.catch(cb);

        return this

    }

    /**
     * The always function gets the promise and calls the finally function and calls a callback then returns a new promise
     * @param {*} cb
     * @returns AjaxPromise
     */
    always(cb) {

        this.promise = this
            .promise
            . finally(cb)

        return this

    }

}

/**
 * The $ function
 * It takes in a param which can either be a string like class selector .active or
 * an element selector like div
 * @param param
 * @returns ElementCollection
 *
 */
function $(param) {

    /**
     * Return an ElementCollection instance with a querySelectorAll of the param like $('.active')
     * else
     * Return an ElementCollection instance with the param which is an element like $('div')
     */
    if (typeof param === "string" || param instanceof String) {

        /**
         * querySelectorAll returns HTMLElement collection
         * we need to use the spread syntax ... to convert it to an array.
         */
        return new ElementCollection(...document.querySelectorAll(param))

    } else {

        /**
         * The param here in this case is converted to an array through literal constructor
         * Essentially this is similar to doing this [param] sinces ElementCollection extends Array class
         */
        return new ElementCollection(param)

    }

}

/**
 * The get function takes in a number of object parameter as object properties,
 * In this case, we shall use the following parameters.
 *
 * url: this is the endpoint we queryy
 * data: this is the data we send to the endpoint and since this is a get method, we shall use query string structure of url rewriting
 * success: this is the callback function called when operation is successful and response sent to it as a parameter.
 * dataType: this is the type of data we want returned to the client, e.g. json
 *
 * @param {url,data,success,dataType}
 * @returns AjaxPromise
 */
$.get = function ({
    url,
    data = {},
    success = () => {},
    dataType
}) {

    /**
     * Since data is passed in as JavaScript Object,
     * We need to convert it to query string. So
     * We loop through object entries and return key value pairs of the format key=value&key=value etc.
     *
     */
    const queryString = Object
        .entries(data)
        .map(([key, value]) => {
            return `${key}=${value}`
        })
        .join("&")

    /**
     * Instantiate the AjaxPromise class and pass in the fetch API promise to it
     */
    return new AjaxPromise(fetchGetPromise(url, queryString, dataType, success))

}

/**
 * This function calls the fetch API with the given parameters.
 * @param {*} url
 * @param {*} queryString
 * @param {*} dataType
 * @param {*} success
 * @returns Promise
 */
function fetchGetPromise(url, queryString, dataType, success) {

    return fetch(`${url}?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": dataType
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error(res.status)
        }
    }).then(data => {
        success(data)
        return data
    })

}
