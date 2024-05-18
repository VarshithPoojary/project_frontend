import React from 'react';
import { Button, Card } from 'react-bootstrap';

const styles = {
  container: {
    marginTop: '5rem',
  },
  userPhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginRight: '1rem',
  },
  cardBodyRow: {
    marginTop: '20px',
  },
  cardBodyP: {
    marginBottom: '5px',
  },
  cardBodyCol: {
    marginBottom: '20px',
  },
  textMuted: {
    fontWeight: 500,
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mb4: {
    marginBottom: '1.5rem',
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  justifyContentBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const Profile = () => {
  return (
    <div style={styles.container}>
      <Card style={styles.mb4}>
        <Card.Body style={styles.dFlex}>
          <img src="path/to/user-photo.jpg" alt="User" style={styles.userPhoto} />
          <div>
            <h4>Jack Adams</h4>
            <p style={styles.textMuted} className="mb-0">Product Designer</p>
            <p style={styles.textMuted}>Los Angeles, California, USA</p>
          </div>
          <Button variant="outline-primary" style={styles.mlAuto}>Edit</Button>
        </Card.Body>
      </Card>

      <Card style={styles.mb4}>
        <Card.Body>
          <div style={styles.justifyContentBetween}>
            <h5>Personal Information</h5>
            <Button variant="outline-primary">Edit</Button>
          </div>
          <div className="row" style={styles.cardBodyRow}>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>First Name</p>
              <p style={styles.cardBodyP}>Jack</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Last Name</p>
              <p style={styles.cardBodyP}>Adams</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Email address</p>
              <p style={styles.cardBodyP}>jackadams@gmail.com</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Phone</p>
              <p style={styles.cardBodyP}>(213) 555-1234</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Bio</p>
              <p style={styles.cardBodyP}>Product Designer</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card style={styles.mb4}>
        <Card.Body>
          <div style={styles.justifyContentBetween}>
            <h5>Address</h5>
            <Button variant="outline-primary">Edit</Button>
          </div>
          <div className="row" style={styles.cardBodyRow}>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Country</p>
              <p style={styles.cardBodyP}>United States of America</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>City/State</p>
              <p style={styles.cardBodyP}>California, USA</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>Postal Code</p>
              <p style={styles.cardBodyP}>ERT 62574</p>
            </div>
            <div className="col-md-6" style={styles.cardBodyCol}>
              <p style={styles.textMuted}>TAX ID</p>
              <p style={styles.cardBodyP}>AS564178969</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
