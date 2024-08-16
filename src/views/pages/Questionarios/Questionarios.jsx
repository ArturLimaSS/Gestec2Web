import { CardContent } from "@mui/material";
import TicketFilter from "../../../components/apps/tickets/TicketFilter";
import TicketListing from "../../../components/apps/tickets/TicketListing";
import PageContainer from "../../../components/container/PageContainer";
// import ListaQuestionarios from "../../../components/pages/questionarios/ListaQuestionarios";
import BlankCard from "../../../components/shared/BlankCard";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import ChildCard from "src/components/shared/ChildCard";

const BCrumb = [
  {
    title: "Gestão de Questionários",
  },
];

const Questionarios = () => {
  return (
    <PageContainer title="Questionários" description="Gestão de Questionários">
      <Breadcrumb title="Gestão de Questionários" items={BCrumb} />
      <BlankCard>
        <CardContent>{/* <ListaQuestionarios /> */}</CardContent>
      </BlankCard>
    </PageContainer>
  );
};
export default Questionarios;
