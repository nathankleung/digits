'use client';

import { Contact } from '@prisma/client';
import { Card, Image } from 'react-bootstrap';
import  Link  from 'next/link';

/* Renders a single Contact. See list/page.tsx */
const ContactCard = ({ contact }: { contact: Contact }) => (
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
				<Link href={`edit/${contact.id}`}>Edit</Link>
			</Card.Footer>
		</Card.Body>

	</Card>
);

export default ContactCard;