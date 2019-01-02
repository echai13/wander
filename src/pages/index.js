import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import Link from 'gatsby-link';

import Navbar from '../components/Navbar';

import Autumn from '../../src/img/autumn-forest.jpeg';
import Spring from '../../src/img/spring-green.jpeg';
import Summer from '../../src/img/summer-beach.jpeg';
import Winter from '../../src/img/winter-white.jpeg';

import SriLanka from '../../src/img/little-adam-peak.jpg';

const Carousel = styled.div`
  width: 100%;
  height: 98vh;
  overflow: hidden;
  white-space: nowrap;
  // position: fixed;
`;

const CarouselImage = styled.img`
  height: 100%;
  width: 100vw;
  display: inline-flex;
`;

const Title = styled.h1`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  font-size: 3rem;
  font-family: 'Lato', sans-serif;
  border-radius: 2px;
  font-weight: 900;
`;

const FeaturedPost = styled.div`
  height: 100vh;
  background-color: #fff6ef;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullScreen = styled.div`
  height: 100vh;
`;

const Image = styled.img`
  width: 66%;
`;

const Caption = styled.div`
  width: 24%;
  padding: 32px;
  line-height: 32px;
`;

const Recent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 24vw;
  grid-gap: 1vw;
  padding: 8vw;
  width: 80vw;
  max-width: 768px;
`;

const Heading = styled.div`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sunflower';
  font-size: 2vw;
  text-transform: uppercase;
  height: 24vw;
`;

const RecentPost = styled.div`
  background-color: yellow;
  height: 24vw;
`;

const Outer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const carouselImages = [
  Winter,
  Spring,
  Summer,
  Autumn
];

export default class IndexPage extends React.Component {
  featuredPost = React.createRef();
  state = {
    carouselIndex: 0,
  };

  componentDidMount() {
    this.renderImageCarousel();
    // window.addEventListener('scroll', this.handleScroll);
  }

  renderImageCarousel = () => {
    this.setState({ carouselIndex: (this.state.carouselIndex + 1) % carouselImages.length });
    setTimeout(() => {
      this.renderImageCarousel()
    }, 10000);
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
 
  handleScroll = () => {
    console.log('scrolling ...', window.scrollY);
    const difference = -100 + window.scrollY;
    if (difference < 16) this.featuredPost.current.style.transform = `translateY(${difference}vh)`;
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    console.log('props: ', this.props);
    
    return (
      <section className="section">
        <div className="ui fluid container">
          <FullScreen>
            <Carousel>
              <Title>wander</Title>
              {carouselImages.map(image => (
                <CarouselImage src={image} style={{ transform: `translateX(-${this.state.carouselIndex * 100}%)` }} />
              ))}
            </Carousel>
          </FullScreen>
          <Navbar />
          <FeaturedPost ref={this.featuredPost}>
            <Image src={SriLanka} />
            <Caption>
              <h3>LITTLE ADAM'S PEAK</h3>
              <p>We arrived at Zion Peak's Hotel very late at night so we didn't have time to explore until the next morning. We had a delicious breakfast at the hotel before we headed out to hike Little Adam's Peak. READ MORE ...</p>
            </Caption>
          </FeaturedPost>
          <Outer>
            <Recent>
              <Heading>Photobook</Heading>
              <RecentPost />
              <RecentPost />
              <RecentPost />
            </Recent>
          </Outer>
          
          <Outer>
            <Recent>
              <Heading>Stories</Heading>
              <RecentPost />
              <RecentPost />
              <RecentPost />
            </Recent>
          </Outer>
          
          <Outer>
            <Recent>
              <Heading>Diary</Heading>
              <RecentPost />
              <RecentPost />
              <RecentPost />
            </Recent>
          </Outer>
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
`;
