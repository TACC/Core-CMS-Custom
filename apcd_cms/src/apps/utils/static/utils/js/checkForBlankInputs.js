function noEmptyInputs(inputArr) {
  inputArr.forEach(i => i.addEventListener('change', () => {
    const cleanedValue = i.value.replace(/[^a-zA-Z0-9\s-@!?,%$#&*().]|<script>|<\/script>|'|"|}|{|javascript|JavaScript|\.exe|\.sh/gi, '') // Allow specified characters

    if (cleanedValue.replace(/ /g, '') === '') { 
      i.value = ''; // if input is all spaces, clear it out to leverage <input>'s required prop
    } else {
      i.value = cleanedValue; // Set the cleaned value back to the input
    }
  }))
}