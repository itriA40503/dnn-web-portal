import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Card, CardText, CardMedia, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// COLOR
import { white } from 'material-ui/styles/colors';
import { muiStyle } from '../myTheme';

import { DnnLogo, dnnweb } from '../image';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';

const cardData = [
  {
    text: 'Offer free environment, you can do everthing in your instance.',
    title: 'Contanier Serivce',
    subtitle: 'sub1',
    img: dnnweb,
  },
  {
    text: '123456789123455',
    title: 'title2',
    subtitle: 'sub2',
    img: dnnweb,
  },
];
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 900,
    height: 450,
    overflowY: 'auto',
  },
};

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }} >
          <Avatar src={DnnLogo} size={70} />
          <h3> Welcome to DNN FARM </h3>
        </div>
        <Divider />
        <br />
        <div>
          <Row>
            <Col xs={12}>
              <Row center="xs" style={{ textAlign: 'left' }} >
                {
                  cardData.map(obj => (
                    <Col xs={5}>
                      <Card zDepth={3} >
                        <CardHeader title={<b>{obj.title}</b>} />
                        <CardMedia >
                          <img src={obj.img} alt={obj.title} />
                        </CardMedia>
                        <CardText>
                          {obj.text}
                        </CardText>
                        <CardActions style={{ textAlign: 'right' }}>
                          <RaisedButton
                            label={'Get Start'}
                            backgroundColor={muiStyle.palette.primary1Color}
                            labelColor={white}
                          />
                        </CardActions>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </div>
        <div style={styles.root}>
        </div>
      </div>
    );
  }
}

export default translate('')(WelcomePage);
