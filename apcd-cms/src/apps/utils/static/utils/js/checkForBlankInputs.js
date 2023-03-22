function noEmptyInputs(inputArr) {
  inputArr.forEach(i => i.addEventListener('change', () => {
      if (i.value.replace(/ /g, '') === '') { 
        i.value = ''; // if input is all spaces, want to clear it out to leverage <input>'s required prop
      }
  }))
}