import { Grid } from '@trussworks/react-uswds';
import Form1099 from '../1099/Form1099';
import Table1099 from './Table1099';
import { getUser } from '../../slices/UserSlice';

const containerStyle = {
  maxWidth: "1800px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center"
}

export default function Container1099() {
  const user = getUser();

  return (
    <>
      <div style={containerStyle as React.CSSProperties}>
        <Grid row>
          {!(user.form1099s == null) && <Grid col={6}>
            <Table1099 />
          </Grid>
          }
          <Grid col={user.form1099s == null ? 12 : 6}>
            <Form1099 isTaxFiling={false} isNewForm={true} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
