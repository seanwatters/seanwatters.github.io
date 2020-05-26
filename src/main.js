document.addEventListener('DOMContentLoaded', () => {
  const host = "seanwatters.io"
  if (window.location.host === host && window.location.protocol === "http:") {
    window.location.protocol = "https:"
  }
})
