window.addEventListener('DOMContentLoaded', () => {
    links('.header__menu-item')
})

const links = selector => {
    const linksItems = document.querySelectorAll(selector)

    linksItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            linksItems.forEach(link => link.classList.remove('active'))
            item.classList.add('active')
        })
    })
}