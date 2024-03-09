export function isValidPhoneNumber(phoneNumber: string) {
  const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
  if (!phoneNumber) {
    return false;
  }

  if (pattern.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}
