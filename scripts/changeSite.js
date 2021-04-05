const changeButton = document.getElementsByClassName("change")[0] ;

changeButton.addEventListener('click', () => {
  window.open(changeButton.value) ;
})