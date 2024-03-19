const bcrypt = require("bcrypt");
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

function decimalToBase62(n) {
  const base62Digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (n === 0) {
    return "0";
  }

  let base62 = "";

  while (n > 0) {
    const remainder = n % 62;
    base62 = base62Digits[remainder] + base62;
    n = Math.floor(n / 62);
  }

  return base62;
}

function base62ToDecimal(s) {
  const base62Digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decimalNumber = 0;

  for (let i = 0; i < s.length; i++) {
    decimalNumber +=
      base62Digits.indexOf(s.charAt(i)) * Math.pow(62, s.length - i - 1);
  }

  return decimalNumber;
}


module.exports = {
  hashPassword,
  comparePassword,
  decimalToBase62,
  base62ToDecimal
};
