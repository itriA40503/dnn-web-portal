import React from 'react';
// i18n
import { translate } from 'react-i18next';

import { Card, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';

import IdeRes from './IdeRes';
import InstanceRes from './InstanceRes';

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
                <IdeRes />
              </Col>
              <Col xs={6}>
                <InstanceRes />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default translate('')(ReviewRes);
