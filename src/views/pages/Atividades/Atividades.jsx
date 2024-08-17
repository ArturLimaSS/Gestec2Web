import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import TicketListing from "../../../components/apps/tickets/TicketListing";
import TicketFilter from "../../../components/apps/tickets/TicketFilter";
import ChildCard from "src/components/shared/ChildCard";
import ListaAtividades from "../../../components/atividades/Lista/ListaAtividades";

const BCrumb = [
	{
		title: "Gestão de Atividades",
	},
];

const Atividades = () => {
	return (
		<PageContainer title="Gestão de Atividades" description="Gestão de Atividades">
			<Breadcrumb title="Gestão de Atividades" items={BCrumb} />
			<ChildCard>
				<ListaAtividades />
			</ChildCard>
		</PageContainer>
	);
};

export default Atividades;
