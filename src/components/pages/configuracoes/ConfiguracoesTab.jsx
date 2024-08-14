import React, { useEffect, useState } from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
  Stack,
} from "@mui/material";

// components
import BlankCard from "../../shared/BlankCard";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../forms/theme-elements/CustomSelect";

// images
import user1 from "src/assets/images/profile/user-1.jpg";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { useEmpresaStore } from "../../../zustand/Empresa/EmpresaStore";

const ConfigTab = () => {
  const { empresa } = useAuthStore(store => ({
    empresa: store.empresa,
  }));

  const { atualizaEmpresa } = useEmpresaStore(store => store);

  const [empresaData, setEmpresaData] = useState({
    empresa_id: "",
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    email: "",
    site: "",
    inscricao_estadual: "",
    telefone: "",
  });

  useEffect(() => {
    setEmpresaData(empresa);
  }, [empresa]);

  useEffect(() => {
    console.log(empresaData);
  }, [empresaData]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await atualizaEmpresa(empresaData);
    console.log(response);
  };

  return (
    <Grid component={"form"} onSubmit={handleSubmit} container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Logo
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt={user1}
                  sx={{ width: 120, height: 120, margin: "0 auto" }}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  my={3}
                >
                  <Button variant="contained" color="primary" component="label">
                    Atualizar logo
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Permitido imagens em <strong>PNG</strong> e{" "}
                  <strong>JPG</strong>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Dados de Conta
            </Typography>
            <>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Nome Fantasia
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value={empresaData.nome_fantasia}
                onChange={e =>
                  setEmpresaData({
                    ...empresaData,
                    nome_fantasia: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                type="text"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">
                Razão Social
              </CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value={empresaData.razao_social}
                onChange={e =>
                  setEmpresaData({
                    ...empresaData,
                    razao_social: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                type="text"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">CNPJ</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value={empresaData.cnpj}
                onChange={e =>
                  setEmpresaData({ ...empresaData, cnpj: e.target.value })
                }
                variant="outlined"
                fullWidth
                type="text"
              />

              <CustomFormLabel htmlFor="text-conpwd">
                Inscrição Estadual
              </CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value={empresaData.inscricao_estadual}
                onChange={e =>
                  setEmpresaData({
                    ...empresaData,
                    inscricao_estadual: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                type="text"
              />
            </>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Dados de Endereço
            </Typography>

            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Logradouro
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value={empresaData.logradouro}
                    onChange={e =>
                      setEmpresaData({
                        ...empresaData,
                        logradouro: e.target.value,
                      })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Número
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value={empresaData.numero}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, numero: e.target.value })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Complemento
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={empresaData.complemento}
                    onChange={e =>
                      setEmpresaData({
                        ...empresaData,
                        complemento: e.target.value,
                      })
                    }
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 4 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-currency"
                  >
                    Bairo
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    id="text-currency"
                    variant="outlined"
                    value={empresaData.bairro}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, bairro: e.target.value })
                    }
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Cidade
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value={empresaData.cidade}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, cidade: e.target.value })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Estado
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value={empresaData.estado}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, estado: e.target.value })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    CEP
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value={empresaData.cep}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, cep: e.target.value })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </>
          </CardContent>
        </BlankCard>
      </Grid>

      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Dados de Contato
            </Typography>

            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    E-mail
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value={empresaData.email}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, email: e.target.value })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Telefone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value={empresaData.telefone}
                    onChange={e =>
                      setEmpresaData({
                        ...empresaData,
                        telefone: e.target.value,
                      })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Site
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={empresaData.site}
                    onChange={e =>
                      setEmpresaData({ ...empresaData, site: e.target.value })
                    }
                  ></CustomTextField>
                </Grid>
              </Grid>
            </>
          </CardContent>
        </BlankCard>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={3}
        >
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Salvar
          </Button>
          <Button
            onClick={() => setEmpresaData(empresa)}
            size="large"
            variant="text"
            color="error"
          >
            Cancelar
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ConfigTab;
