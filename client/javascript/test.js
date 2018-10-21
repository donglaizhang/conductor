function a(...args){
  b(...args);
  b(6, ...args, 8) // You can even add more elements
}
function b(){
  console.log(arguments)
}

a(1, 2, 3)
