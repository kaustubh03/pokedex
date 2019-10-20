export function isValidIFSC(ifsc) {
  const ifscPattern = /^[a-zA-Z]{4}[0]{1}[a-zA-Z0-9]{6}$/;
  const ifscLength = 11;

  if (ifscPattern.test(ifsc) && ifsc.length === ifscLength) {
    return true;
  } else {
    return false;
  }
}

export function isValidBankAccountNumber(bankAccountNumber) {
  const bankAccountNumberPattern = /^[0-9a-zA-Z]+$/;
  const bankAccountNumberMinLength = 9;
  const bankAccountNumberMaxLength = 18;

  if (
    bankAccountNumberPattern.test(bankAccountNumber) &&
    bankAccountNumber.length >= bankAccountNumberMinLength &&
    bankAccountNumber.length <= bankAccountNumberMaxLength
  ) {
    return true;
  } else {
    return false;
  }
}
