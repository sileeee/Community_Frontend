export const validate = (data, type) => {
    const errors = {};
  
    if (!data.email) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
      errors.email = "이메일 양식이 올바르지 않습니다.";
    } else {
      delete errors.email;
    }
  
    if (!data.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (!(data.password.length >= 6)) {
      errors.password = "비밀번호는 6글자 이상이어야 합니다.";
    } else {
      delete errors.password;
    }
  
    if (type === "signUp") {
      if (!data.name.trim()) {
        errors.name = "닉네임을 입력해주세요.";
      } else {
        delete errors.name;
      }
      if (!data.confirmPassword) {
        errors.confirmPassword = "비밀번호를 확인해주세요.";
      } else if (!(data.confirmPassword === data.password)) {
        errors.confirmPassword = "비밀번호가 일치하지 않습니다";
      } else {
        delete errors.confirmPassword;
      }
  
      if (data.IsAccepted) {
        delete errors.IsAccepted;
      } else {
        errors.IsAccepted = "약관에 동의해주세요";
      }
    }
  
    return errors;
  };