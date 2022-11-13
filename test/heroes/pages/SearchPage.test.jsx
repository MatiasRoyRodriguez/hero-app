import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUserNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUserNavigate
}));

describe('Pruebas en <SearchPage />', () => {


	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrarse correctamente con valores por defecto', () => {

		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);
		expect(container).toMatchSnapshot();
	});


	test('Debe de mostrar a Batman y el input con el valor del queryString', () => {


		render(
			<MemoryRouter initialEntries={['/search?q=batman']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('batman');

		const img = screen.getByRole('img');
		expect(img.src).toBe('http://localhost/assets/dc-batman.jpg');


	});


	test('Debe de mostrar un error si no se encuentra el hero (batman)', () => {

		render(
			<MemoryRouter initialEntries={['/search?q=batman123']}>
				<SearchPage />
			</MemoryRouter>
		);

		const alert = screen.getByLabelText('alert-danger');
		expect(alert.style.display).toBe('');
	});

	test('Debe de llamar el navigate a la pantalla nueva', () => {

		const inputValue = 'superman';

		render(
			<MemoryRouter initialEntries={['/search']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { name: 'searchText', value: inputValue } });

		const form = screen.getByRole('form');
		fireEvent.submit(form);

		expect(mockedUserNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

	});
});