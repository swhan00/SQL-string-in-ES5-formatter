import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  textarea: {
    width: "100%"
  },
  resultBox: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#bbb",
    borderRadius: "4px",
    boxSizing: "border-box",
    height: "797px",
    padding: "18.5px 14px"
  }
};

function formatSqlString(str) {
  console.log(JSON.stringify(str));
  str = "'" + str.replace(/(?:\r\n|\r|\n)/g, "'\n+\xa0'\xa0");
  str = str.replace(/ /g, "\u00a0");
  str += "'";

  return str.split("\n").map((e, idx) => (
    <span key={idx}>
      {e}
      <br />
    </span>
  ));
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { str: "select\n  *\nfrom\n  dataset.table\nwhere\n  x = 1" };
  }

  onStrChange = evt => {
    this.setState({
      str: evt.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { str } = this.state;

    return (
      <Container maxWidth="lg" component="main">
        <Box my={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            SQL string -> ES5 Formatter
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item sm>
            <Box m={3}>
              <TextField
                className={classes.textarea}
                multiline
                rows="40"
                variant="outlined"
                value={str}
                onChange={this.onStrChange}
              />
            </Box>
          </Grid>
          <Grid item sm>
            <Box m={3}>
              <div className={classes.resultBox}>{formatSqlString(str)}</div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Index);
