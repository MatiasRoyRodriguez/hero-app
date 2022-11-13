import { types } from "../../../src/auth/types/types"

describe('Purebas en "Types.js"', () => {

	test('Debe de regresar estos types', () => {

		expect(types).toEqual({
			login: '[Auth] Login',
			logout: '[Auth] Logout'
		})
	})


})