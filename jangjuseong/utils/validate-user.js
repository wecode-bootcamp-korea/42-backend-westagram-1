const validatePassword = async (password) => {
  const pwValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@$#$%^&*\-?])[A-Za-z\d~!@$#$%^&*\-?]{8,}/
  );

  if (!pwValidation.test(password)) {
    const err = new Error('🔐 Password Is Invalid Format');
    err.code = 400;
    throw err;
  }
};

const validateEmail = async (email) => {
  const emailValidation = new RegExp(
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  );

  if (!emailValidation.test(email)) {
    const err = new Error('📧 Email Is Invalid Format');
    err.code = 400;
    throw err;
  }
};

module.exports = { validatePassword, validateEmail };
