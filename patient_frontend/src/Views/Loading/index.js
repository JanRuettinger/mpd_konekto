import React from "react";
import gif from '../../imgs/loading_screen.gif'
import { Typography, Grid, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';


const styles = theme => ({
  
  });


class Loading extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.classes = props.classes;
    }
  componentDidMount(){
      setTimeout(()=> { this.props.history.push('/transmitted_data');
    } ,3000)
  }
    render() {
      return (

        <React.Fragment>
                    <Header title="Sending  " />

          <Container component="main" maxWidth="sm" >
            <Grid
            display='flex'
            alignItems='center'
            style={{marginTop:'140px',marginLeft:'0px'}}
            >
                <Grid item>
                <img src={gif} alt="loading..." />

                     </Grid>
                <Grid item> 
                <br/>
                </Grid>
                < Typography variant = 'h5' align='center' > 
         Sending details
         </Typography>
            </Grid>
           
        
          </Container>
        </React.Fragment>
      );
    }
  }
  
  export default withStyles(styles)(Loading);