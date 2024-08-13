import { useEffect } from "react";
import { useAuthStore } from "../../../zustand/Auth/AuthStore";
import { useSitesStore } from "../../../zustand/Sites/SiteStore";
import {
  Checkbox,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import AppCard from "../../../components/shared/AppCard";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";

const Sites = props => {
  const { empresa } = useAuthStore(store => ({
    empresa: store.empresa,
  }));

  const { fetchListaSites, listaSites } = useSitesStore(store => ({
    fetchListaSites: store.fetchListaSites,
    listaSites: store.listaSites,
  }));

  const handleFetchListaSites = async () => {
    const response = await fetchListaSites(empresa.empresa_id);
    console.log(response);
  };

  useEffect(() => {
    handleFetchListaSites();
  }, []);

  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },

    {
      title: "Sites",
    },
  ];

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <PageContainer title={"Sites"}>
      <Breadcrumb title={"Sites"} items={BCrumb} />
      <AppCard title={"Sites"}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Rua</TableCell>
                <TableCell>Numero</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>Tipo de Acesso</TableCell>
                <TableCell>Tipo de Chave</TableCell>
                <TableCell>Tipo de Equipamento</TableCell>
                <TableCell>Nível de prioridade</TableCell>
              </TableRow>
            </TableHead>
            {listaSites &&
              listaSites.map((site, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{site.site_id}</TableCell>
                  <TableCell>{site.nome_site}</TableCell>
                  <TableCell>{site.endereco_rua}</TableCell>
                  <TableCell>{site.endereco_numero}</TableCell>
                  <TableCell>{site.endereco_cidade}</TableCell>
                  <TableCell>{site.endereco_estado}</TableCell>
                  <TableCell>{site.endereco_cep}</TableCell>
                  <TableCell>{site.tipo_acesso}</TableCell>
                  <TableCell>{site.tipo_chave}</TableCell>
                  <TableCell>{site.tipo_equipamento}</TableCell>
                  <TableCell>{site.nivel_prioridade}</TableCell>
                </TableRow>
              ))}
          </Table>
        </TableContainer>
      </AppCard>
    </PageContainer>
  );
};

export default Sites;
