import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';


import '../styles/index.sass'


const TemplateWrapper = ({ children }) => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => (


    <div className="container">
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="sidebar__title">
             <AppBar position="static" style={{ backgroundColor: '#510c76' }} >
                 <Toolbar>
                     <Typography variant="title" color="inherit">
                      Aquaryu
                      </Typography>
                 </Toolbar>
                 <Menu
                   id="menu-appbar"
                   transformOrigin={{ vertical: "top", horizontal: "center" }}

                 >
                 <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                 <MenuItem onClick={this.handleClose}>My account</MenuItem>
               </Menu>
             </AppBar>


      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <Link to="#" data-js="toggleSidebar" />
            </div>
            <div className="mobile-header__logo">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
    </div>

    )}
  />
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
