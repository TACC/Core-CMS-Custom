function noEmptyInputs(inputArr) {
  inputArr.forEach(i => i.addEventListener('change', () => {
    const cleanedValue = i.value.replace(/[<>';"/]|<script>|<\/script>|'|"|javascript|JavaScript|\.exe/gi, '');
    console.log(cleanedValue);

    if (cleanedValue.replace(/ /g, '') === '') { 
      i.value = ''; // if input is all spaces, clear it out to leverage <input>'s required prop
    } else {
      i.value = cleanedValue; // Set the cleaned value back to the input
    }
  }))
}
