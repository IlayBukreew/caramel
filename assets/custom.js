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

  const isProductPage = document.body.classList.contains('template-product')
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
      const flickityDiv = document.querySelector(
          ".story_block_three .flickity-slider"
        ),
        containers = document.querySelectorAll(".container_block_three")

      if (flickityDiv && document.body.classList.contains("template-index")) {
        let flickWidth = flickityDiv.getBoundingClientRect().left + 10
        containers.forEach((container) => {
          container.style.margin = ` 0 ${flickWidth}px`
        })
      }
    }
  }
  // copy logo to mobile sidebar
  function logoCopy() {
    const divToInsert = document.getElementById("mobile_menu_logo"),
      logo = document.querySelector(".Header__Wrapper .Header__LogoImage").cloneNode()
    divToInsert.appendChild(logo)
  }

  function logoCopy1() {
    const divToInsert = document.getElementById("mobile_menu_logo_sidebar")
    if (divToInsert) {
      const logo = document
        .querySelector(".Header__Wrapper .Header__LogoImage")
        .cloneNode()
      divToInsert.appendChild(logo)
    }
  }

  // header sidebar
  function sidebar() {
    const links = document.querySelectorAll(
        ".Header__MainNav li.HorizontalList__Item"
      ),
      mainDiv = document.getElementById("main"),
      dropdownLinks = document.querySelectorAll(".DropdownMenu .Link"),
      mainNav = document.querySelector(".Header__MainNav")

    //close menu
    function closeMenu() {
      mainNav.classList.remove("open")
      links.forEach((link) => {
        link.childNodes[2] ? link.childNodes[2].classList.remove("open") : null
      })
    }
    // open menu
    function openMenu(event) {
      links.forEach((link) => {
        if (link.childNodes[1].getAttribute("href") != "/") {
          event.preventDefault()
          link.childNodes[2] ? link.childNodes[2].classList.add("open") : null
          mainNav.classList.add("open")
        }
      })
      event.target.nextElementSibling ?
        (event.target.nextElementSibling.style.zIndex = 2) :
        null
    }
    // switching between menus
    function switchMenu(event) {
      links.forEach((link) => {
        link.childNodes[2] ? (link.childNodes[2].style.zIndex = "1") : null
      })
      event.target.childNodes[2] ?
        (event.target.childNodes[2].style.zIndex = "2") :
        null
    }

    // fix link functionality
    dropdownLinks.forEach((link) => {
      link.onclick = () => {
        window.location = link.getAttribute("href")
      }
    })
    // listeners for links
    links.forEach((link) => {
      link.onmouseenter = (e) => {
        openMenu(e)
        switchMenu(e)
      }
      link.onmouseleave = () => {
        closeMenu()
      }
    })

    // close menu by clicking page
    mainDiv.onclick = () => {
      closeMenu()
    }
  }

  // product button observer
  // for atc button fix
  function atcObserver() {
    const target = document.querySelector('[data-action="add-to-cart"]')
    if (target) {
      const arrow = target.querySelector(".button_arrow")
      const config = {
        attributes: false,
        childList: true,
        subtree: false,
      }
      const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            observers.disconnect()
            target.appendChild(arrow)
            observers.observe(target, config)
          }
        }
      }
      const observers = new MutationObserver(callback)
      observers.observe(target, config)
    }
  }
  // macOS fix
  function macFix() {
    const arrows = document.querySelectorAll(".Button.Button--primary span")
    arrows.forEach((arrow) => {
      arrow.style.position = "relative"
      arrow.style.top = "3px"
    })
  }

  function sidebarCollection() {
    const close = document.getElementById("close_filters")
    if (close) {
      const buttons = document.querySelectorAll(".template-collection .Collapsible .Collapsible__Button"),
        sidebar = document.querySelector(".CollectionInner__Sidebar"),
        open = document.getElementById("filter_button"),
        mobileClose = document.getElementById("close_icon")
      close.onclick = () => {
        sidebar.classList.add("hidden")
      }
      mobileClose.onclick = () => {
        sidebar.classList.add("hidden")
      }
      open.onclick = () => {
        sidebar.classList.remove("hidden")
      }
      buttons.forEach((button) => {
        button.onclick = () => {
          button.parentElement.classList.toggle("active")
        }
      })
    }
  }

  function sizeGuide() {
    const button = document.getElementById('size_guide'),
      popup = document.getElementById('size_pop_up')
    if (button) {
      button.onclick = () => {
        popup.classList.add('open')
        document.documentElement.style.overflow = 'hidden'
      }
    }
    popup.onclick = () => {
      popup.classList.remove('open')
      document.documentElement.style.overflowY = 'scroll'
    }
  }

  function checkOutOfStock(element) {
    console.log('neloh');
    const className = 'ProductForm__Option'
    // base on product selector find and disable sizes labels that out of stock
    const select = element ? document.querySelector(`.${className} select`) : document.querySelector('.ProductForm__Option select'),
      sizeLabels = element ? document.querySelectorAll(`.${className} .SizeSwatchList li`) : document.querySelectorAll('.SizeSwatchList li'),
      outOfStockItems = []

    for (let option of select.options) {
      if (option.getAttribute('disabled')) {

        let optionName_split1 = option.innerText.split('/')[1] || option.innerText,
          optionName_split2 = optionName_split1.split('-')[0].trim()
        outOfStockItems.push(optionName_split2)
      }
    }
    const sizesArray = Array.from(sizeLabels)
    const optionsLable = sizesArray.map(el => {
      return el = el.lastElementChild
    })
    outOfStockItems.forEach(item => {
      let optionOutOfStock = optionsLable.find(el => el.textContent == item)
      optionOutOfStock ? optionOutOfStock.classList.add('disabled') : null
    })

  }




  function anchorRewriteFunc() {
    let anchors = document.querySelectorAll('.anchor-rewrite')

    anchors.forEach(anchor => {
      anchor.onclick = (e) => {
        e.preventDefault()
        let link = anchor.getAttribute('href')
        let scrollToElement = link ? document.getElementById(link) : null
        let elemTop = scrollToElement.getBoundingClientRect().top
        window.scrollTo({
          top: elemTop - 40,
          behavior: "smooth"
        });
      }
    })
  }

  anchorRewriteFunc()
  if (isProductPage) {
    sizeGuide()
    checkOutOfStock()
    atcObserver()
  }
  sidebarCollection()
  //mac os fix
  if (navigator.platform == "MacIntel") {
    macFix()
  }

  sidebar()
  logoCopy()
  logoCopy1()
  footerAccordion()
  getFlickWidth()
  window.onresize = () => {
    getFlickWidth()
  }
})