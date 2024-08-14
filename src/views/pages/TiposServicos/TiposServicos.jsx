import { CardContent, Grid } from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import AppCard from "../../../components/shared/AppCard";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import BlankCard from "../../../components/shared/BlankCard";
import ListaTiposServicos from "../../../components/pages/tiposServicos/ListaTiposServicos";

const TiposServicos = () => {
  return (
    <PageContainer
      title="Tipos de Serviços"
      description="Gerencie Tipos de Serviços"
    >
      <Breadcrumb title="Tipos de Serviços" subtitle="Tipos de Serviços" />
      <BlankCard>
        <CardContent>
          <ListaTiposServicos />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default TiposServicos;
