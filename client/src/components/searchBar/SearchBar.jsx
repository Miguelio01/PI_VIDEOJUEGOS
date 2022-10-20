import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../redux/actions/index';
import s from './SearchBar.module.css';

export default function SearchBar() {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');

	function handleChange(e) {
		e.preventDefault();
		setInput(e.target.value);
		console.log(input);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getVideogamesByName(input));
		setInput('');
	}

	return (
		<div>
			<form>
				<input
					className={s.searchBar}
					type='text'
					placeholder='Search...'
					value={input}
					onChange={(e) => handleChange(e)}
				/>
				<button className={s.btnS} onClick={(e) => handleSubmit(e)}>
					Search
				</button>
			</form>
		</div>
	);
}
