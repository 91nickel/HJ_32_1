let counter;
updateCount();
document.querySelectorAll('.list-block input').forEach((el) => {
  el.addEventListener('click', updateCount)
});

function updateCount(){
  let list = document.querySelectorAll('.list-block input');
  counter = 0;
  let activeCheckboxes = list.forEach((el)=>{
    if (el.checked){
      counter++;
    }
  });
  console.log(counter);
  if (counter === list.length) {
    listComplete(true);
  } else {
    listComplete();
  }
  document.querySelector('output').innerHTML = counter;
}
function listComplete(el){
  let complete = document.getElementsByClassName('list-block')[0];
  if (el){
    complete.classList.add('complete');
  } else {
    complete.classList.remove('complete');
  }
  
}