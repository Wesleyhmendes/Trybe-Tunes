const validateEmail = (email: string) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return re.test(String(email).toLowerCase());
};
export default validateEmail;
