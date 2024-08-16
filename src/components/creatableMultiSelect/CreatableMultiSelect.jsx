import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Chip, Box, Button } from "@mui/material";

function CreatableMultiSelect({ label, onChangeValues, onChange, initialValues }) {
	const [value, setValue] = useState([]);

	useEffect(() => {
		if (typeof initialValues === "string") {
			try {
				setValue(JSON.parse(initialValues));
			} catch (e) {
				console.error("Erro ao fazer o parse do JSON:", e);
			}
		} else if (Array.isArray(initialValues)) {
			setValue(initialValues);
		}
	}, [initialValues]);

	const [options, setOptions] = useState(["Sim", "Não"]);
	const [newValue, setNewValue] = useState("");

	const handleChange = (event, newValue) => {
		setValue(Array.isArray(newValue) ? newValue : []);
		onChangeValues(Array.isArray(newValue) ? newValue : []);
	};

	const handleInputChange = (event, newValue) => {
		setNewValue(newValue);
	};

	const handleCreate = () => {
		if (newValue && !options.includes(newValue)) {
			const newOptions = [...options, newValue];
			const newValues = [...value, newValue];
			setOptions(newOptions);
			setValue(newValues);
			onChange(newValues); // Chame onChange com o novo valor
			onChangeValues(newValues); // Chame onChangeValues com o novo valor
		}
	};

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
		<Autocomplete
			multiple
			options={Array.isArray(options) ? options : []}
			value={Array.isArray(value) ? value : []}
			onInputChange={handleInputChange}
			onChange={handleChange}
			renderTags={(value, getTagProps) => value.map((option, index) => <Chip key={option} variant="contained" label={option} {...getTagProps({ index })} />)}
			renderOption={(props, option) => <li {...props}>{option}</li>}
			noOptionsText={
				<Box textAlign="center">
					<Button variant="outlined" onMouseDown={handleCreate}>
						Cadastrar Opção
					</Button>
				</Box>
			}
			renderInput={params => <TextField {...params} variant="outlined" label={label} placeholder="Type and press enter..." />}
		/>
	);
}

export default CreatableMultiSelect;
