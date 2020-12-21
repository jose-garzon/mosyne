//----- import Libraries
import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

//----- import components
import Layout from '../../components/layouts/Layout';
import Loader from '../../components/ui/Loader';
import IconUserDefault from '../../components/ui/icons/IconUserDefault';
import IconPolice from '../../components/ui/icons/IconPolice';
import IconCruzRoja from '../../components/ui/icons/IconCruzRoja';
import { Media } from '../../types/mediaquery';

//----- import context
import AngelContext from '../../context/angel/angelContext';

const AngelContainer = styled.main`
	font-family: var(--font);
	background: var(--white);
	transform: translateY(-20px);
	border-radius: 20px 20px 0 0;
	color: var(--black);
`;

const PublicImage = styled.img`
	object-fit: cover;
`;

const UserData = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	h1 {
		font-size: 25px;
		margin: 0;
	}
	p {
		margin: 0;
		color: var(--blue);
		font-weight: bold;
	}
`;

const SectionSelector = styled.ul`
	padding: 0 10px;
	list-style: none;
	display: flex;
	justify-content: space-between;
	li {
		font-size: 12px;
		cursor: pointer;
		text-align: center;
		&:nth-of-type(${(props) => props.tab}) {
			padding-bottom: 5px;
			border-bottom: 3px solid var(--blue);
		}
		@media ${Media.tablet} {
			font-size: 14px;
		}
	}
`;

const InformationSection = styled.div`
	background: var(--gray);
	border-radius: 20px 20px 0 0;
	padding: 20px;
	p {
		font-size: 15px;
	}
	p:first-of-type {
		margin-top: 0;
	}
	span {
		font-weight: bold;
		color: var(--blue);
	}
`;

const DescriptionBox = styled.div`
	h3 {
		font-size: 14px;
	}
	p {
		min-height: ${(props) => (props.type === 'small' ? 'auto' : '150px')};
		padding: 10px;
		border-radius: 3px;
		background-color: var(--white);
	}
`;

const Emergency = styled.div`
	h2 {
		font-size: 18px;
	}
	section {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	div {
		width: 48%;
		padding: 10px;
		text-align: center;
		border-radius: 10px;
		border: 1px solid var(--gray);
		background-color: var(--white);
		h3 {
			font-size: 15px;
		}
		p {
			font-size: 12px;
		}
	}
`;

export default function Angel() {
	const router = useRouter();
	const { encontrarAngel, angelinfo } = useContext(AngelContext);
	const {
		firstname,
		lastname,
		photo,
		blood_type,
		contacts,
		about,
		alergies,
		medicines,
		detonant,
		suffering,
		health_info,
		surgeries,
	} = angelinfo;
	const [tab, setTab] = useState(1);

	const {
		query: { id },
	} = router;

	useEffect(() => {
		if (id) {
			encontrarAngel(id);
		}
	}, [id]);

	if (Object.keys(angelinfo).length === 0) {
		return <Loader />;
	}

	return (
		<Layout>
			{photo === '' ? (
				<div>
					<IconUserDefault fill="#000000" width="100%" height="218px" />
				</div>
			) : (
				<PublicImage src={photo} width="100%" height="218px" />
			)}
			<AngelContainer>
				<UserData>
					<h1>{`${firstname} ${lastname}`}</h1>
					<p> {blood_type}</p>
				</UserData>
				<SectionSelector tab={tab}>
					<li onClick={() => setTab(1)}>Datos personales</li>
					<li onClick={() => setTab(2)}>Contactos de emergencia</li>
					<li onClick={() => setTab(3)}>Padecimientos y síntomas</li>
				</SectionSelector>

				<InformationSection>
					{tab === 1 && (
						<>
							<p>
								Hola, soy{' '}
								<span>
									{firstname} {lastname}
								</span>
								, si estas viendo esto es porque me perdido, tengo Alzheimer y
								he olvidado como volver a casa.
							</p>
							<p>
								Necesito tu ayuda. Aquí puedes ver los datos de contacto de{' '}
								<span>{contacts[0].name}</span>, mi guardián, llámalo e indicale
								donde estoy para que pueda venir por mi.
							</p>
							<p>
								También puedes ver detalles de mi condición para que puedas
								entenderme.
							</p>
							<p>
								Por último, si me ves herido, llama a los contactos de las
								autoridades que encontrarás abajo.
							</p>
							<p>Muchas gracias por tu ayuda.</p>
							<DescriptionBox>
								<h3>Sobre este ángel</h3>
								<p>{about}</p>
							</DescriptionBox>
						</>
					)}
					{tab === 2 && (
						<>
							<DescriptionBox type="small">
								<h3>Nombre</h3>
								<p>{contacts[0].name}</p>
							</DescriptionBox>
							<DescriptionBox type="small">
								<h3>Teléfono de Celular</h3>
								<p>{contacts[0].cel}</p>
							</DescriptionBox>
							<DescriptionBox type="small">
								<h3>Relación con el ángel</h3>
								<p>{contacts[0].angel_relation}</p>
							</DescriptionBox>
						</>
					)}
					{tab === 3 && (
						<>
							<DescriptionBox type="small">
								<h3>Detonante</h3>
								<p>{detonant}</p>
							</DescriptionBox>
							<DescriptionBox>
								<h3>Dolencias</h3>
								<p>{suffering}</p>
							</DescriptionBox>
							<DescriptionBox>
								<h3>Reacciones ante medicamentos</h3>
								<p>{health_info}</p>
							</DescriptionBox>
							<h3>Alergias</h3>
							{alergies.length === 0 ? (
								<DescriptionBox type="small">
									<p>No tiene alergias</p>
								</DescriptionBox>
							) : (
								alergies.map((alergy) => (
									<DescriptionBox type="small">
										<p>{alergy}</p>
									</DescriptionBox>
								))
							)}
							<h3>Cirugías</h3>
							{surgeries.length === 0 ? (
								<DescriptionBox type="small">
									<p>No le han hecho cirugías</p>
								</DescriptionBox>
							) : (
								surgeries.map((surgery) => (
									<DescriptionBox type="small">
										<p>{surgeries}</p>
									</DescriptionBox>
								))
							)}
							<h3>Medicinas</h3>
							{medicines.length === 0 ? (
								<DescriptionBox type="small">
									<p>No está medicado</p>
								</DescriptionBox>
							) : (
								medicines.map((alergy) => (
									<DescriptionBox type="small">
										<p>{alergy}</p>
									</DescriptionBox>
								))
							)}
						</>
					)}
					<Emergency>
						<h2>Números de emergencia</h2>
						<section>
							<div>
								<IconCruzRoja />
								<h3>Cruz Roja Mexicana</h3>
								<p>065</p>
								<p>5557-5757</p>
								<p>5395-1111</p>
							</div>
							<div>
								<IconPolice />
								<h3>Policía CDMX</h3>
								<p>5684-2142</p>
								<p>5481-4326</p>
								<p>5256-0606</p>
							</div>
						</section>
					</Emergency>
				</InformationSection>
			</AngelContainer>
		</Layout>
	);
}
