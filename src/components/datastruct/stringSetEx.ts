let setData = new Set<string>();

setData.add("aa");
setData.add("bb");
setData.add("cc");
setData.has("aa"); //true
setData.has("b"); //false

// 값에 대한 반복문
for (let value of setData.values()) {
    console.log(value);
}