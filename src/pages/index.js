import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import clothespin from '../img/clothespin.svg';
import albumOne from '../../static/img/chemex.jpg';
import albumTwo from '../../static/img/coffee.png';
import albumThree from '../../static/img/meeting-space.png';

export default class IndexPage extends React.Component {
  scrollPos = 0;
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // scrolling up, shows navbar only in desktop
    if (window.scrollY < this.scrollPos) {
      document.querySelector('.nav-menu').classList.add('show');
      document.querySelector('.nav-menu').classList.remove('hide');
    }

    const header = document.querySelector('div.top-section > h1');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');

    header.addEventListener('click', () => {
      if (Array.from(nav.classList).indexOf('opened') === -1) {
        nav.classList.add('opened');
        navMenu.classList.remove('show');
        navMenu.classList.remove('hide');
      } else {
        nav.classList.remove('opened');
        navMenu.classList.add('hide');
      }
    });

    if (window.scrollY > 30) {
      const topSection = document.querySelector('div.top-section');
      const header = document.querySelector('div.top-section > h1');
      const nav = document.querySelector('nav');
      const navMenu = document.querySelector('.nav-menu');

      header.classList.add('slide-up');
      topSection.classList.add('slide-up');
      document.querySelector('div.nav-menu').classList.add('slide-up');

      if (scrollY > this.scrollPos) {
        document.querySelector('div.nav-menu').classList.add('hide');
      }
    }

    if (window.scrollY > 520 && window.scrollY < 800) {
      document.querySelector('div.nav-menu').style.color = 'white';
    } else if (window.scrollY > 800 || window.scrollY < 520) {
      document.querySelector('div.nav-menu').style.color = 'black';
    }

    this.scrollPos = window.scrollY;
  }

  renderMenuDetails = () => {
    return (
      <div className="nav-menu detail">
        <div id="expressions">photos, poetry, prose</div>
        <div id="travels">travel tips + guides</div>
        <div id="about">about us = wanderers</div>
        <div id="itineraries">itineraries ideas</div>
      </div>
    )
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    console.log('props: ', this.props);

    return (
      <section className="section">
        <div className="ui fluid container">
          { this.renderMenuDetails() }
          <div className="top-section">
            <h1>wander</h1>
          </div>

          <div className="featured-image">
            <div className="featured-title">
              Trip to Rome, Italy
            </div>
          </div>

          <div className="featured-posts">
            {
              posts.map(post => (
                <div className="ui two column doubling stackable grid container">
                  <div className="column">
                    <div className="image-wrapper">
                      <img src={post.node.frontmatter.image || ''} />
                    </div>
                  </div>
                  <div className="column">
                    <h3>{post.node.frontmatter.title}</h3>
                    <div>{post.node.excerpt}</div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="albums">
            {/* <img src={clothespin} className="clothespin" /> */}
            <div className="ui three column doubling stackable grid container">
              <div className="column">
                <div className="ui stacked segment album">
                  <img src={albumOne} />
                </div>
              </div>
              <div className="column">
                <div className="ui stacked segment album">
                  <img src={albumTwo} />
                </div>
              </div>
              <div className="column">
                <div className="ui stacked segment album">
                  <img src={albumThree} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
          }
        }
      }
    }
  }
`
