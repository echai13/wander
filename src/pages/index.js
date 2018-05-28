import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

export default class IndexPage extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    console.log('scrollPos: ', window.scrollY);
    if (window.scrollY > 30) {
      document.querySelector('div.top-section > h1').classList.add('slide-up');
    }
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

          <div className="featured-image" />

          <div className="featured-posts">
            {
              posts.map(post => (
                <div>
                  <h3>{post.node.frontmatter.title}</h3>
                  <div>{post.node.excerpt}</div>
                  <img src={post.node.frontmatter.image || ''} />
                </div>
              ))
            }
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
