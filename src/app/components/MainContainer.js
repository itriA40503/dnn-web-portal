import React, { Component, PropTypes } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import autoprefixer from 'material-ui/utils/autoprefixer'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ReviewTable from './ReviewTable'
import SiginFrom from './SiginFrom'
import LanguageBtn from './LanguageBtn'
//ICON
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new'
// COLOR
import { lightBlue500 } from 'material-ui/styles/colors'

import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

const styles = {
	container: {
	    textAlign: 'center',
	    paddingTop: 0,
	},
	wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    bodySmall: {
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    contentSmall: {
        flex: 1,
        paddingTop: '3em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    }
}
const MenuStyles = {
    sidebarOpen: {
        flex: '0 0 16em',
        marginLeft: 0,
        order: -1,
        transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
    sidebarClosed: {
        flex: '0 0 16em',
        marginLeft: '-16em',
        order: -1,
        transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
}
const prefixedStyles = {}
const muiTheme = getMuiTheme({userAgent: 'all'})
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>
if (!prefixedStyles.main) {
    // do this once because user agent never changes
    const prefix = autoprefixer(muiTheme)
    prefixedStyles.wrapper = prefix(styles.wrapper)
    prefixedStyles.main = prefix(styles.main)
    prefixedStyles.body = prefix(styles.body)
    prefixedStyles.bodySmall = prefix(styles.bodySmall)
    prefixedStyles.content = prefix(styles.content)
    prefixedStyles.contentSmall = prefix(styles.contentSmall)
}

class MainContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: true,
      data: ''
    }
  }  
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleMenuTap = (value) => {
    // console.log(value)    
    this.setState({
      data: value
    })
  }


  handleTouchTap = () => {
    this.setState({
      open: true,
    })
  }
  render(){ 
      const {t} = this.props 	    
  		return(
	   		<MuiThemeProvider muiTheme={muiTheme}>		   		
	            <div style={prefixedStyles.wrapper}>
                    <div style={prefixedStyles.main}>
                        <AppBar 
                          title={this.props.user}
                          style={{ backgroundColor: lightBlue500 }}
        				          onLeftIconButtonTouchTap={this.handleToggle}
                          iconElementRight={
                            <IconButton 
                              tooltip="SignOut" 
                              onTouchTap={() => this.props.SignOut()}>                           >
                              <ExitIcon/>
                            </IconButton>
                          }
        				        />
                        <div className="body" style={prefixedStyles.body}>
                            <div style={prefixedStyles.content}> 
                            <ReviewTable/>                            
                            </div>                            
                        </div>
                        <Paper zDepth={1}>
                            <BottomNavigation>
                            <BottomNavigationItem
                              icon={<img src={t('common:logoSrc')} />}                              
                            />
                            <LanguageBtn/>
                            </BottomNavigation>
                        </Paper>
                    </div>
                </div>
	        </MuiThemeProvider>
        )
  }
}
export default translate('')(MainContainer)