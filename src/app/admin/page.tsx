import { Col, Container, Row, } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { Contact } from '@prisma/client';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const AdminPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const contacts: Contact[] = await prisma.contact.findMany({
  });

  return (
  <main>
    <Container id="list" fluid className="py-3">
      <Container>        
        <Row>
          <Col>
            <h1 className="text-center">List Contacts (Admin)</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                  {contacts.map((contact) => (
                <Col key={contact.firstName + contact.lastName}>
                  <ContactCardAdmin contact={contact} />
                </Col>
                  ))}
              </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
  );
};

export default AdminPage;
