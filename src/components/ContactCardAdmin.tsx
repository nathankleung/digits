'use client';

import { Contact, Note } from '@prisma/client';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem';
import Link from 'next/link';
import AddNoteForm from '@/components/AddNoteForm';

/* Renders a single Contact. See list/page.tsx */
const ContactCardAdmin = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
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
			<ListGroup variant="flush">
				{notes.map((note) => <NoteItem key={note.id} note={note}/>)}
			</ListGroup>
			<AddNoteForm contact={contact} />
			<Card.Footer className="block-quotefooter">
				{contact.owner}
				<br/>
				<Link href={`edit/${contact.id}`}>Edit</Link>
			</Card.Footer>
		</Card.Body>
	</Card>
);

export default ContactCardAdmin;