const ERROR_CODES = {
	INVALID_PASSWORD: "Неверный пароль",
	INVALID_LOGIN_CREDENTIALS: 'Неверный логин или пароль',
	auth: 'Пожалуйста, войдите в систему',
	EMAIL_NOT_FOUND: 'нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален',
	USER_DISABLED: 'учетная запись пользователя отключена администратором',
}

export function error(code) {
	return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}