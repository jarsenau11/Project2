import { Grid } from '@trussworks/react-uswds';
import W2Form from './W2Form';
import W2Table from './W2SummaryTable';
import { getUser } from '../../slices/UserSlice';

const containerStyle = {
  maxWidth: "1800px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center"
}

export default function W2Container() {
  const user = getUser();
  return (
    <>
      <div style={containerStyle as React.CSSProperties}>
        <Grid row>
          {!(user.formW2s == null) && <Grid col={6}>
            <W2Table />
          </Grid>
          }
          <Grid col={user.formW2s == null ? 12 : 6}>
            <W2Form isTaxFiling={false} isNewForm={true} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}