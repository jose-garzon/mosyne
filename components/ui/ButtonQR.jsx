//----- import Libraries
import { css } from '@emotion/core';
import React from 'react';

//----- import components
import Button from './Button';
import IconCloud from './icons/IconCloud';
import { Media } from '../../types/mediaquery';

const ButtonQR = ({ id }) => {
	return (
		<a
			href={`https://mosine-api-297015.uc.r.appspot.com/api/angels/${id}/qr`}
			target="__blank"
			css={css`
				text-decoration: none;
				button {
					justify-content: center;
					align-items: center;
					padding: 5px 15px;
					font-size: 9px;
					border-radius: 2.5px;
					@media ${Media.tablet} {
						font-size: 12px;
					}
					svg {
						margin-right: 5px;
					}
				}
			`}
		>
			<Button
				bgColor="var(--blue)"
				textColor="#FAFAFA"
				borderColor="var(--blue)"
			>
				<IconCloud /> Descargar codigo QR
			</Button>
		</a>
	);
};

export default ButtonQR;
