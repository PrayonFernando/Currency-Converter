export function numberToWords(num) {
  if (num === 0) return "zero";
  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const g = ["", "thousand", "million", "billion"];
  const chunkToWords = (n) => {
    let str = "";
    if (n >= 100) {
      str += a[Math.floor(n / 100)] + " hundred ";
      n = n % 100;
    }
    if (n >= 20) {
      str += b[Math.floor(n / 10)];
      if (n % 10) {
        str += "-" + a[n % 10];
      }
    } else if (n > 0) {
      str += a[n];
    }
    return str.trim();
  };
  let words = "";
  let chunkIndex = 0;
  num = Math.round(num);
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      let chunkWord = chunkToWords(chunk);
      if (g[chunkIndex]) {
        chunkWord += " " + g[chunkIndex];
      }
      words = chunkWord + (words ? " " + words : "");
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }
  return words;
}

export function getCurrencySymbol(currency) {
  switch (currency) {
    case "USD":
      return "$";
    case "LKR":
      return "Rs.";
    case "AUD":
      return "A$";
    case "INR":
      return "₹";
    default:
      return "";
  }
}

export function getCurrencyName(currency) {
  switch (currency) {
    case "USD":
      return "dollars";
    case "LKR":
      return "Sri Lankan rupees";
    case "AUD":
      return "Australian dollars";
    case "INR":
      return "Indian rupees";
    default:
      return currency;
  }
}
