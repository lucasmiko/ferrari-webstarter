export function appendTemplate(element, tagName, html) {

    const wrapElement = document.createElement(tagName)

    wrapElement.innerHTML = html

    element.append(wrapElement)

    return wrapElement

}

export function getQueryString() {
    
    const queryString = {}
    
    if (window.location.search) {

        window.location.search.split("?")[1].split("&").forEach(param => {
            param = param.split("=")

            queryString[param[0]] = decodeURIComponent(param[1])
        })

    } 
    return queryString

}