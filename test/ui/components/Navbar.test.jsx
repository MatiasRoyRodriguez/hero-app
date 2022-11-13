import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUserNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUserNavigate
}));

describe('Pruebas en <NavBar />', () => {

	const contextValue = {
		logged: true,
		user: {
			name: 'Matt RR'
		},
		logout: jest.fn()

	}

	beforeEach(() => jest.clearAllMocks());


	test('Debe de mostrar el nombre del usuario', () => {

		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect(screen.getByText('Matt RR')).toBeTruthy();

	});

	test('Debe de llamar el logout y navigate cuando se hace click en el botón', () => {


		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>
		);

		const logoutBtn = screen.getByRole('button');
		fireEvent.click(logoutBtn);

		expect(contextValue.logout).toHaveBeenCalled();
		expect(mockedUserNavigate).toHaveBeenCalledWith('/login', { "replace": true });

	});


});