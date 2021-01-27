/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
document.addEventListener("DOMContentLoaded", function () {
  // footer accordion
  function footerAccordion() {
    const titles = document.querySelectorAll(".Footer__Block .Footer__Title")
    titles.forEach((title) => {
      title.onclick = (el) => {
        titles.forEach((title) => {
          if (title != el.target) {
            title.parentElement.classList.remove("open")
          }
        })
        title.parentElement.classList.toggle("open")
      }
    })
  }

  // get flickity width
  function getFlickWidth() {
    if (window.innerWidth > 1300) {
      const flickityDiv = document.querySelector(".flickity-slider"),
        container = document.querySelector(".container_block_three")
      if (flickityDiv) {
        let flickWidth = flickityDiv.getBoundingClientRect().left + 10
        container.style.margin = ` 0 ${flickWidth}px`
      }
    }
  }
  // copy logo to mobile sidebar
  function logoCopy() {
    const divToInsert = document.getElementById('mobile_menu_logo'),
      logo = document.querySelector('.Header__Wrapper .Header__LogoImage').cloneNode()
    divToInsert.appendChild(logo)
  }
  // header sidebar
  function sidebar() {
    const links = document.querySelectorAll('.Header__Wrapper .HorizontalList__Item'),
      mainDiv = document.getElementById('main'),
      dropdownLinks = document.querySelectorAll('.DropdownMenu .Link'),
      mainNav = document.querySelector('.Header__MainNav')

    //close menu
    function closeMenu() {
      links.forEach(link => {
        link.childNodes[2] ? link.childNodes[2].classList.remove('open') : null
      })
    }
    // open menu
    function openMenu(event) {
      links.forEach(link => {
        if (link.childNodes[1].getAttribute('href') != '/') {
          event.preventDefault()
          link.childNodes[2] ? link.childNodes[2].classList.add('open') : null
          mainNav.classList.add('open')
        }

      })
      event.target.nextElementSibling ? event.target.nextElementSibling.style.zIndex = 2 : null
    }
    // switching between menus 
    function switchMenu(event) {
      links.forEach(link => {
        link.childNodes[2] ? link.childNodes[2].style.zIndex = '1' : null
      })
      event.target.childNodes[2] ? event.target.childNodes[2].style.zIndex = '2' : null
    }

    // fix link functionality
    dropdownLinks.forEach(link => {
      link.onclick = () => {
        window.location = link.getAttribute('href')
      }
    })
    // listeners for links
    links.forEach(link => {
      link.onclick = (e) => {
        openMenu(e)
      }
      link.onmouseenter = (e) => {
        switchMenu(e)
      }
    })


    // close menu by clicking page
    mainDiv.onclick = () => {
      mainNav.classList.remove('open')
      closeMenu()
    }

  }









  sidebar()
  logoCopy()
  footerAccordion()
  getFlickWidth()
  window.onresize = () => {
    getFlickWidth()
  }
})