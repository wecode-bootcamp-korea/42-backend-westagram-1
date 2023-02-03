// controller - 비즈니스 로직에 넘길 데이터 검증 및 오류 코드 반환
const express = require("express");
const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, profile_image, password } = req.body;

    // key error - 특정 키값이 요청 시 전해지지 않았을 떄 발생하는 에러 방지
    if (!name || !email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    // 서비스 레이어에서 비즈니스 로직 구현 후 상태 메시지 반환
    await userService.signUp(name, email, profile_image, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });

    // 요청을 읽어들이면서 발생한 에러 핸들링
  } catch (err) {
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.login(email, password);
    let token = userService.login(jwtToken);
    return res.status(200).json({ JWT: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

module.exports = { signUp, login };
