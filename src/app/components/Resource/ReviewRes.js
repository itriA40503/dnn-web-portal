import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';

class ReviewRes extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <Card>
                  <CardText style={{ textAlign: 'center' }}>
                    <Row>
                      <Col xs style={{ textAlign: 'right' }}>
                        <h2>{'GPU quota '}</h2>
                      </Col>
                      <Col xs style={{ textAlign: 'left' }}>
                        <h2>{' 100'}</h2>
                      </Col>
                      <Col xs style={{ textAlign: 'right' }}>
                        <h2>{'Used GPU'}</h2>
                      </Col>
                      <Col xs style={{ textAlign: 'left' }}>
                        <h2>{' 5'}</h2>
                      </Col>
                      <Col xs style={{ textAlign: 'right' }}>
                        <h2>{'Available GPU'}</h2>
                      </Col>
                      <Col xs style={{ textAlign: 'left' }}>
                        <h2>{' 95'}</h2>
                      </Col>
                    </Row>
                  </CardText>
                </Card>
              </Col>
            </Row>
            <br />
            <Row center="xs" style={{ textAlign: 'left' }} >
              <Col xs={6}>
                <Card>
                  <CardTitle title={'IDE used resouce'} />
                  <CardText>
                    {'IDE Resouce'}
                  </CardText>
                </Card>
              </Col>
              <Col xs={6}>
                <Card>
                  <CardTitle title={'Instance used resouce'} />
                  <CardText>
                    {'Instance Resouce'}
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default translate('')(ReviewRes);
