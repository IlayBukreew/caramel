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
  footerAccordion()
  getFlickWidth()
})
