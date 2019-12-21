import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'

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

    <nav class="nav-extended">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Logo</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab"><a href="#test1">Test 1</a></li>
            <li class="tab"><a class="active" href="#test2">Test 2</a></li>
            <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
            <li class="tab"><a href="#test4">Test 4</a></li>
          </ul>
        </div>
      </nav>

      <div id="test1" class="col s12">Test 1</div>
      <div id="test2" class="col s12">Test 2</div>
      <div id="test3" class="col s12">Test 3</div>
      <div id="test4" class="col s12">Test 4</div>


    <div className="container">
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="container__sidebar">
        <div className="sidebar">
          <h6 className="sidebar__title">
            <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
          </h6>
          <div
            className="sidebar__intro"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
            }}
          />
          <ul className="sidebar__menu">
            <li>
              <Link to="/">Inicio vBeta</Link>
            </li>
            <li>
              <Link to="/about">Sobre mim</Link>
            </li>
          </ul>
          <p className="sidebar__social">
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="blank"
                className={`social social--${profile.profileType.toLowerCase()}`}
              > </a>
            ))}
          </p>
          <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
        </div>
      </div>
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
    )}
  />
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
