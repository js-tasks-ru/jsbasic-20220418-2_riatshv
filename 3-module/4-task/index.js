function showSalary(users, age) {
  let str = "";
	users.filter(item => item.age <= age)
    .forEach((item, ndx, array) => {
    if (ndx == array.length - 1) return  str += `${item.name}, ` + `${item.balance}`;
    
    return  str += `${item.name}, ` + `${item.balance}\n`
  });
  
  return str;
}
