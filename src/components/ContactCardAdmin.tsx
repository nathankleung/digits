'use client';

import { Contact } from '@prisma/client';
import { Card, Image } from 'react-bootstrap';

/* Renders a single Contact. See list/page.tsx */
const ContactCardAdmin = ({ contact }: { contact: Contact }) => (
	<Card className="h-100">
		<Card.Header>
			<Image alt="Contact Image"src={contact.image} width={75} />
			<Card.Title>
				{contact.firstName}
				&nbsp;
				{contact.lastName}
			</Card.Title>
			<Card.Subtitle>{contact.address}</Card.Subtitle>
		</Card.Header>
		<Card.Body>
			<Card.Text>{contact.description}</Card.Text>
			<Card.Footer className="block-quotefooter">
				{contact.owner}
			</Card.Footer>
		</Card.Body>
	</Card>
);

export default ContactCardAdmin;