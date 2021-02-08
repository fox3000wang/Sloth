
const compose = (...funcs:any) => {
  return (x:string) => {
    let len = funcs.length;
    if (len === 0) return x;
    if (len === 1) return funcs[0](x);
    return funcs.reduceRight((result:any, item:any) => {
      return item(result);
    }, x);
  };
};

/*
const operate = compose(div2, mul3, add1, add1);
for (let i = 0; i < 1000; i++) {
  console.log(operate(0)); //3
  //console.log(operate(2)); //6
}
*/