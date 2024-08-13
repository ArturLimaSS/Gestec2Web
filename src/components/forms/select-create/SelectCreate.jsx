import { useEffect, useState } from "react";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { useTipoEquipamentoStore } from "../../../zustand/TipoEquipamento/TipoEquipamentoStore";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const SelectCreate = ({ getSelectedValue }) => {
  const { empresa } = useAuthStore(store => ({
    empresa: store.empresa,
  }));

  const {
    fetchTipoEquipamento,
    createTipoEquipamento,
    isLoading,
    error,
    listaTipoEquipamento,
  } = useTipoEquipamentoStore(store => store);

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    fetchTipoEquipamento(empresa.empresa_id);
  }, [empresa]);

  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    getSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleInputChange = (e, newValue) => {
    setInputValue(newValue);
  };

  const handleCreate = async () => {
    if (inputValue.trim() === "") return;

    const response = await createTipoEquipamento({
      nome_tipo_equipamento: inputValue,
      empresa_id: empresa.empresa_id,
    });

    if (response.status === 201) {
      setInputValue("");
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <FormControl fullWidth margin="normal">
      <Autocomplete
        onChange={handleChange}
        value={selectedValue}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={listaTipoEquipamento}
        getOptionLabel={option => option.nome_tipo_equipamento || ""}
        renderInput={params => (
          <TextField
            {...params}
            label="Tipo de Equipamento"
            variant="outlined"
            fullWidth
            onKeyDown={event => {
              if (event.key === "Enter" && inputValue) {
                event.preventDefault();
                handleCreate();
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        freeSolo
      />
    </FormControl>
  );
};
